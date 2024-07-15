import styled from "styled-components";
import { GrReturn } from "react-icons/gr";
import Code from "../Code";
import { BREAKPOINTS } from "@ts/theme";
import { isBase64 } from "@ts/utils";
import {
  ComponentProps,
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
} from "react";

const CellWrapper = styled.div<{ $margin: string }>`
  .code-wrapper {
    margin: ${(props) => props.$margin};
  }

  &:first-child .code-wrapper {
    margin-top: 0 !important;
  }

  &:not(:last-child) {
    margin-bottom: 1.25em;
  }
`;

const MARGIN_BETWEEN_INPUT_AND_OUTPUT = "0.5em";

const Cell = ({ cell: { source, metadata, outputs } }: { cell: CodeCell }) => {
  return (
    <CellWrapper
      $margin={
        outputs.length === 0
          ? "0.75em 0"
          : `0.75em 0 ${MARGIN_BETWEEN_INPUT_AND_OUTPUT}`
      }
    >
      <Code language={(metadata || {}).language}>{source.join("")}</Code>
      {outputs.length > 0 && <Outputs outputs={outputs} />}
    </CellWrapper>
  );
};

const OutputsWrapper = styled.div`
  .code-wrapper {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  margin-top: ${MARGIN_BETWEEN_INPUT_AND_OUTPUT};
  margin-bottom: 0.75em;
`;

const OutputWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .editor-wrapper {
    --padding-y: 0.5em;
    padding: 0.5em 0.75em;
    background: var(--color-muted);
    min-height: unset !important;
  }

  margin-top: ${MARGIN_BETWEEN_INPUT_AND_OUTPUT};
`;

const Return = styled(GrReturn)`
  font-size: 1.25rem;
  color: var(--color-subtle-primary);
  transition: color 350ms ease 0s;
  transform: scaleX(-1);
  margin-right: 0.5em;
  flex-shrink: 0;

  @media ${BREAKPOINTS.smAndSmaller} {
    margin-right: 0.1em;
  }

  @media ${BREAKPOINTS.xsAndSmaller} {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  border-radius: 4px;
`;

const Image = ({
  width,
  height,
  ...props
}: {
  width: number;
  height: number;
} & ComponentProps<typeof StyledImage>) => {
  const aspectRatio = width / height;

  const style = {
    ...(aspectRatio > 1 ? { maxHeight: 325 } : {}),
    ...(aspectRatio < 1 ? { maxHeight: 475 } : {}),
  };

  return <StyledImage style={style} {...props} />;
};

const Text = styled(Code)`
  flex: 1;
  min-width: 0;
  font-size: 0.75rem;

  .editor-wrapper {
    font-size: 0.75rem;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }
`;

const Outputs = ({ outputs }: { outputs: Output[] }) => (
  <OutputsWrapper>
    {outputs.map((x, i) => {
      let Component: any;

      switch (x.output_type) {
        case "execute_result": {
          const { data } = x as ExecuteOutput;

          if (!data || !data["text/plain"]) {
            Component = null;
            break;
          }

          Component = (
            <Text language="text" wrapLines={false}>
              {data["text/plain"].join("")}
            </Text>
          );
          break;
        }
        case "display_data": {
          const { data, metadata } = x as DisplayOutput;

          if (!data || !data["image/png"]) {
            Component = null;
            console.warn("Unsupported display data", data);
            break;
          }

          Component = (
            <ImageWrapper>
              <Image
                src={
                  isBase64(data["image/png"])
                    ? `data:image/png;base64,${data["image/png"]}`
                    : (data["image/png"] as string)
                }
                width={metadata.width}
                height={metadata.height}
              />
            </ImageWrapper>
          );
          break;
        }
        case "stream": {
          const { name, text } = x as StreamOutput;

          Component = (
            <Text language="text" wrapLines={false}>
              {text.join("")}
            </Text>
          );
          break;
        }
        case "error": {
          const { ename, evalue, traceback } = x as ErrorOutput;
        }
        default: {
          Component = null;
        }
      }

      if (Component) {
        return (
          <OutputWrapper key={`${x.output_type}_${i}`}>
            <Return
              style={{
                visibility: i > 0 ? "hidden" : "visible",
              }}
            />
            {Component}
          </OutputWrapper>
        );
      }
    })}
  </OutputsWrapper>
);

type CodeCell = {
  cell_type: "code";
  execution_count: number | null;
  metadata: {
    language?: string;
    tags?: string[];
  };
  outputs: Output[];
  source: string[];
};

type ExecuteOutput = {
  output_type: "execute_result";
  data: Record<string, any>;
  metadata: Record<string, any>;
  execution_count: number;
};

type DisplayOutput = {
  output_type: "display_data";
  data: Record<string, any>;
  metadata: Record<string, any>;
};

type StreamOutput = {
  output_type: "stream";
  name: "stdout";
  text: string[];
};

type ErrorOutput = {
  output_type: "error";
  ename: string;
  evalue: string;
  traceback: string[];
};

type Output = ExecuteOutput | DisplayOutput | StreamOutput | ErrorOutput;

export default Cell;
