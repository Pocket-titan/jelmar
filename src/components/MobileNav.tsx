import { type ComponentType, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTrail, animated } from "@react-spring/web";
import { HEADER_HEIGHT } from "ts/theme";
import DarkModeToggle from "components/DarkModeToggle";
import Hamburger from "components/Hamburger";
import Button from "components/Button";
import Link from "components/Link";

const Trigger = styled(Button)`
  --size: 40px;

  position: fixed;
  z-index: 10001;
  right: 32px;
  width: var(--size);
  height: var(--size);
  top: calc((${HEADER_HEIGHT} - var(--size)) / 2);

  @media (min-width: 769px) {
    display: none;
  }
`;

const Modal = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: var(--color-blurred-background);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  transition: opacity 500ms, background 350ms ease 0s;
`;

function useScrollDisabler(disabled: boolean) {
  useEffect(() => {
    if (!disabled) {
      return;
    }

    const oldOverflow = document.body.style.overflow;
    const oldPosition = document.body.style.position;
    const oldWidth = document.body.style.width;
    const oldHeight = document.body.style.height;
    const oldTop = document.body.style.top;

    const oldScrollY = window.scrollY;
    const oldScrollBehavior = document.documentElement.style.scrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = `calc(100% + ${oldScrollY}px)`;
    document.body.style.top = `-${oldScrollY}px`;

    return () => {
      document.body.style.overflow = oldOverflow;
      document.body.style.position = oldPosition;
      document.body.style.width = oldWidth;
      document.body.style.height = oldHeight;
      document.body.style.top = oldTop;

      document.documentElement.style.scrollBehavior = "auto";

      window.scrollTo({
        top: oldScrollY,
        left: 0,
        // Frustratingly, "behavior: auto" doesn't seem to work,
        // and so I have to do all this other work, changing the
        // behavior on the <html> tag and resetting it after 100ms.
        behavior: "auto",
      });

      window.setTimeout(() => {
        document.documentElement.style.scrollBehavior = oldScrollBehavior;
      }, 100);
    };
  }, [disabled]);
}

const MobileNav = ({
  links,
}: {
  links: { Component: ComponentType; path: string; target?: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useScrollDisabler(isOpen);

  const trail = useTrail(links.length, {
    transform: isOpen ? "translateX(0%)" : "translateX(-100%)",
    config: {
      tension: 700,
      friction: isOpen ? 60 : 20,
      clamp: true,
    },
  });

  return (
    <>
      <Trigger
        style={
          isOpen
            ? {
                right: "calc(32px + var(--scrollbar-width))",
              }
            : {}
        }
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <Hamburger size={32} isOpen={isOpen} />
      </Trigger>

      <Modal style={{ pointerEvents: isOpen ? "auto" : "none" }}>
        <Background
          style={{
            opacity: isOpen ? 1 : 0,
            touchAction: isOpen ? "none" : "auto",
          }}
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
        />

        <Nav>
          <Top>
            {trail.map((style, index) => {
              const { Component, path, target } = links[index];

              return (
                <animated.div style={style} key={index}>
                  <NavLink
                    href={path}
                    target={target}
                    tabIndex={isOpen ? 0 : -1}
                    className="active"
                    onClick={() => {
                      if (path === router.pathname) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <Component />{" "}
                  </NavLink>
                </animated.div>
              );
            })}
          </Top>
          <Bottom
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity 300ms ease ${isOpen ? 500 : 0}ms`,
            }}
          >
            <DarkModeToggle size={32} tabIndex={isOpen ? 0 : -1} />
          </Bottom>
        </Nav>
      </Modal>
    </>
  );
};

const Nav = styled.nav`
  position: absolute;
  left: 0;
  bottom: 100px;
  width: 75%;
  height: 75%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background: var(--color-text);
  color: var(--color-background); */
`;

const NavLink = styled(Link)`
  display: block;
  position: relative;
  padding: 16px;
  padding-left: 32px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  font-size: 28px;

  transition: color 350ms ease 0s;

  &.active {
    color: var(--color-primary);
  }

  &:focus {
    outline: 0px auto var(--color-primary);
    outline-offset: 2px;
  }
`;

const NavLinkChild = styled(NavLink)`
  font-size: 22px;
  padding: 16px;
  margin-top: -16px;
  padding-left: 64px;
`;

const Top = styled.div``;
const Bottom = styled.div`
  display: flex;
  padding-left: 30px;
`;

export default MobileNav;
