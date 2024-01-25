import type { ComponentType, PropsWithChildren } from "react";
import styled from "@emotion/styled";
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

const NavLink = ({ path, children }: PropsWithChildren<{ path: string }>) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
    }}
  >
    <NavLinkWrapper href={path}>{children}</NavLinkWrapper>
  </div>
);

const Nav = ({ links }: { links: { Component: ComponentType; path: string }[] }) => {
  return (
    <nav style={{ display: "flex" }}>
      <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {links.map(({ Component, path }) => (
          <NavLink key={path} path={path}>
            <Component />
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
