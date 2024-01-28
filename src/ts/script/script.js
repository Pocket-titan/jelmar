/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ../theme.ts
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
var code_theme_light = {
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
};
var LIGHT_COLORS = {
    // text: "#000",
    text: "hsl(340, 13%, 5%)", // Night
    background: "white",
    subtleBackground: "hsl(225deg, 25%, 95%)",
    blurredBackground: "hsla(0deg, 0%, 100%, 0.85)",
    muted: "hsl(218, 56%, 92%)",
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
    alert: "hsl(37deg, 100%, 50%)",
    alertBackground: "hsla(52deg, 100%, 50%, 0.25)",
    info: "var(--color-primary)",
    infoBackground: "hsl(210deg, 55%, 92%)",
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
var code_theme_dark = {
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
};
var DARK_COLORS = {
    // text: "white",
    text: "hsl(280, 23%, 95%)", // Magnolia
    background: "hsl(223, 28%, 13%)",
    subtleBackground: "hsl(223, 28%, 13%)",
    blurredBackground: "hsla(223deg, 30%, 8%, 0.85)",
    darkerBackground: "hsl(223, 25%, 9%)",
    muted: "hsl(223, 30%, 20%)",
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
    alert: "hsl(30deg, 100%, 50%)",
    alertBackground: "hsl(40deg 13% 13%)",
    info: "hsl(230deg, 100%, 69%)",
    infoBackground: "var(--color-muted)",
};
var SHADOWS = {
    low: "0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),\n  0.6px 0.6px 1.3px hsl(var(--shadow-color) / 0.05),\n  1.3px 1.1px 2.6px hsl(var(--shadow-color) / 0.1),\n  2.6px 2.3px 5.2px hsl(var(--shadow-color) / 0.15)",
    medium: "0.3px 0.3px 0.6px hsl(var(--shadow-color) / 0),\n  1.3px 1.3px 2.8px hsl(var(--shadow-color) / 0.05),\n  2.5px 2.6px 5.4px hsl(var(--shadow-color) / 0.09),\n  5.1px 5.4px 11.1px hsl(var(--shadow-color) / 0.14)",
    high: "0.4px 0.4px 0.5px hsl(var(--shadow-color) / 0.15),\n  1.1px 1.1px 1.4px -0.6px hsl(var(--shadow-color) / 0.14),\n  2.2px 2.2px 2.7px -1.2px hsl(var(--shadow-color) / 0.12),\n  4.4px 4.4px 5.5px -1.8px hsl(var(--shadow-color) / 0.11),\n  8.3px 8.3px 10.3px -2.4px hsl(var(--shadow-color) / 0.09),\n  14.6px 14.6px 18.1px -3px hsl(var(--shadow-color) / 0.08),\n  23.9px 23.9px 29.7px -3.6px hsl(var(--shadow-color) / 0.06),\n  36.8px 36.8px 45.7px -4.1px hsl(var(--shadow-color) / 0.05)",
};
var VARIABLES = {
    "shadow-color": "0deg 0% 0%",
    font: {
        family: "\"Wotfard\", sans-serif",
        weight: {
            light: 400,
            medium: 500,
            bold: 600,
        },
    },
};
var TRANSITION_DURATION = 350;
var THEME_KEY = "prefers-dark";
var THEME_CSS_PROP = "--".concat(THEME_KEY);
var BREAKPOINT_SIZES = {
    xs: 320,
    sm: 563,
    md: 768,
    lg: 1024,
    xl: 1440,
};
var BREAKPOINTS = {
    xs: "(max-width: ".concat(BREAKPOINT_SIZES.xs, "px)"),
    sm: "(min-width: ".concat(BREAKPOINT_SIZES.xs, "px and max-width: ").concat(BREAKPOINT_SIZES.sm, "px)"),
    md: "(min-width: ".concat(BREAKPOINT_SIZES.sm, "px and max-width: ").concat(BREAKPOINT_SIZES.md, "px)"),
    lg: "(min-width: ".concat(BREAKPOINT_SIZES.md, "px and max-width: ").concat(BREAKPOINT_SIZES.lg, "px)"),
    xl: "(min-width: ".concat(BREAKPOINT_SIZES.lg, "px and max-width: ").concat(BREAKPOINT_SIZES.xl, "px)"),
    xsAndSmaller: "(max-width: ".concat(BREAKPOINT_SIZES.xs, "px)"),
    smAndSmaller: "(max-width: ".concat(BREAKPOINT_SIZES.sm, "px)"),
    mdAndSmaller: "(max-width: ".concat(BREAKPOINT_SIZES.md, "px)"),
    lgAndSmaller: "(max-width: ".concat(BREAKPOINT_SIZES.lg, "px)"),
    xlAndSmaller: "(max-width: ".concat(BREAKPOINT_SIZES.xl, "px)"),
    xsAndLarger: "(min-width: ".concat(BREAKPOINT_SIZES.xs + 1, "px)"),
    smAndLarger: "(min-width: ".concat(BREAKPOINT_SIZES.sm + 1, "px)"),
    mdAndLarger: "(min-width: ".concat(BREAKPOINT_SIZES.md + 1, "px)"),
    lgAndLarger: "(min-width: ".concat(BREAKPOINT_SIZES.lg + 1, "px)"),
    xlAndLarger: "(min-width: ".concat(BREAKPOINT_SIZES.xl + 1, "px)"),
    mobile: "(max-width: ".concat(BREAKPOINT_SIZES.md, "px)"),
    desktop: "(min-width: ".concat(BREAKPOINT_SIZES.md + 1, "px)"),
};
var theme = {
    breakpoints: BREAKPOINTS,
};
/* harmony default export */ const theme_0 = ((/* unused pure expression or super */ null && (theme)));

;// CONCATENATED MODULE: ../utils.ts
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    var MONTHS = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return "".concat(MONTHS[date.getMonth()], " ").concat(date.getDate(), ", ").concat(date.getFullYear());
}
var throttle = function (func, limit) {
    var lastFunc;
    var lastRan;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!lastRan) {
            func.apply(null, args);
            lastRan = Date.now();
        }
        else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(null, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};
