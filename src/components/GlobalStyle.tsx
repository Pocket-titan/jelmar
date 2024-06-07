import { createGlobalStyle } from "styled-components";
import { memo } from "react";
import { BREAKPOINTS, TRANSITION_DURATION, VARIABLES } from "ts/theme";
import { keysToVariables } from "ts/utils";

const GlobalStyle = createGlobalStyle`
  /* Variables */
  :root {
    --duration: 10s;
    --font-monospace: "Fira Code";
    ${Object.entries(keysToVariables(VARIABLES))
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n")}
  }

  @media ${BREAKPOINTS.xlAndLarger} {
    :root {
      --duration: 20s;
    }
  }

  @media ${BREAKPOINTS.mdAndLarger} {
    :root {
      --duration: 16s;
    }
  }

  @media ${BREAKPOINTS.smAndSmaller} {
    :root {
      --duration: 12s;
    }
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

    width: 100%;
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
    font-size: 0.95em;
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
    width: var(--scrollbar-width, 10px);
    height: var(--scrollbar-height, 10px);
    background-color: var(--color-scrollbar-background, var(--color-gray-100));
    transition: background-color ${TRANSITION_DURATION}ms;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: var(--color-scrollbar-background, transparent);
    transition: background-color ${TRANSITION_DURATION}ms;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--color-scrollbar, var(--color-gray-700));
    border: 2px solid var(--color-scrollbar-background, var(--color-gray-100));
    transition: background-color ${TRANSITION_DURATION}ms;
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
`;

export default memo(GlobalStyle);
