/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./script.ts":
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ts_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ts/theme */ \"../theme.ts\");\n/* harmony import */ var _ts_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ts/utils */ \"../utils.ts\");\n\n\nfunction setInitialColorMode() {\n    function getInitialColorMode() {\n        var preference = window.localStorage.getItem(_ts_theme__WEBPACK_IMPORTED_MODULE_0__.THEME_KEY);\n        var hasPreference = typeof preference === \"string\";\n        if (hasPreference) {\n            return preference;\n        }\n        var QUERY = \"(prefers-color-scheme: dark)\";\n        var mediaQueryList = window.matchMedia(QUERY);\n        var hasMediaPreference = typeof mediaQueryList.matches === \"boolean\";\n        if (hasMediaPreference) {\n            return mediaQueryList.matches ? \"dark\" : \"light\";\n        }\n        return \"light\";\n    }\n    var colorMode = getInitialColorMode();\n    var root = document.documentElement;\n    root.style.setProperty(_ts_theme__WEBPACK_IMPORTED_MODULE_0__.THEME_CSS_PROP, colorMode);\n    root.setAttribute(\"data-color-mode\", colorMode);\n    var colors = colorMode === \"dark\" ? _ts_theme__WEBPACK_IMPORTED_MODULE_0__.DARK_COLORS : _ts_theme__WEBPACK_IMPORTED_MODULE_0__.LIGHT_COLORS;\n    Object.entries((0,_ts_utils__WEBPACK_IMPORTED_MODULE_1__.keysToVariables)(colors, \"color\")).forEach(function (_a) {\n        var name = _a[0], color = _a[1];\n        root.style.setProperty(name, color);\n    });\n}\nsetInitialColorMode();\n\n\n//# sourceURL=webpack:///./script.ts?");

/***/ }),

