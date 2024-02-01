import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { omit } from "lodash";

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
      {linkType === "external" && <ExternalLinkIcon size={15} />}
    </StyledLink>
  );
};

const ExternalLinkIcon = styled(FaArrowUpRightFromSquare)`
  color: var(--color-subtle-primary);
  transition: color 250ms ease 0s;
  display: inline-block;
  margin-left: 0.2rem;

  &:hover {
    color: var(--color-primary);
  }
`;

const StyledLink = styled.a`
  text-align: baseline;
  color: var(--color-subtle-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-subtle-primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;

  transition: color 250ms ease 0s, text-decoration-color 250ms ease 0s;

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
