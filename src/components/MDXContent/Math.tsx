import type { PropsWithChildren } from "react";
import type { MathMLElements } from "@michijs/htmltype";
import { stringifyChildren } from "ts/utils";
import temml from "temml";
import "temml/dist/Temml-Local.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      math: React.DetailedHTMLProps<React.HTMLAttributes<MathMLElement>, MathMLElement> &
        MathMLElements["math"];
    }
  }
}

const Math = ({ inline = false, children }: PropsWithChildren<{ inline?: boolean }>) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: temml.renderToString(stringifyChildren(children), { displayMode: !inline }),
      }}
    />
  );
};

export default Math;
