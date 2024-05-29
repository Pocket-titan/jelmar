import type { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { stringifyChildren } from "ts/utils";
import { useEditor } from "ts/hooks";
import { syntaxColors } from "./highlighting";
import { SHADOWS, TRANSITION_DURATION } from "ts/theme";
import { languages } from "./languages";

const Code = ({
  language = "markdown",
  wrapLines = true,
  children,
  ...props
}: PropsWithChildren<
  { language?: string; wrapLines?: boolean } & HTMLAttributes<HTMLPreElement>
>) => {
  const initialValue = stringifyChildren(children).trim();
  const name = findName(language) || language;
  const prefix = findPrefix(name);
  const { ref } = useEditor(
    {
      initialValue,
    },
    [languages[name], syntaxColors].filter((x) => !!x),
    wrapLines
  );

  // Precompute height to prevent layout shift. This will be wrong when the lines  wrap, but it's
  // better than nothing.
  const fontSize = 14.4;
  const paddingY = 13;
  const lineHeight = 1.5;
  const minHeight = 2 * paddingY + fontSize * initialValue.split("\n").length * lineHeight;

  return (
    <pre {...props}>
      <CodeWrapper className="code-wrapper">
        <CodeLanguage className="code-language">{prefix}</CodeLanguage>
        <EditorWrapper
          className="editor-wrapper"
          style={{ minHeight }}
          ref={(x) => (ref.current = x!)}
        />
      </CodeWrapper>
    </pre>
  );
};

const CodeWrapper = styled.div`
  position: relative;
  margin-top: 1.25em;
  margin-bottom: 1.25em;

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

  /* padding: 0.9em 1.15em;
  border-radius: 5px;
  font-size: 0.8rem; */

  padding: 13px 16px;
  border-radius: 5px;
  font-size: 14.5px;

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
