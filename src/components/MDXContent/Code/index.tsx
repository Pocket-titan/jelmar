import { useState, type HTMLAttributes, type PropsWithChildren } from "react";
import styled from "styled-components";
import { stringifyChildren } from "ts/utils";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useEditor } from "ts/hooks";
import { syntaxColors } from "./highlighting";
import { TRANSITION_DURATION } from "ts/theme";
import { languages } from "./languages";

const Code = ({
  language = "markdown",
  hasCopyButton = false,
  wrapLines = true,
  filename,
  oldValue,
  children,
  ...props
}: PropsWithChildren<
  {
    language?: string;
    filename?: string;
    hasCopyButton?: boolean;
    wrapLines?: boolean;
    oldValue?: string;
  } & HTMLAttributes<HTMLPreElement>
>) => {
  const value = stringifyChildren(children).trim();
  const isMergeEditor = oldValue !== undefined;
  const name = findName(language) || language;
  const prefix = findPrefix(name);
  const { ref } = useEditor(
    {
      value,
      oldValue,
    },
    [languages[name], syntaxColors].filter((x) => !!x),
    wrapLines
  );

  // Precompute height to prevent layout shift. This will be wrong when the lines  wrap, but it's
  // better than nothing.
  const fontSize = 14.4;
  const paddingY = 13;
  const lineHeight = 1.5;
  const minHeight = 2 * paddingY + fontSize * value.split("\n").length * lineHeight;

  return (
    <pre {...props}>
      <CodeWrapper className="code-wrapper">
        <Floating>
          {hasCopyButton && (
            <CopyButton
              id={(value.slice(0, 10) + value.slice(-10)).replaceAll(/\s/g, "")}
              onClick={() => {
                navigator.permissions.query({ name: "clipboard-write" as any }).then((result) => {
                  if (result.state === "granted" || result.state === "prompt") {
                    navigator.clipboard.writeText(value);
                  }
                });
              }}
            />
          )}
          <CodeLanguage className="code-language">{prefix}</CodeLanguage>
        </Floating>
        {filename && (
          <FilenameWrapper>
            <Filename>{filename}</Filename>
          </FilenameWrapper>
        )}
        <EditorWrapper
          className="editor-wrapper"
          style={{ minHeight, paddingTop: filename ? "calc(13px + 1em)" : "13px" }}
          ref={(x) => (ref.current = x!)}
        />
      </CodeWrapper>
    </pre>
  );
};

const FilenameWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Filename = styled.span`
  font-family: monospace;
  color: var(--color-gray-600);
  font-size: 14px;
`;

const CodeWrapper = styled.div`
  position: relative;
  margin-top: 1.25em;
  margin-bottom: 1.25em;

  * {
    font-family: var(--font-monospace), monospace !important;
    font-weight: 450 !important;
  }
`;

const Floating = styled.div`
  position: absolute;
  right: 5px;
  top: 0px;

  display: flex;
  flex-direction: row;
  gap: 4px;

  margin-right: 4px;
`;

const CopyButtonWrapper = styled.button`
  transition: color ${TRANSITION_DURATION}ms ease 0s, opacity ${TRANSITION_DURATION}ms,
    background ${TRANSITION_DURATION}ms ease 0s;
  color: var(--color-gray-400);
  /* background: color-mix(in srgb, var(--color-code-base) 80%, var(--color-gray-400) 20%); */
  background: transparent;

  margin-top: 12px;
  padding: 6px 6px;
  border-radius: 4px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-gray-600) !important;
    /* background: color-mix(in srgb, var(--color-code-base) 80%, var(--color-gray-600) 20%); */
  }

  z-index: 999;
  cursor: pointer;

  @media ${(p) => p.theme.breakpoints.mobile} {
    opacity: 0;
  }
`;

const CopyIcon = styled(FaCopy)`
  font-size: 18px;
`;

const CopyButton = ({ id, ...props }: { id: string } & HTMLAttributes<HTMLButtonElement>) => {
  const [content, setContent] = useState("Copy code");

  return (
    <CopyButtonWrapper
      {...props}
      data-tooltip-id={id}
      onClick={(event) => {
        setContent("Copied!");
        props.onClick?.(event);
      }}
    >
      <CopyIcon />
      <Tooltip
        id={id}
        content={content}
        style={{
          background: "color-mix(in srgb, var(--color-gray-500) 20%, var(--color-muted) 80%)",
          color: "var(--color-gray-900)",
          fontSize: 14,
        }}
        afterHide={() => setContent("Copy code")}
      />
    </CopyButtonWrapper>
  );
};

const CodeLanguage = styled.div`
  transition: color ${TRANSITION_DURATION}ms ease 0s, opacity ${TRANSITION_DURATION}ms;
  color: var(--color-gray-300);

  font-size: 18px;
  padding: 12px 8px 0px;
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

  /* Gutter (only for line numbers) */
  div.cm-gutters {
    transition: background ${TRANSITION_DURATION}ms ease 0s, border ${TRANSITION_DURATION}ms ease 0s,
      color ${TRANSITION_DURATION}ms ease 0s;
    --bg: var(--color-code-base);
    color: var(--color-code-mono-3);
    background: var(--bg);
    border-right: 1px solid var(--bg);
    padding-right: 7px;
  }

  /* Lines */
  span.line-number-hidden {
    transition: color ${TRANSITION_DURATION}ms ease 0s;
    color: var(--color-code-mono-3);
  }

  .cm-changedLine {
    transition: background ${TRANSITION_DURATION}ms ease 0s;
    background: var(--color-code-diff-changed-line) !important;
  }

  .cm-changedText {
    --color: var(--color-code-diff-changed-text);
    transition: background ${TRANSITION_DURATION}ms ease 0s;
    background: linear-gradient(var(--color), var(--color)) bottom/100% 2px no-repeat !important;
  }

  .cm-deletedChunk {
    transition: background ${TRANSITION_DURATION}ms ease 0s, color ${TRANSITION_DURATION}ms ease 0s;
    background: var(--color-code-diff-deleted-line) !important;
    color: var(--color-code-mono-2) !important;
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
  fortran: ["fortran", "f90"],
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
  fortran: "f90",
};

const findPrefix = (name: string) => {
  if (name in prefixMap) {
    return prefixMap[name as keyof typeof prefixMap];
  }

  return null;
};

export default Code;
