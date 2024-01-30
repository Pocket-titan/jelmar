import type { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { stringifyChildren } from "src/ts/utils";
import { useEditor } from "src/ts/hooks";
import { syntaxColors } from "./highlighting";
import { SHADOWS, TRANSITION_DURATION } from "src/ts/theme";
import { languages } from "./languages";

const Code = ({
  language = "markdown",
  children,
  ...props
}: PropsWithChildren<{ language?: string } & HTMLAttributes<HTMLPreElement>>) => {
  const initialValue = stringifyChildren(children).trim();
  const name = findName(language) || language;
  const prefix = findPrefix(name);
  const { ref } = useEditor(
    {
      initialValue,
    },
    [languages[name], syntaxColors]
  );

  // Precompute height to prevent layout shift. This will be wrong when the lines  wrap, but it's
  // better than nothing.
  const fontSize = 15;
  const lineHeight = 1.5;
  const height = 2 * 15 + fontSize * initialValue.split("\n").length * lineHeight;

  return (
    <pre {...props}>
      <CodeWrapper className="code-wrapper">
        <CodeLanguage className="code-language">{prefix}</CodeLanguage>
        <EditorWrapper
          style={{ minHeight: height }}
          className="editor-wrapper"
          ref={(x) => (ref.current = x!)}
        />
      </CodeWrapper>
    </pre>
  );
};

const CodeWrapper = styled.div`
  position: relative;
  margin-top: 1.5em;
  margin-bottom: 1.5em;

  * {
    font-family: var(--font-monospace), monospace !important;
    font-weight: 450 !important;
  }
`;

const CodeLanguage = styled.div`
  transition: color ${TRANSITION_DURATION}ms ease 0s, opacity ${TRANSITION_DURATION}ms;
  color: var(--color-gray-300);
  position: absolute;
  top: 0px;
  right: 5px;
  font-size: 18px;
  padding: 8px 12px 0px;
  text-transform: uppercase;
  font-weight: 600 !important;
  opacity: 1;

  font-family: var(--font-ibm-plex-mono), monospace !important;

  @media ${(p) => p.theme.breakpoints.mobile} {
    opacity: 0;
  }
`;

const EditorWrapper = styled.div`
  color: var(--color-code-mono-1);
  background: var(--color-code-base);
  transition: background ${TRANSITION_DURATION}ms ease 0s, color ${TRANSITION_DURATION}ms ease 0s;
  /* box-shadow: ${SHADOWS.low}; */

  padding: 1em 1.25em;
  border-radius: 0.5em;
  font-size: 15px;

  * {
    line-height: 1.5 !important;
  }

  div.cm-line {
    padding-left: 0px !important;
  }

  div.cm-content {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  /* Syntax colors */
  .tok-keyword,
  .tok-definitionKeyword {
    color: var(--color-code-hue-3);
  }

  .tok-function,
  .tok-definition.tok-function {
    color: var(--color-code-hue-2);
  }

  .tok-typeName {
    color: var(--color-code-hue-6-2);
    font-style: italic;
  }

  .tok-propertyName {
    color: var(--color-code-hue-6);
  }

  .tok-literal {
    color: var(--color-code-hue-4);
  }

  .tok-number {
    color: var(--color-code-hue-1);
  }

  .tok-null {
    color: var(--color-code-hue-5);
  }

  .tok-comment {
    color: var(--color-code-mono-3);
  }

  .tok-punctuation {
    color: var(--color-code-mono-2);
  }

  .tok-className {
    color: var(--color-code-hue-6-2);
  }

  .tok-bool {
    color: var(--color-code-hue-5);
  }

  /* New */
  .tok-tagName {
    color: var(--color-code-hue-5);
  }
`;

const nameMap = {
  jsx: ["react-jsx", "jsx"],
  tsx: ["react-tsx", "tsx"],
  typescript: ["typescript", "ts"],
  javascript: ["javascript", "js"],
  julia: ["julia", "jl"],
  python: ["python", "py"],
  rust: ["rust", "rs"],
  bash: ["shell", "bash", "sh"],
  markdown: ["markdown", "md"],
  css: ["css"],
  cpp: ["c++", "cpp"],
  latex: ["latex", "tex"],
};

const findName = (name: string) => {
  for (const [key, value] of Object.entries(nameMap)) {
    if (value.includes(name)) {
      return key;
    }
  }

  return false;
};

const prefixMap = {
  jsx: "jsx",
  tsx: "tsx",
  typescript: "ts",
  javascript: "js",
  python: "py",
  rust: "rs",
  bash: "sh",
  markdown: "md",
  css: "css",
  cpp: "cpp",
  latex: "tex",
  julia: "jl",
};

const findPrefix = (name: string) => {
  if (name in prefixMap) {
    return prefixMap[name as keyof typeof prefixMap];
  }

  return null;
};

export default Code;
