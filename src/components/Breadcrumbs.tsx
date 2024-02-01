import type { PropsWithChildren } from "react";
import styled from "styled-components";
import { FaChevronRight as ChevronRight } from "react-icons/fa";
import Link from "components/Link";
import { TRANSITION_DURATION } from "ts/theme";

const Breadcrumbs = ({ children }: PropsWithChildren) => {
  if (!children || children instanceof Array === false) {
    return null;
  }

  const childrenWithCarets = children.map((child, index) => [
    child,
    index < children.length - 1 && <Caret size={16} key={index} />,
  ]);

  return <Wrapper>{childrenWithCarets}</Wrapper>;
};

const Crumb = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  return <CrumbLink href={href}>{children}</CrumbLink>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Caret = styled(ChevronRight)`
  color: var(--color-gray-500);
  pointer-events: none;
  margin: 0 8px;
  transition: color ${TRANSITION_DURATION}ms;
`;

const CrumbLink = styled(Link)`
  font-size: 1rem;
  color: var(--color-gray-700);
  text-decoration: none;

  &:hover {
    color: var(--color-gray-1000);
  }
`;

Breadcrumbs.Crumb = Crumb;

export { Breadcrumbs, Crumb };

export default Breadcrumbs;
