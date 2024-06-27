import { createGlobalStyle } from "styled-components";
import { memo } from "react";
import { BREAKPOINTS, TRANSITION_DURATION, VARIABLES } from "ts/theme";
import { keysToVariables } from "ts/utils";

const GlobalStyle = createGlobalStyle`
  /* Variables */
  :root {
    --font-monospace: "Fira Code";
    ${Object.entries(keysToVariables(VARIABLES))
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n")}
  }

  /* CSS reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    line-height: 1.5;
    /* line-height: calc(1em + 0.725rem); */
    -webkit-font-smoothing: antialiased;
  }

  p {
    line-height: 1.7;
  }


  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  ul {
    padding: 0;
  }

  #__next {
    isolation: isolate;
  }

  /* Custom */
  html {
    color: var(--color-text);
    background: var(--color-background);
  }

  body {
    color: var(--color-text);
    background: var(--color-background);
    overflow-x: hidden;
    width: 100vw;

    font-size: 1.1875rem;
  }

  body.has-transition {
    transition: color ${TRANSITION_DURATION}ms, background ${TRANSITION_DURATION}ms;
  }

  a:focus {
    outline: 5px auto var(--color-primary);
  }

  body, input, button, select, option {
    font-family: var(--font-family);
    font-weight: var(--font-weight-light);
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: var(--font-weight-bold);
  }

  code {
    font-size: 1rem;
  }

  button {
    color: inherit;
  }

  /* Selections */
  ::selection {
    background-color: var(--color-selection-background, var(--color-primary));
    color: var(--color-selection-text, white);
  }

  ::selection {
    background-color: var(--color-selection-background, var(--color-primary));
    color: var(--color-selection-text, white);
    background-image: none !important;
    -webkit-text-fill-color: var(--color-selection-text) !important;
    -moz-text-fill-color: var(--color-selection-text) !important;
    background-image: none !important;
    background-clip: revert !important;
    -webkit-background-clip: revert !important;
    text-shadow: none !important;
  }

  /* Scrollbar */
  /* @media (orientation: landscape) { */
  ::-webkit-scrollbar {
    width: var(--scrollbar-width, 8px);
    height: var(--scrollbar-height, 7px);
    background-color: var(--color-scrollbar-background, var(--color-gray-100));
    transition: background-color ${TRANSITION_DURATION}ms ease 0s;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: var(--color-scrollbar-background, transparent);
    transition: background-color ${TRANSITION_DURATION}ms ease 0s;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--color-scrollbar, var(--color-gray-700));
    border: 2px solid var(--color-scrollbar-background, var(--color-gray-100));
    transition: background-color ${TRANSITION_DURATION}ms ease 0s;
  }
  /* } */

  /* Code blocks */
  code {
    font-family: var(--font-monospace), monospace !important;
    font-weight: 450 !important;
  }

  /* Math */
  mtable {
    display: block;
  }

  /* I think I want this? */
  p + p {
    margin-top: 1.5em;
  }

  p, a, h1, h2, h3, h4, h5, h6 {
    transition: color 350ms ease 0s;
    color: var(--color-text);
  }

  /* Footnotes */
  .footnotes {
    font-size: smaller;
    color: var(--color-gray-700);
    border-top: 1.5px solid var(--color-gray-500);
    margin-top: 2.5em;
    padding-top: 0.5em;
  }

  /* Hide the section label for visual users. */
  .sr-only {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    word-wrap: normal;
    border: 0;
  }

  /* Place [ and ] around footnote references */
  [data-footnote-ref]::before {
    content: '[';
  }

  [data-footnote-ref]::after {
    content: ']';
  }

  /* Space */
  [data-footnote-ref] {
    text-underline-offset: 4px;
  }
`;

export default memo(GlobalStyle);
