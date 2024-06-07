type CodeTheme = {
  base: string;
  mono: {
    1: string;
    2: string;
    3: string;
  };
  hue: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    "5-2": string;
    6: string;
    "6-2": string;
  };
  diff: {
    deletedLine: string;
    changedText: string;
    changedLine: string;
  };
};

// // Atom one light
// const code_theme_light: CodeTheme = {
//   base: "#f0f0f0",
//   mono: {
//     1: "#383a42",
//     2: "#696c77",
//     3: "#a0a1a7",
//   },
//   hue: {
//     1: "#0184bc",
//     2: "#4078f2",
//     3: "#a626a4",
//     4: "#50a14f",
//     5: "#e45649",
//     "5-2": "#ca1243",
//     6: "#986801",
//     "6-2": "#c18401",
//   },
// };

// https://github.com/fisheva/Eva-Theme/blob/master/themes/Eva-Light.json
const code_theme_light: CodeTheme = {
  base: "hsl(222, 33%, 95%)",
  mono: {
    1: "#383a42",
    2: "#696c77",
    3: "#a0a1a7",
  },
  hue: {
    1: "#0184bc",
    2: "#4078f2",
    3: "#a626a4",
    4: "#50a14f",
    5: "#e45649",
    "5-2": "#ca1243",
    6: "#d45b3d",
    "6-2": "#5bb6cd",
  },
  diff: {
    deletedLine: "hsl(0deg 30% 85.98% / 40%)",
    changedText: "hsl(120deg 69.23% 43.33% / 40%)",
    changedLine: "hsl(148deg 34% 82.98% / 40%)",
  },
};

export const LIGHT_COLORS = {
  // text: "#000",
  text: "hsl(340, 13%, 5%)", // Night

  background: "white",
  subtleBackground: "hsl(225deg, 25%, 95%)",
  blurredBackground: "hsla(0deg, 0%, 100%, 0.85)",
  muted: "hsl(218, 56%, 92%)",
  mutedContrast: "hsl(218, 56%, 96%)",
  primary: "#2b62d8",
  subtlePrimary: "hsl(221, 90%, 35%)",
  secondary: "#35E6A7", //#50E6E3
  tertiary: "#7750E6",
  subtleFloating: "hsl(0deg, 0%, 100%)",
  scrollbar: "var(--color-gray-400)",
  scrollbarBackground: "transparent",
  code: code_theme_light,
  gray: {
    100: "hsl(225deg, 25%, 95%)",
    200: "hsl(225deg, 16%, 90%)",
    300: "hsl(225deg, 8%, 80%)",
    400: "hsl(225deg, 8%, 70%)",
    500: "hsl(225deg, 7%, 60%)",
    600: "hsl(225deg, 15%, 50%)",
    700: "hsl(225deg, 12%, 40%)",
    800: "hsl(225deg, 12%, 30%)",
    900: "hsl(225deg, 25%, 20%)",
    1000: "hsl(225deg, 15%, 15%)",
  },
  error: "hsl(340deg, 95%, 50%)",
  errorBackground: "hsla(340deg, 95%, 43%, 0.1)",
  success: "hsl(160deg, 100%, 40%)",
  successBackground: "hsla(160deg, 100%, 40%, 0.1)",
  warning: "hsl(37deg, 100%, 50%)",
  warningBackground: "hsla(52deg, 100%, 50%, 0.25)",
  info: "var(--color-primary)",
  infoBackground: "hsl(210deg, 55%, 92%)",
  danger: "hsl(8, 100%, 57%)",
  dangerBackground: "hsla(17, 85%, 87%, 0.7)",
};

// // Atom one dark
// const code_theme_dark: CodeTheme = {
//   base: "#282c34",
//   mono: {
//     1: "#abb2bf",
//     2: "#818896",
//     3: "#5c6370",
//   },
//   hue: {
//     1: "#56b6c2",
//     2: "#61aeee",
//     3: "#c678dd",
//     4: "#98c379",
//     5: "#e06c75",
//     "5-2": "#be5046",
//     6: "#d19a66",
//     "6-2": "#e6c07b",
//   },
// };

// https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/colors.ts
const code_theme_dark: CodeTheme = {
  base: "hsl(222, 23%, 18%)",
  mono: {
    1: "#abb2bf",
    2: "#818896",
    3: "#5c6370",
  },
  hue: {
    1: "#56b6c2",
    2: "#61aeee",
    3: "#c678dd",
    4: "#98c379",
    5: "#e06c75",
    "5-2": "#be5046",
    6: "#d19a66",
    "6-2": "#e6c07b",
  },
  diff: {
    deletedLine: "hsl(0deg 24% 50.98% / 12%)",
    changedText: "hsl(120deg 69.23% 43.33% / 40%)",
    changedLine: "hsl(148deg 40% 51% / 10%)",
  },
};

