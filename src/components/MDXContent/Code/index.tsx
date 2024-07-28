import React, { HTMLAttributes, PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { HighlightStyle, type LanguageSupport } from "@codemirror/language";
import { Text, type Extension } from "@codemirror/state";
import { highlightCode } from "@lezer/highlight";
import { Decoration } from "@codemirror/view";
import { Tooltip } from "react-tooltip";
import { FaCopy } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { last } from "lodash";
import { dedent, stringifyChildren } from "@ts/utils";
import { BREAKPOINTS, TRANSITION_DURATION } from "@ts/theme";
import { syntaxColors } from "./highlighting";
import { languages } from "./languages";

const Code = ({
  value,
  children,
  filename,
  language = "markdown",
  hasCopyButton = false,
  lineWrapping = false,
  lineNumbers = false,
  ...props
}: PropsWithChildren<{
  value?: string;
  language?: string;
  filename?: string;
  hasCopyButton?: boolean;
  lineWrapping?: boolean;
  lineNumbers?: boolean;
}> &
  HTMLAttributes<HTMLPreElement>) => {
  const currentValue = dedent(value ?? stringifyChildren(children));

  console.log("currentValue", currentValue);

  const name = findName(language) || language;
  const prefix = findPrefix(name);

  const { code, className } = renderToString(currentValue, languages[name], {
    lineNumbers,
    lineWrapping,
  });

  return (
    <pre {...props}>
      <CodeWrapper className="code-wrapper">
        <Floating>
          {hasCopyButton && (
            <CopyButton
              id={(
                currentValue.slice(0, 10) + currentValue.slice(-10)
              ).replaceAll(/\s/g, "")}
              onClick={() => {
                navigator.permissions
                  .query({ name: "clipboard-write" as any })
                  .then((result) => {
                    if (
                      result.state === "granted" ||
                      result.state === "prompt"
                    ) {
                      navigator.clipboard.writeText(currentValue);
                    }
                  });
              }}
            />
          )}
          <CodeLanguage className="code-language">{prefix}</CodeLanguage>
        </Floating>
        <FilenameContainer>
          <FilenameWrapper>
            <Filename title={filename}>{filename}</Filename>
          </FilenameWrapper>
        </FilenameContainer>

        <EditorWrapper
          className="editor-wrapper"
          style={{
            paddingTop: filename
              ? "calc(var(--padding-y) + 1em + 10px)"
              : "var(--padding-y)",
          }}
        >
          <div
            className={`cm-editor ${className}`}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </EditorWrapper>
      </CodeWrapper>
    </pre>
  );
};

const ArrowRight = styled(FaArrowRightLong)`
  font-family: sans-serif !important;
  font-weight: 400;
  color: var(--color-gray-600);
  font-size: 0.875rem;

  margin-left: auto;
  margin-right: auto;
  flex: 1;
`;

const Filename = styled.span`
  font-family: sans-serif !important;
  font-weight: 400;
  color: var(--color-gray-600);
  font-size: 0.875rem;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const FilenameWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  justify-content: center;
`;

const FilenameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 10px 16px;

  @media ${BREAKPOINTS.smAndSmaller} {
    .to-hide {
      display: none;
    }

    ${FilenameWrapper} {
      justify-content: center !important;
    }
  }
`;

const CodeLanguage = styled.div`
  transition: color ${TRANSITION_DURATION}ms ease 0s,
    opacity ${TRANSITION_DURATION}ms;
  color: var(--color-gray-300);

  font-size: 1rem;
  padding: 10px 8px 0px;
  text-transform: uppercase;
  font-weight: 600 !important;
  opacity: 1;

  font-family: var(--font-ibm-plex-mono), monospace !important;

  @media ${(p) => p.theme.breakpoints.mobile} {
    opacity: 0;
  }
`;

const CodeWrapper = styled.div`
  position: relative;
  margin-top: 0.75em;
  margin-bottom: 0.75em;

  *:not(${Filename}):not(${CodeLanguage}) {
    font-family: var(--font-monospace), monospace !important;
    font-weight: 450 !important;
  }

  pre:last-child & {
    margin-bottom: 0px;
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
  transition: color ${TRANSITION_DURATION}ms ease 0s,
    opacity ${TRANSITION_DURATION}ms,
    background ${TRANSITION_DURATION}ms ease 0s;
  color: var(--color-gray-400);
  /* background: color-mix(in srgb, var(--color-code-base) 80%, var(--color-gray-400) 20%); */
  background: transparent;

  margin-top: 10px;
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
  font-size: 1rem;
`;

const CopyButton = ({
  id,
  ...props
}: { id: string } & HTMLAttributes<HTMLButtonElement>) => {
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
          background:
            "color-mix(in srgb, var(--color-gray-500) 20%, var(--color-muted) 80%)",
          color: "var(--color-gray-900)",
          fontSize: 14,
        }}
        afterHide={() => setContent("Copy code")}
      />
    </CopyButtonWrapper>
  );
};

const EditorWrapper = styled.div`
  --padding-y: 13px;
  --padding-left: 16px;

  color: var(--color-code-mono-1);
  background: var(--color-code-base);
  transition: background ${TRANSITION_DURATION}ms ease 0s,
    color ${TRANSITION_DURATION}ms ease 0s;

  padding: var(--padding-y) 16px var(--padding-y) var(--padding-left);
  border-radius: 5px;
  font-size: 0.8rem;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;

  /* Base theme */
  .cm-editor {
    display: flex !important;
    flex-direction: column;
    height: 100%;
  }

  .cm-editor .cm-scroller {
    display: flex !important;
    align-items: flex-start !important;
    font-family: monospace;
    overflow-x: auto;
    position: relative;
    height: 100%;
  }

  .cm-editor .cm-content {
    box-sizing: border-box;
    margin: 0;
    min-height: 100%; /* For full height of viewport, not of content */
    word-wrap: normal;
    white-space: pre;
  }

  .cm-editor .cm-content.cm-lineWrapping {
    white-space: break-spaces;
    word-break: break-word;
    overflow-wrap: anywhere;
    flex-shrink: 1;
  }

  .cm-gutters {
    display: flex;
    flex-shrink: 0;
    height: 100%;
    position: sticky;
    box-sizing: border-box;
  }

  .cm-gutter {
    display: flex !important; /* Necessary -- prevents margin collapsing */
    flex-direction: column;
    flex-shrink: 0;
    box-sizing: border-box;
    min-height: 100%;
    overflow: hidden;
  }

  .cm-lineNumbers .cm-gutterElement {
    /* padding: 0 3px 0 5px; */
    /* min-width: 20px; */
    /* min-width: 14px; */
    text-align: right;
    white-space: nowrap;
    box-sizing: border-box;
  }

  /* Own styles */
  span {
    color: var(--color-code-mono-1);
  }

  * {
    line-height: 1.5 !important;
  }

  div.cm-line {
    padding-left: 0px !important;
  }

  div.cm-content {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    tab-size: 4;
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
    transition: background ${TRANSITION_DURATION}ms ease 0s,
      border ${TRANSITION_DURATION}ms ease 0s,
      color ${TRANSITION_DURATION}ms ease 0s;
    --bg: var(--color-code-base);
    color: var(--color-code-mono-3);
    background: var(--bg);
    border-right: 1px solid var(--bg);
    padding-right: 7px;
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

const getHighlightStyle = (theme: Extension): HighlightStyle =>
  (last(theme as any) as any).value;

const highlightStyle = getHighlightStyle(syntaxColors);

console.log(
  "highlightStyle.module.getRules()",
  highlightStyle?.module?.getRules?.()
);

type Mark = Decoration & { class?: string; tagName?: string };

type Config = {
  lineNumbers?: boolean;
  lineWrapping?: boolean;
};

function treeToString(code: string, language: LanguageSupport) {
  const parser = language?.language?.parser || (language as any)?.parser;
  const tree = parser.parse(code);

  let str = "";
  let open = 0;

  highlightCode(
    code,
    tree,
    highlightStyle,
    (code, classes) => {
      if (str.endsWith("</div>") || str === "") {
        str += "<div class='cm-line'>";
        open += 1;
      }

      const cls = classes
        .split(" ")
        .filter((x) => !x.startsWith("ͼ"))
        .join(" ")
        .trim();

      str += `<span${cls ? ` class='${cls}'` : ""}>${code}</span>`;
    },
    () => {
      if (open > 0) {
        str += "</div>";
        open -= 1;
      } else if (str !== "") {
        str += "<div class='cm-line'><br/></div>";
      }
    }
  );

  Array(open)
    .fill(0)
    .forEach(() => {
      str += "</div>";
    });

  return str;
}

function codeToString(code: string) {
  console.log('code.split("\n")', code.split("\n"));
  return code
    .split("\n")
    .map((line) => `<div class="cm-line">${line}</div>`)
    .join("\n");
}

function renderToString(
  code: string,
  language?: LanguageSupport,
  config: Config = {}
) {
  const str = language ? treeToString(code, language) : codeToString(code);
  const text = Text.of(code.split("\n"));

  let className = "";
  let gutterEl = "";

  if (config.lineNumbers) {
    const gutterNumEl = Array(text.lines)
      .fill(0)
      .map((_, i) => `<div class="cm-gutterElement">${i + 1}</div>`)
      .join("");

    gutterEl = `<div class="cm-gutters">
    <div class="cm-gutter cm-lineNumbers">${gutterNumEl}</div>
    </div>`;

    className += "gutter";
  }

  return {
    className,
    code: `<div class="cm-scroller">${gutterEl}
    <div class="cm-content${
      config.lineWrapping ? " cm-lineWrapping" : ""
    }">${str}</div>
    </div>`,
    codeLinesOnly: str,
  };
}

export default Code;
