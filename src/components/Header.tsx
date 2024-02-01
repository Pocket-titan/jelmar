import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import NextLink from "next/link";
import DarkModeToggle from "components/DarkModeToggle";
import MobileNav from "components/MobileNav";
import Nav from "components/Nav";
import { HEADER_HEIGHT } from "@ts/theme";

const ExternalLinkIcon = styled(FaArrowUpRightFromSquare)`
  color: var(--color-subtle-primary);
  transition: color 250ms ease 0s;
`;

const links = [
  {
    Component: () => <>blog</>,
    path: "/blog",
  },
  {
    Component: () => <>projects</>,
    path: "/projects",
  },
  {
    Component: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: 6 }}>CV </span>
        <ExternalLinkIcon />
      </div>
    ),
    path: "/about",
  },
];

const Wrapper = styled.header`
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  padding: 0px;

  /* margin-right: calc(-1 * (var(--scrollbar-width) - (100vw - 100%))); */
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const Center = styled.div<{ $platform: "mobile" | "desktop" }>`
  flex: 1;
  display: flex;
  justify-content: center;

  ${({ $platform, theme }) =>
    ($platform === "mobile" || $platform === "desktop") &&
    `
    @media ${$platform === "mobile" ? theme.breakpoints.desktop : theme.breakpoints.mobile} {
      display: none;
    }
  `}
`;

const Right = styled.div<{ $platform: "mobile" | "desktop" }>`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  ${({ $platform, theme }) =>
    ($platform === "mobile" || $platform === "desktop") &&
    `
    @media ${$platform === "mobile" ? theme.breakpoints.desktop : theme.breakpoints.mobile} {
      display: none;
    }
  `}
`;

const Header = () => {
  return (
    <Wrapper>
      <Left>
        <NextLink
          href="/"
          style={{
            display: "flex",
            fontSize: "24px",
            letterSpacing: "-1px",
            padding: "0px",
            textDecoration: "none",
            color: "var(--color-primary)",
            // marginRight: 32,
          }}
        >
          <span>Jelmar</span>
        </NextLink>
      </Left>

      <Center $platform="desktop">
        <Nav links={links} />
      </Center>

      <Right $platform="desktop">
        <DarkModeToggle />
      </Right>

      <Right $platform="mobile">
        <Portal id="mobile-nav">
          <MobileNav links={links} />
        </Portal>
      </Right>
    </Wrapper>
  );
};

const Portal = ({ id, children }: PropsWithChildren<{ id?: string }>) => {
  const [hostElement, setHostElement] = useState<Element>();

  useEffect(() => {
    const elm = id ? document.querySelector(`#${id}`) : document.createElement("div");

    if (!elm) {
      return;
    }

    setHostElement(elm);

    if (!id) {
      document.body.appendChild(elm);
    }

    return () => {
      if (!id) {
        document.body.removeChild(elm);
      }
    };
  }, [id]);

  if (!hostElement) {
    return null;
  }

  return createPortal(children, hostElement);
};

export default Header;