export const DARK_COLORS = {
  // text: "white",
  text: "hsl(280, 23%, 95%)", // Magnolia

  background: "hsl(223, 28%, 13%)",
  subtleBackground: "hsl(223, 28%, 13%)",
  blurredBackground: "hsla(223deg, 30%, 8%, 0.85)",
  darkerBackground: "hsl(223, 25%, 9%)",
  muted: "hsl(223, 30%, 20%)",
  mutedContrast: "hsl(223, 30%, 15%)",
  primary: "#FF69B4",
  subtlePrimary: "hsl(330, 80%, 80%)",
  // #3A405A
  secondary: "#C669FF",
  tertiary: "#FF8769",
  subtleFloating: "hsl(223, 24%, 22%)",
  scrollbar: "var(--color-gray-700)",
  scrollbarBackground: "#2b333b",
  code: code_theme_dark,
  gray: {
    100: "hsl(210deg, 15%, 20%)",
    200: "hsl(210deg, 15%, 25%)",
    300: "hsl(210deg, 10%, 40%)",
    400: "hsl(210deg, 9%, 45%)",
    500: "hsl(210deg, 8%, 50%)",
    600: "hsl(210deg, 12%, 55%)",
    700: "hsl(210deg, 14%, 66%)",
    800: "hsl(210deg, 17%, 77%)",
    900: "hsl(210deg, 25%, 88%)",
    1000: "hsl(210deg, 25%, 96%)",
  },
  error: "hsl(340deg, 95%, 60%)",
  errorBackground: "hsla(340deg, 95%, 43%, 0.1)",
  success: "hsl(160deg, 100%, 40%)",
  successBackground: "hsla(160deg, 100%, 40%, 0.1)",
  warning: "hsl(30deg, 100%, 50%)",
  warningBackground: "hsl(40deg, 17%, 21%)",
  info: "hsl(230deg, 100%, 69%)",
  infoBackground: "hsl(223deg, 31%, 24%)",
  danger: "hsl(0deg 81.28% 58.63%)",
  dangerBackground: "hsl(6.65deg 25.19% 23.95%)",
};

export const SHADOWS = {
  low: `0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),
  0.6px 0.6px 1.3px hsl(var(--shadow-color) / 0.05),
  1.3px 1.1px 2.6px hsl(var(--shadow-color) / 0.1),
  2.6px 2.3px 5.2px hsl(var(--shadow-color) / 0.15)`,
  medium: `0.3px 0.3px 0.6px hsl(var(--shadow-color) / 0),
  1.3px 1.3px 2.8px hsl(var(--shadow-color) / 0.05),
  2.5px 2.6px 5.4px hsl(var(--shadow-color) / 0.09),
  5.1px 5.4px 11.1px hsl(var(--shadow-color) / 0.14)`,
  high: `0.4px 0.4px 0.5px hsl(var(--shadow-color) / 0.15),
  1.1px 1.1px 1.4px -0.6px hsl(var(--shadow-color) / 0.14),
  2.2px 2.2px 2.7px -1.2px hsl(var(--shadow-color) / 0.12),
  4.4px 4.4px 5.5px -1.8px hsl(var(--shadow-color) / 0.11),
  8.3px 8.3px 10.3px -2.4px hsl(var(--shadow-color) / 0.09),
  14.6px 14.6px 18.1px -3px hsl(var(--shadow-color) / 0.08),
  23.9px 23.9px 29.7px -3.6px hsl(var(--shadow-color) / 0.06),
  36.8px 36.8px 45.7px -4.1px hsl(var(--shadow-color) / 0.05)`,
};

export const VARIABLES = {
  "shadow-color": "0deg 0% 0%",
  font: {
    family: `"Wotfard", sans-serif`,
    weight: {
      light: 400,
      medium: 500,
      bold: 600,
    },
  },
  scrollbar: {
    width: "10px",
    height: "10px",
  },
};

export const HEADER_HEIGHT = "2.5rem";

export const TRANSITION_DURATION = 350;

export const THEME_KEY = "theme";
export const THEME_CSS_PROP = `--${THEME_KEY}`;

export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 563,
  md: 768,
  lg: 1024,
  xl: 1440,
};

export const BREAKPOINTS = {
  xs: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  sm: `(min-width: ${BREAKPOINT_SIZES.xs}px and max-width: ${BREAKPOINT_SIZES.sm}px)`,
  md: `(min-width: ${BREAKPOINT_SIZES.sm}px and max-width: ${BREAKPOINT_SIZES.md}px)`,
  lg: `(min-width: ${BREAKPOINT_SIZES.md}px and max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xl: `(min-width: ${BREAKPOINT_SIZES.lg}px and max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xs}px)`,
  smAndSmaller: `(max-width: ${BREAKPOINT_SIZES.sm}px)`,
  mdAndSmaller: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  lgAndSmaller: `(max-width: ${BREAKPOINT_SIZES.lg}px)`,
  xlAndSmaller: `(max-width: ${BREAKPOINT_SIZES.xl}px)`,
  xsAndLarger: `(min-width: ${BREAKPOINT_SIZES.xs + 1}px)`,
  smAndLarger: `(min-width: ${BREAKPOINT_SIZES.sm + 1}px)`,
  mdAndLarger: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
  lgAndLarger: `(min-width: ${BREAKPOINT_SIZES.lg + 1}px)`,
  xlAndLarger: `(min-width: ${BREAKPOINT_SIZES.xl + 1}px)`,
  mobile: `(max-width: ${BREAKPOINT_SIZES.md}px)`,
  desktop: `(min-width: ${BREAKPOINT_SIZES.md + 1}px)`,
};

export const theme = {
  breakpoints: BREAKPOINTS,
};

export type Theme = typeof theme;

export default theme;
