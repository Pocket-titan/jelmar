import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { omit } from "lodash";
import ExternalLinkIcon from "@components/ExternalLinkIcon";
import { HEADER_HEIGHT } from "@ts/theme";

type LinkType = "internal" | "external" | "hash";

const ContentLink = ({
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

  const style = {
    ...(linkType === "external" ? { display: "inline-flex", alignItems: "center" } : {}),
    ...(linkType === "hash" ? { scrollMarginTop: HEADER_HEIGHT } : {}),
    ...(props.style || {}),
  };

  return (
    <StyledLink
      as={linkType === "internal" ? NextLink : "a"}
      href={href}
      rel={safeRel}
      target={target}
      style={style}
      {...omit(props, ["style"])}
    >
      {children}
      {linkType === "external" && <StyledExternalLinkIcon size={15} />}
    </StyledLink>
  );
};

const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  color: var(--color-subtle-primary);
  transition: color 350ms ease 0s;

  display: inline-block;
  margin-left: 0.2rem;

  &:hover {
    color: var(--color-primary);
  }
`;

const StyledLink = styled.a`
  vertical-align: baseline;
  color: var(--color-subtle-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-subtle-primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;

  transition: color 350ms ease 0s, text-decoration-color 350ms ease 0s;

  &:focus {
    outline: 2px auto var(--color-primary);
    outline-offset: 2px;
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }

  &:hover {
    color: var(--color-primary);
    text-decoration-color: var(--color-primary);

    ${ExternalLinkIcon} {
      color: var(--color-primary);
    }
  }
`;

export default ContentLink;
