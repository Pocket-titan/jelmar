import styled from "styled-components";
import type { PropsWithChildren } from "react";
import type { MathMLElements } from "@michijs/htmltype";
import { stringifyChildren } from "ts/utils";
//@ts-expect-error
import temml from "temml/dist/temml.cjs";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      math: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      > &
        MathMLElements["math"];
    }
  }
}

const Wrapper = styled.span<{ $inline?: boolean }>`
  display: ${({ $inline }) => ($inline ? "inline" : "block")};
  margin-top: ${({ $inline }) => ($inline ? "0" : "1em")};
  margin-bottom: ${({ $inline }) => ($inline ? "0" : "1em")};
`;

const Math = ({
  inline = false,
  children,
}: PropsWithChildren<{ inline?: boolean }>) => {
  return (
    <Wrapper
      $inline={inline}
      className="math-wrapper"
      dangerouslySetInnerHTML={{
        __html: temml.renderToString(stringifyChildren(children), {
          displayMode: !inline,
        }),
      }}
    />
  );
};

export default Math;
