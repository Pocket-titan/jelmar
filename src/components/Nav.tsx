import type { ComponentType, PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "components/Link";

const NavLinkWrapper = styled(Link)`
  transition: color 250ms ease 0s;
  position: relative;
  padding: 10px 18px 10px 18px;
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  font-size: 1rem;

  &:hover {
    color: var(--color-primary);
  }

  &:hover svg {
    color: var(--color-primary);
  }
`;

const NavLink = ({
  path,
  target,
  children,
}: PropsWithChildren<{ path: string; target?: string }>) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
    }}
  >
    <NavLinkWrapper href={path} target={target}>
      {children}
    </NavLinkWrapper>
  </div>
);

const Nav = ({
  links,
}: {
  links: { Component: ComponentType; path: string; target?: string }[];
}) => {
  return (
    <nav style={{ display: "flex" }}>
      <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {links.map(({ Component, path, target }) => (
          <NavLink key={path} path={path} target={target}>
            <Component />
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
