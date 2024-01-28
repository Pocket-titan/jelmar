import styled from "styled-components";
import Socials from "src/components/Socials";
import { CSSProperties } from "react";

const Outer = styled.footer`
  transition: background 350ms ease 0s;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  padding-bottom: 32px;

  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    justify-content: center;
  }
`;

const Left = styled.div``;

const Right = styled.div`
  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    display: none;
  }
`;

const Copyright = styled.span`
  font-size: 12px;
  font-weight: var(--font-weight-light);
  color: ${(p) => p.color};
`;

const Footer = ({
  background = "var(--color-muted)",
  color = "var(--color-gray-700)",
  style = {},
}: {
  background?: string;
  color?: string;
  style?: CSSProperties;
}) => {
  return (
    <Outer style={{ background, ...style }}>
      <Inner>
        <Left>
          <Copyright color={color}>
            &copy; {new Date().getFullYear()} Jelmar Gerritsen. All rights reserved.
          </Copyright>
        </Left>
        <Right>
          <Socials color={color} />
        </Right>
      </Inner>
    </Outer>
  );
};

export default Footer;
