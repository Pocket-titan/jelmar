import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import NextLink from "next/link";
import styled from "styled-components";

type LinkType = "internal" | "external" | "hash";

const Link = ({
  href = "",
  target,
  rel,
  children,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => {
  let linkType: LinkType;

  if (href.match(/^#/)) {
    linkType = "hash";
  } else if (href.match(/(^http|^mailto)/i) || target === "_blank") {
    linkType = "external";
  } else {
    linkType = "internal";
  }

  if (typeof target === "undefined") {
    target = linkType === "external" ? "_blank" : undefined;
  }

  const safeRel = target === "_blank" ? "noopener noreferrer" : rel;

  return (
    <StyledLink
      as={linkType === "internal" ? NextLink : "a"}
      href={href}
      rel={safeRel}
      target={target}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

const StyledLink = styled.a`
  color: var(--color-primary);

  &:focus {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

export default Link;
