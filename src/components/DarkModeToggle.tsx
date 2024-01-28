"use client";

import type { HTMLAttributes } from "react";
import styled from "styled-components";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { useConfig } from "src/components/ConfigProvider";
import { BREAKPOINTS } from "src/ts/theme";
import { roundTo } from "src/ts/utils";
import Button from "src/components/Button";

// const Button = styled.button`
//   display: block;
//   margin: 0;
//   padding: 4px;
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   text-align: left;
//   font: inherit;

//   opacity: 0.8;
//   border-radius: 5px;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:focus {
//     outline: 2px auto var(--primary)
//     outline-offset: 2px;
//   }

//   &:focus:not(.focus-visible) {
//     outline: none;
//   }
// `;

const Wrapper = styled(Button)`
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${BREAKPOINTS.mdAndLarger} {
    &:hover {
      opacity: 1;
    }
  }
`;

const MoonOrSun = styled(animated.svg)`
  position: relative;
  overflow: visible;
`;

// Credit to: https://jfelix.info/blog/using-react-spring-to-animate-svg-icons-dark-mode-toggle
// and https://www.joshwcomeau.com/ for the implementation 🙏
const DarkModeToggle = ({
  size = 18,
  id = "dark-mode-toggle",
  prefersReducedMotion = false,
  ...props
}: {
  size?: number;
  id?: string;
  prefersReducedMotion?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const { colorMode, setColorMode } = useConfig();

  const isDark = colorMode === "dark";

  const svgSpring = useSpring({
    transform: isDark ? "rotate(40deg)" : "rotate(90deg)",
    immediate: prefersReducedMotion,
  });

  const maskSpring = useSpring({
    cx: isDark ? 10 : 25,
    cy: isDark ? 2 : 0,
    config: {
      mass: 3.1,
      friction: 21,
    },
    immediate: prefersReducedMotion,
  });

  const sunMoonSpring = useSpring({
    r: isDark ? 8 : 5,
    immediate: prefersReducedMotion,
  });

  const sunDotAngles = [0, 60, 120, 180, 240, 300];

  const sunDotTrail = useTrail(sunDotAngles.length, {
    transform: isDark ? 0 : 1,
    transformOrigin: "center center",
    immediate: isDark || prefersReducedMotion,
    config: {
      tension: 210,
      friction: 20,
    },
  });

  return (
    <Wrapper
      title={`Activate ${isDark ? "light" : "dark"} mode`}
      onClick={(event) => {
        event.preventDefault();
        setColorMode(isDark ? "light" : "dark");
      }}
    >
      <MoonOrSun width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={svgSpring}>
        {/* Moon mask (takes "bite" out of Sun) */}
        <mask id={`moon-mask-${id}`}>
          <rect x="0" y="0" width={size} height={size} fill="#FFF" />
          <animated.circle {...maskSpring} r="8" fill="black" />
        </mask>

        {/* Sun body */}
        <animated.circle
          cx="9"
          cy="9"
          fill="var(--color-text)"
          mask={`url(#moon-mask-${id})`}
          {...sunMoonSpring}
        />

        {/* Sun flares */}
        <g>
          {sunDotTrail.map(({ transform, ...props }, index) => {
            const angle = sunDotAngles[index];
            const centerX = 9;
            const centerY = 9;

            const angleInRads = (angle / 180) * Math.PI;

            const c = 8; // hypothenuse

            // I was getting a rehydration error because apparently
            // there was a different # of decimal places between
            // Node and browser. Round to 6 decimal places to avoid
            // this rehydration warning.
            const a = roundTo(centerX + c * Math.cos(angleInRads), 6);
            const b = roundTo(centerY + c * Math.sin(angleInRads), 6);

            return (
              <animated.circle
                key={angle}
                cx={a}
                cy={b}
                r={1.5}
                fill="var(--color-text)"
                style={{
                  ...props,
                  transform: transform.to((t) => `scale(${t})`),
                }}
              />
            );
          })}
        </g>
      </MoonOrSun>
    </Wrapper>
  );
};

export default DarkModeToggle;
