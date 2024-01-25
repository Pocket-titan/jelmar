import { type ComponentType, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTrail, animated } from "@react-spring/web";
import DarkModeToggle from "components/DarkModeToggle";
import Hamburger from "components/Hamburger";
import Button from "components/Button";
import Link from "./Link";
import { useRouter } from "next/router";

const Trigger = styled(Button)`
  position: fixed;
  z-index: 10001;
  right: 32px;
  width: 40px;
  height: 40px;
  top: 12px;

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
  backdrop-filter: blur(8px);
  transition: opacity 500ms;
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

const MobileNav = ({ links }: { links: { path: string; Component: ComponentType }[] }) => {
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
        onClick={(event: any) => {
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
              const { Component, path } = links[index];

              return (
                <animated.div style={style} key={index}>
                  <NavLink
                    href={path}
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
              transition: `opacity 250ms ${isOpen ? 500 : 0}ms`,
            }}
          >
            <DarkModeToggle tabIndex={isOpen ? 0 : -1} />
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
