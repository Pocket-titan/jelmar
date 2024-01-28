import { DARK_COLORS, LIGHT_COLORS, THEME_KEY, THEME_CSS_PROP } from "ts/theme";
import { keysToVariables } from "ts/utils";

function setInitialColorMode() {
  function getInitialColorMode() {
    const preference = window.localStorage.getItem(THEME_KEY);
    const hasPreference = typeof preference === "string";

    if (hasPreference) {
      return preference;
    }

    const QUERY = "(prefers-color-scheme: dark)";
    const mediaQueryList = window.matchMedia(QUERY);
    const hasMediaPreference = typeof mediaQueryList.matches === "boolean";

    if (hasMediaPreference) {
      return mediaQueryList.matches ? "dark" : "light";
    }

    return "light";
  }

  const colorMode = getInitialColorMode();
  const prefersDark = colorMode === "dark";

  const root = document.documentElement;
  root.style.setProperty(THEME_CSS_PROP, colorMode);
  root.setAttribute("data-color-mode", colorMode);

  const colors = prefersDark ? DARK_COLORS : LIGHT_COLORS;
  Object.entries(keysToVariables(colors, "color")).forEach(([name, color]) => {
    root.style.setProperty(name, color);
  });
}

setInitialColorMode();