/***/ "../theme.ts":
/*!*******************!*\
  !*** ../theme.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BREAKPOINTS: () => (/* binding */ BREAKPOINTS),\n/* harmony export */   BREAKPOINT_SIZES: () => (/* binding */ BREAKPOINT_SIZES),\n/* harmony export */   DARK_COLORS: () => (/* binding */ DARK_COLORS),\n/* harmony export */   LIGHT_COLORS: () => (/* binding */ LIGHT_COLORS),\n/* harmony export */   SHADOWS: () => (/* binding */ SHADOWS),\n/* harmony export */   THEME_CSS_PROP: () => (/* binding */ THEME_CSS_PROP),\n/* harmony export */   THEME_KEY: () => (/* binding */ THEME_KEY),\n/* harmony export */   TRANSITION_DURATION: () => (/* binding */ TRANSITION_DURATION),\n/* harmony export */   VARIABLES: () => (/* binding */ VARIABLES),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   theme: () => (/* binding */ theme)\n/* harmony export */ });\n// // Atom one light\n// const code_theme_light: CodeTheme = {\n//   base: \"#f0f0f0\",\n//   mono: {\n//     1: \"#383a42\",\n//     2: \"#696c77\",\n//     3: \"#a0a1a7\",\n//   },\n//   hue: {\n//     1: \"#0184bc\",\n//     2: \"#4078f2\",\n//     3: \"#a626a4\",\n//     4: \"#50a14f\",\n//     5: \"#e45649\",\n//     \"5-2\": \"#ca1243\",\n//     6: \"#986801\",\n//     \"6-2\": \"#c18401\",\n//   },\n// };\n// https://github.com/fisheva/Eva-Theme/blob/master/themes/Eva-Light.json\nvar code_theme_light = {\n    base: \"hsl(222, 33%, 95%)\",\n    mono: {\n        1: \"#383a42\",\n        2: \"#696c77\",\n        3: \"#a0a1a7\",\n    },\n    hue: {\n        1: \"#0184bc\",\n        2: \"#4078f2\",\n        3: \"#a626a4\",\n        4: \"#50a14f\",\n        5: \"#e45649\",\n        \"5-2\": \"#ca1243\",\n        6: \"#d45b3d\",\n        \"6-2\": \"#5bb6cd\",\n    },\n};\nvar LIGHT_COLORS = {\n    // text: \"#000\",\n    text: \"hsl(340, 13%, 5%)\", // Night\n    background: \"white\",\n    subtleBackground: \"hsl(225deg, 25%, 95%)\",\n    blurredBackground: \"hsla(0deg, 0%, 100%, 0.85)\",\n    muted: \"hsl(218, 56%, 92%)\",\n    primary: \"#2b62d8\",\n    subtlePrimary: \"hsl(221, 90%, 35%)\",\n    secondary: \"#35E6A7\", //#50E6E3\n    tertiary: \"#7750E6\",\n    subtleFloating: \"hsl(0deg, 0%, 100%)\",\n    scrollbar: \"var(--color-gray-400)\",\n    scrollbarBackground: \"transparent\",\n    code: code_theme_light,\n    gray: {\n        100: \"hsl(225deg, 25%, 95%)\",\n        200: \"hsl(225deg, 16%, 90%)\",\n        300: \"hsl(225deg, 8%, 80%)\",\n        400: \"hsl(225deg, 8%, 70%)\",\n        500: \"hsl(225deg, 7%, 60%)\",\n        600: \"hsl(225deg, 15%, 50%)\",\n        700: \"hsl(225deg, 12%, 40%)\",\n        800: \"hsl(225deg, 12%, 30%)\",\n        900: \"hsl(225deg, 25%, 20%)\",\n        1000: \"hsl(225deg, 15%, 15%)\",\n    },\n    error: \"hsl(340deg, 95%, 50%)\",\n    errorBackground: \"hsla(340deg, 95%, 43%, 0.1)\",\n    success: \"hsl(160deg, 100%, 40%)\",\n    successBackground: \"hsla(160deg, 100%, 40%, 0.1)\",\n    alert: \"hsl(37deg, 100%, 50%)\",\n    alertBackground: \"hsla(52deg, 100%, 50%, 0.25)\",\n    info: \"var(--color-primary)\",\n    infoBackground: \"hsl(210deg, 55%, 92%)\",\n};\n// // Atom one dark\n// const code_theme_dark: CodeTheme = {\n//   base: \"#282c34\",\n//   mono: {\n//     1: \"#abb2bf\",\n//     2: \"#818896\",\n//     3: \"#5c6370\",\n//   },\n//   hue: {\n//     1: \"#56b6c2\",\n//     2: \"#61aeee\",\n//     3: \"#c678dd\",\n//     4: \"#98c379\",\n//     5: \"#e06c75\",\n//     \"5-2\": \"#be5046\",\n//     6: \"#d19a66\",\n//     \"6-2\": \"#e6c07b\",\n//   },\n// };\n// https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/colors.ts\nvar code_theme_dark = {\n    base: \"hsl(222, 23%, 18%)\",\n    mono: {\n        1: \"#abb2bf\",\n        2: \"#818896\",\n        3: \"#5c6370\",\n    },\n    hue: {\n        1: \"#56b6c2\",\n        2: \"#61aeee\",\n        3: \"#c678dd\",\n        4: \"#98c379\",\n        5: \"#e06c75\",\n        \"5-2\": \"#be5046\",\n        6: \"#d19a66\",\n        \"6-2\": \"#e6c07b\",\n    },\n};\nvar DARK_COLORS = {\n    // text: \"white\",\n    text: \"hsl(280, 23%, 95%)\", // Magnolia\n    background: \"hsl(223, 28%, 13%)\",\n    subtleBackground: \"hsl(223, 28%, 13%)\",\n    blurredBackground: \"hsla(223deg, 30%, 8%, 0.85)\",\n    darkerBackground: \"hsl(223, 25%, 9%)\",\n    muted: \"hsl(223, 30%, 20%)\",\n    primary: \"#FF69B4\",\n    subtlePrimary: \"hsl(330, 80%, 80%)\",\n    // #3A405A\n    secondary: \"#C669FF\",\n    tertiary: \"#FF8769\",\n    subtleFloating: \"hsl(223, 24%, 22%)\",\n    scrollbar: \"var(--color-gray-700)\",\n    scrollbarBackground: \"#2b333b\",\n    code: code_theme_dark,\n    gray: {\n        100: \"hsl(210deg, 15%, 20%)\",\n        200: \"hsl(210deg, 15%, 25%)\",\n        300: \"hsl(210deg, 10%, 40%)\",\n        400: \"hsl(210deg, 9%, 45%)\",\n        500: \"hsl(210deg, 8%, 50%)\",\n        600: \"hsl(210deg, 12%, 55%)\",\n        700: \"hsl(210deg, 14%, 66%)\",\n        800: \"hsl(210deg, 17%, 77%)\",\n        900: \"hsl(210deg, 25%, 88%)\",\n        1000: \"hsl(210deg, 25%, 96%)\",\n    },\n    error: \"hsl(340deg, 95%, 60%)\",\n    errorBackground: \"hsla(340deg, 95%, 43%, 0.1)\",\n    success: \"hsl(160deg, 100%, 40%)\",\n    successBackground: \"hsla(160deg, 100%, 40%, 0.1)\",\n    alert: \"hsl(30deg, 100%, 50%)\",\n    alertBackground: \"hsl(40deg 13% 13%)\",\n    info: \"hsl(230deg, 100%, 69%)\",\n    infoBackground: \"var(--color-muted)\",\n};\nvar SHADOWS = {\n    low: \"0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),\\n  0.6px 0.6px 1.3px hsl(var(--shadow-color) / 0.05),\\n  1.3px 1.1px 2.6px hsl(var(--shadow-color) / 0.1),\\n  2.6px 2.3px 5.2px hsl(var(--shadow-color) / 0.15)\",\n    medium: \"0.3px 0.3px 0.6px hsl(var(--shadow-color) / 0),\\n  1.3px 1.3px 2.8px hsl(var(--shadow-color) / 0.05),\\n  2.5px 2.6px 5.4px hsl(var(--shadow-color) / 0.09),\\n  5.1px 5.4px 11.1px hsl(var(--shadow-color) / 0.14)\",\n    high: \"0.4px 0.4px 0.5px hsl(var(--shadow-color) / 0.15),\\n  1.1px 1.1px 1.4px -0.6px hsl(var(--shadow-color) / 0.14),\\n  2.2px 2.2px 2.7px -1.2px hsl(var(--shadow-color) / 0.12),\\n  4.4px 4.4px 5.5px -1.8px hsl(var(--shadow-color) / 0.11),\\n  8.3px 8.3px 10.3px -2.4px hsl(var(--shadow-color) / 0.09),\\n  14.6px 14.6px 18.1px -3px hsl(var(--shadow-color) / 0.08),\\n  23.9px 23.9px 29.7px -3.6px hsl(var(--shadow-color) / 0.06),\\n  36.8px 36.8px 45.7px -4.1px hsl(var(--shadow-color) / 0.05)\",\n};\nvar VARIABLES = {\n    \"shadow-color\": \"0deg 0% 0%\",\n    font: {\n        family: \"\\\"Wotfard\\\", sans-serif\",\n        weight: {\n            light: 400,\n            medium: 500,\n            bold: 600,\n        },\n    },\n};\nvar TRANSITION_DURATION = 350;\nvar THEME_KEY = \"theme\";\nvar THEME_CSS_PROP = \"--\".concat(THEME_KEY);\nvar BREAKPOINT_SIZES = {\n    xs: 320,\n    sm: 563,\n    md: 768,\n    lg: 1024,\n    xl: 1440,\n};\nvar BREAKPOINTS = {\n    xs: \"(max-width: \".concat(BREAKPOINT_SIZES.xs, \"px)\"),\n    sm: \"(min-width: \".concat(BREAKPOINT_SIZES.xs, \"px and max-width: \").concat(BREAKPOINT_SIZES.sm, \"px)\"),\n    md: \"(min-width: \".concat(BREAKPOINT_SIZES.sm, \"px and max-width: \").concat(BREAKPOINT_SIZES.md, \"px)\"),\n    lg: \"(min-width: \".concat(BREAKPOINT_SIZES.md, \"px and max-width: \").concat(BREAKPOINT_SIZES.lg, \"px)\"),\n    xl: \"(min-width: \".concat(BREAKPOINT_SIZES.lg, \"px and max-width: \").concat(BREAKPOINT_SIZES.xl, \"px)\"),\n    xsAndSmaller: \"(max-width: \".concat(BREAKPOINT_SIZES.xs, \"px)\"),\n    smAndSmaller: \"(max-width: \".concat(BREAKPOINT_SIZES.sm, \"px)\"),\n    mdAndSmaller: \"(max-width: \".concat(BREAKPOINT_SIZES.md, \"px)\"),\n    lgAndSmaller: \"(max-width: \".concat(BREAKPOINT_SIZES.lg, \"px)\"),\n    xlAndSmaller: \"(max-width: \".concat(BREAKPOINT_SIZES.xl, \"px)\"),\n    xsAndLarger: \"(min-width: \".concat(BREAKPOINT_SIZES.xs + 1, \"px)\"),\n    smAndLarger: \"(min-width: \".concat(BREAKPOINT_SIZES.sm + 1, \"px)\"),\n    mdAndLarger: \"(min-width: \".concat(BREAKPOINT_SIZES.md + 1, \"px)\"),\n    lgAndLarger: \"(min-width: \".concat(BREAKPOINT_SIZES.lg + 1, \"px)\"),\n    xlAndLarger: \"(min-width: \".concat(BREAKPOINT_SIZES.xl + 1, \"px)\"),\n    mobile: \"(max-width: \".concat(BREAKPOINT_SIZES.md, \"px)\"),\n    desktop: \"(min-width: \".concat(BREAKPOINT_SIZES.md + 1, \"px)\"),\n};\nvar theme = {\n    breakpoints: BREAKPOINTS,\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n\n\n//# sourceURL=webpack:///../theme.ts?");

