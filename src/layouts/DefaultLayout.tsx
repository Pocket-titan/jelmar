import type { CSSProperties, PropsWithChildren } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { omit } from "lodash";

const Background = createGlobalStyle<{ background: string }>`
  body {
    background: ${(p) => p.background};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  transition: background 350ms ease 0s;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: -1px;
  z-index: 3;
  background: var(--background);
  transition: background 350ms ease 0s;
`;

const ChildWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  transition: background 350ms ease 0s;
  max-width: 100vw;
  overflow: hidden;
`;

const MaxWidthWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DefaultLayout = ({
  children,
  background = "var(--color-background)",
  childStyles = {},
  footerStyles = {},
}: PropsWithChildren<{
  background?: string;
  childStyles?: CSSProperties;
  footerStyles?: CSSProperties;
}>) => {
  const wrapperStyle = { "--background": background } as CSSProperties;

  return (
    <Wrapper style={wrapperStyle}>
      <HeaderWrapper>
        <MaxWidthWrapper>
          <Header />
        </MaxWidthWrapper>
      </HeaderWrapper>

      <ChildWrapper style={childStyles}>{children}</ChildWrapper>

      <Footer
        background={background}
        color={footerStyles.color}
        style={omit(footerStyles, "color")}
      />

      <Background background={background} />
    </Wrapper>
  );
};

export default DefaultLayout;