function stringifyChildren(children) {
    if (!children) {
        return "";
    }
    if (typeof children === "string") {
        return children;
    }
    if (typeof children === "number" || typeof children === "boolean") {
        return children.toString();
    }
    if (Array.isArray(children)) {
        return children.map(stringifyChildren).join("");
    }
    if (typeof children === "object") {
        if ("props" in children) {
            if ("children" in children.props) {
                return stringifyChildren(children.props.children);
            }
        }
    }
    return "";
}
function lowerFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function keysToVariables(object, prefix) {
    if (prefix === void 0) { prefix = ""; }
    function fn(acc, _a) {
        var key = _a[0], val = _a[1];
        var newKey = key
            .toString()
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase();
        if (typeof val === "object" && val !== null) {
            return Object.entries(val)
                .map(function (_a) {
                var key = _a[0], val = _a[1];
                return ["".concat(newKey, "-").concat(lowerFirst(key)), val];
            })
                .reduce(fn, acc);
        }
        acc[newKey] = "".concat(val);
        return acc;
    }
    return Object.entries(object)
        .map(function (_a) {
        var key = _a[0], val = _a[1];
        return ["--".concat(prefix.length > 0 ? prefix.toLowerCase() + "-" : "").concat(lowerFirst(key)), val];
    })
        .reduce(fn, {});
}
var roundTo = function (number, places) {
    if (places === void 0) { places = 0; }
    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
};

;// CONCATENATED MODULE: ./script.ts


function setInitialPrefersDark() {
    function getInitialPrefersDark() {
        var preference = window.localStorage.getItem(THEME_KEY);
        var hasPreference = typeof preference === "string";
        if (hasPreference) {
            return preference;
        }
        var QUERY = "(prefers-color-scheme: dark)";
        var mediaQueryList = window.matchMedia(QUERY);
        var hasMediaPreference = typeof mediaQueryList.matches === "boolean";
        if (hasMediaPreference) {
            return mediaQueryList.matches ? "dark" : "light";
        }
        return "light";
    }
    var prefersDark = getInitialPrefersDark();
    var colorMode = prefersDark ? "dark" : "light";
    var root = document.documentElement;
    root.style.setProperty(THEME_CSS_PROP, prefersDark);
    root.setAttribute("data-color-mode", colorMode);
    var colors = prefersDark ? DARK_COLORS : LIGHT_COLORS;
    Object.entries(keysToVariables(colors, "color")).forEach(function (_a) {
        var name = _a[0], color = _a[1];
        root.style.setProperty(name, color);
    });
}
setInitialPrefersDark();

/******/ })()
;