/***/ }),

/***/ "../utils.ts":
/*!*******************!*\
  !*** ../utils.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   capitalize: () => (/* binding */ capitalize),\n/* harmony export */   formatDate: () => (/* binding */ formatDate),\n/* harmony export */   keysToVariables: () => (/* binding */ keysToVariables),\n/* harmony export */   roundTo: () => (/* binding */ roundTo),\n/* harmony export */   stringifyChildren: () => (/* binding */ stringifyChildren),\n/* harmony export */   throttle: () => (/* binding */ throttle)\n/* harmony export */ });\nfunction capitalize(str) {\n    return str.charAt(0).toUpperCase() + str.slice(1);\n}\nfunction formatDate(date) {\n    if (!(date instanceof Date)) {\n        date = new Date(date);\n    }\n    var MONTHS = [\n        \"January\",\n        \"Febuary\",\n        \"March\",\n        \"April\",\n        \"May\",\n        \"June\",\n        \"July\",\n        \"August\",\n        \"September\",\n        \"October\",\n        \"November\",\n        \"December\",\n    ];\n    return \"\".concat(MONTHS[date.getMonth()], \" \").concat(date.getDate(), \", \").concat(date.getFullYear());\n}\nvar throttle = function (func, limit) {\n    var lastFunc;\n    var lastRan;\n    return function () {\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            args[_i] = arguments[_i];\n        }\n        if (!lastRan) {\n            func.apply(null, args);\n            lastRan = Date.now();\n        }\n        else {\n            clearTimeout(lastFunc);\n            lastFunc = setTimeout(function () {\n                if (Date.now() - lastRan >= limit) {\n                    func.apply(null, args);\n                    lastRan = Date.now();\n                }\n            }, limit - (Date.now() - lastRan));\n        }\n    };\n};\nfunction stringifyChildren(children) {\n    if (!children) {\n        return \"\";\n    }\n    if (typeof children === \"string\") {\n        return children;\n    }\n    if (typeof children === \"number\" || typeof children === \"boolean\") {\n        return children.toString();\n    }\n    if (Array.isArray(children)) {\n        return children.map(stringifyChildren).join(\"\");\n    }\n    if (typeof children === \"object\") {\n        if (\"props\" in children) {\n            if (\"children\" in children.props) {\n                return stringifyChildren(children.props.children);\n            }\n        }\n    }\n    return \"\";\n}\nfunction lowerFirst(str) {\n    return str.charAt(0).toLowerCase() + str.slice(1);\n}\nfunction keysToVariables(object, prefix) {\n    if (prefix === void 0) { prefix = \"\"; }\n    function fn(acc, _a) {\n        var key = _a[0], val = _a[1];\n        var newKey = key\n            .toString()\n            .replace(/([A-Z])/g, \"-$1\")\n            .toLowerCase();\n        if (typeof val === \"object\" && val !== null) {\n            return Object.entries(val)\n                .map(function (_a) {\n                var key = _a[0], val = _a[1];\n                return [\"\".concat(newKey, \"-\").concat(lowerFirst(key)), val];\n            })\n                .reduce(fn, acc);\n        }\n        acc[newKey] = \"\".concat(val);\n        return acc;\n    }\n    return Object.entries(object)\n        .map(function (_a) {\n        var key = _a[0], val = _a[1];\n        return [\"--\".concat(prefix.length > 0 ? prefix.toLowerCase() + \"-\" : \"\").concat(lowerFirst(key)), val];\n    })\n        .reduce(fn, {});\n}\nvar roundTo = function (number, places) {\n    if (places === void 0) { places = 0; }\n    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);\n};\n\n\n//# sourceURL=webpack:///../utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./script.ts");
/******/ 	
/******/ })()
;