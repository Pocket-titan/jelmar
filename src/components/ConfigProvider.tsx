"use client";

import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import {
  LIGHT_COLORS,
  DARK_COLORS,
  THEME_KEY,
  THEME_CSS_PROP,
  TRANSITION_DURATION,
} from "src/ts/theme";
import { keysToVariables } from "src/ts/utils";

type ColorMode = "light" | "dark";

export type Config = {
  colorMode: ColorMode;
  allowColorTransitions: boolean;
  setColorMode: (value: ColorMode) => void;
};

export const ConfigContext = createContext<Config>({} as Config);

export const ConfigConsumer = ConfigContext.Consumer;

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
};

export const ConfigProvider = ({ children }: PropsWithChildren) => {
  const initialColorMode = "light";
  const [colorMode, _setColorMode] = useState<ColorMode>(initialColorMode);
  const [allowColorTransitions, setAllowColorTransitions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let root = window.document.documentElement;

    const localColorValue =
      root.style.getPropertyValue(THEME_CSS_PROP) === "dark" ? "dark" : "light";

    if (localColorValue !== initialColorMode) {
      _setColorMode(localColorValue);
    }
  }, []);

  const setColorMode = useCallback(
    (colorMode: ColorMode) => {
      if (!allowColorTransitions) {
        setAllowColorTransitions(true);
      }

      const prefersDark = colorMode === "dark";

      let root = window.document.documentElement;
      root.setAttribute("data-color-mode", colorMode);

      let body = window.document.body;
      if (body.classList.contains(prefersDark ? "light" : "dark")) {
        body.classList.remove(prefersDark ? "light" : "dark");
      }
      body.classList.add(colorMode);

      body.classList.add("has-transition");

      root.style.setProperty(THEME_CSS_PROP, colorMode);
      const newColors = prefersDark ? DARK_COLORS : LIGHT_COLORS;

      Object.entries(keysToVariables(newColors, "color")).forEach(([name, color]) => {
        root.style.setProperty(name, color);
      });

      _setColorMode(colorMode);

      // This is really ghetto, but it works: we do this to prevent the transition
      // from occurring between navigating pages.
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        body.classList.remove("has-transition");
      }, TRANSITION_DURATION * 1.5);

      localStorage.setItem(THEME_KEY, colorMode);
    },
    [allowColorTransitions]
  );

  useEffect(() => {
    const QUERY = "(prefers-color-scheme: dark)";

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      const isDark = event.matches;
      setColorMode(isDark ? "dark" : "light");
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      colorMode,
      setColorMode,
      allowColorTransitions,
    }),
    [colorMode, _setColorMode, setColorMode, allowColorTransitions]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
