import React, { PropsWithChildren } from "react";
import ContentLink from "./ContentLink";
import { stringifyChildren } from "@ts/utils";

const FootnoteLabel = ({
  nosup = false,
  children,
}: PropsWithChildren<{ nosup?: boolean }>) => {
  const id = stringifyChildren(children);

  if (nosup) {
    return (
      <ContentLink
        href={`#user-content-fn-${id}`}
        id={`user-content-fnref-${id}`}
        data-footnote-ref
        aria-describedby="footnote-label"
      >
        {children}
      </ContentLink>
    );
  }

  return (
    <sup>
      <ContentLink
        href={`#user-content-fn-${id}`}
        id={`user-content-fnref-${id}`}
        data-footnote-ref
        aria-describedby="footnote-label"
      >
        {children}
      </ContentLink>
    </sup>
  );
};

export default FootnoteLabel;
