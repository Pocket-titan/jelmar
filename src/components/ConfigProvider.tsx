"use client";

import { last } from "lodash";
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
} from "ts/theme";
import { keysToVariables } from "ts/utils";

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

// I really don't need to do this...
const setFavicon = (colorMode: ColorMode) => {
  // let icons = document.querySelectorAll('link[rel*="icon"]');

  // if (!icons || icons.length === 0) {
  //   return;
  // }

  // const oldColorMode = colorMode === "dark" ? "light" : "dark";

  // icons.forEach((icon) => {
  //   const href = icon.getAttribute("href");

  //   if (!href || !(icon.id || "").includes(oldColorMode)) {
  //     return;
  //   }

  //   icon.setAttribute("href", href.replace(oldColorMode, colorMode));
  //   icon.toggleAttribute("media", false);
  // });
  return;
};

const setMetaTags = (colorMode: ColorMode) => {
  const root = window.document.documentElement;
  const metaJail = root.querySelector("noscript[id='meta-tag-jail']");
  const head = root.querySelector("head");

  if (!head) {
    return;
  }

  const metas = Array.from(head.querySelectorAll('meta[name="theme-color"]') || []);

  if (!metaJail || !metas) {
    return;
  }

  const lastMeta = last(metas);

  if (!lastMeta) {
    return;
  }

  // If we have tags with media attrs
  if (lastMeta.hasAttribute("media")) {
    // Remove the meta tags without media attr
    head.querySelectorAll('meta[name="theme-color"]:not([media])').forEach((meta) => meta.remove());

    // Clear the jail
    metaJail.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove());

    const otherMode = colorMode === "dark" ? "light" : "dark";
    const ourTag = head.querySelector(
      `meta[name="theme-color"][media="(prefers-color-scheme: ${colorMode})"]`
    );
    const otherTag = head.querySelector(
      `meta[name="theme-color"][media="(prefers-color-scheme: ${otherMode})"]`
    );

    if (!ourTag || !otherTag) {
      return;
    }

    // Toggle the media tags
    ourTag.toggleAttribute("media", false);
    otherTag.toggleAttribute("media", false);

    // Move our other tag to jail
    metaJail.appendChild(otherTag);
    return;
  }
  // If we don't
  // Swap the jailed tag
  const ourTag = metaJail.querySelector('meta[name="theme-color"]');
  const otherTag = head.querySelector('meta[name="theme-color"]');

  if (!ourTag || !otherTag) {
    return;
  }

  // Move our other tag to jail
  head.prepend(ourTag);
  metaJail.appendChild(otherTag);

  return;
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
      // If this timeout isn't here, it messes with codemirrors scrollers... (think cuz it manipulates DOM)
      setTimeout(() => {
        setMetaTags(localColorValue);
      }, 0);
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

      setFavicon(colorMode);
      _setColorMode(colorMode);
      setMetaTags(colorMode);

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
