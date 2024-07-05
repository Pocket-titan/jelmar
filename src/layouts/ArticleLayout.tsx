import styled from "styled-components";
import { IBM_Plex_Mono } from "next/font/google";
import { Frontmatter } from "components/MDXContent";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import TableOfContents from "components/TableOfContents";
import Breadcrumbs from "components/Breadcrumbs";
import Header from "components/Header";
import Footer from "components/Footer";
import { capitalize, formatDate } from "ts/utils";
import { HEADER_HEIGHT, TRANSITION_DURATION } from "ts/theme";
import { PropsWithChildren } from "react";
import SmoothScrolling from "@components/SmoothScrolling";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  style: ["normal"],
  subsets: ["latin-ext"],
  display: "swap",
});

const ContentWrapper = styled.div<{ $toc: boolean }>`
  grid-column: 2 / 4;
  padding-top: 0;
  display: flex;
  /* flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-start; */
  z-index: 2;
  padding-left: 32px;
  padding-right: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }

  ${(p) =>
    p.$toc &&
    `
    @media (min-width: ${MIN_WIDTH_TO_SHOW_TOC}px) {
      grid-column: 2 / 3;
    }
  `}
`;

const SIZE = 1100;
const TOC_WIDTH = 200;
const MIN_WIDTH_TO_SHOW_TOC = 1200;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr minmax(0px, 900px) 200px 1fr;
  z-index: 1;
  flex: 1;
`;

const Article = styled.article<{ $toc: boolean }>`
  flex: 1 1 ${(p) => (p.$toc ? `${SIZE}px` : "100%")};
  max-width: min(${(p) => (p.$toc ? `${SIZE}px` : "100%")}, 100%);
  position: relative;
`;

const DIST = 75;

const Sidebar = styled.aside`
  display: none;
  top: 0px;
  grid-column: 3 / 5;

  /* margin-right: 32px; */
  /* padding-left: 16px; */
  padding-left: 12px;
  position: sticky;

  top: ${DIST}px;
  max-height: calc(100vh - ${4 * DIST}px);
  padding-bottom: 16px;
  margin-top: 4px; /* Optical alignment */

  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${MIN_WIDTH_TO_SHOW_TOC}px) {
    display: flex;
    justify-content: flex-start;
  }

  @media (min-width: 1750px) {
    padding-left: 16px;
    margin-right: 64px;
  }

  @media (orientation: landscape) {
    &::-webkit-scrollbar {
      width: 4px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: var(--color-gray-300);
      transition: background-color ${TRANSITION_DURATION}ms;
    }
  }
`;

const Tags = styled.div``;

const Tag = styled.a``;

const ArticleLayout = ({
  children,
  frontmatter: { title, date, tags },
  headings = [],
}: PropsWithChildren<{
  frontmatter: Frontmatter;
  headings?: { id: string; text: string; level: number }[];
}>) => {
  const toc = headings && headings.length > 0;

  return (
    <Wrapper>
      <HeaderWrapper>
        <MaxWidthWrapper>
          <Header />
        </MaxWidthWrapper>
      </HeaderWrapper>

      <HeroWrapper>
        <LightHeaderBackground />
        <SneakyLightHeaderBackground />

        <Hero>
          <MaxWidthWrapper>
            <Breadcrumbs>
              <Breadcrumbs.Crumb href="/">home</Breadcrumbs.Crumb>
              <Breadcrumbs.Crumb href={`/blog`}>blog</Breadcrumbs.Crumb>
            </Breadcrumbs>
            <Title>{title && capitalize(title)}</Title>
            <Subtitle>{date && formatDate(new Date(date))}</Subtitle>
            {tags.length > 0 && (
              <Tags>
                {tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Tags>
            )}
          </MaxWidthWrapper>
        </Hero>
      </HeroWrapper>

      <DarkHeaderBackground />

      <Main>
        <ContentWrapper $toc={toc} className={ibmPlexMono.variable}>
          {toc && headings[0].id !== "introduction" && (
            <a
              id="introduction"
              style={{
                scrollMarginTop: 48,
              }}
            />
          )}
          <Article $toc={toc}>{children}</Article>
        </ContentWrapper>
        {toc && (
          <Sidebar>
            {toc}
            <TableOfContents headings={headings} />
          </Sidebar>
        )}
      </Main>

      <Footer
        style={{
          marginTop: HEADER_HEIGHT,
        }}
      />

      <SmoothScrolling />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* min-width: calc(100vw - var(--scrollbar-width)); */
  transition: background ${TRANSITION_DURATION}ms ease 0s;
  /* padding-left: calc(100vw - 100%); */
`;

const HeaderWrapper = styled.div`
  position: sticky;
  z-index: 5;
  top: 0;

  width: 100vw;
`;

const HeroWrapper = styled.div`
  position: relative;
  z-index: 4;
`;

const Hero = styled.div`
  /* padding-top: 12px; */
  padding-bottom: 12px;
  background: var(--color-muted);
  transition: background ${TRANSITION_DURATION}ms ease 0s;
`;

const LightHeaderBackground = styled.div`
  position: sticky;
  z-index: 4;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background: var(--color-muted);
  transition: background ${TRANSITION_DURATION}ms ease 0s;
`;

const SneakyLightHeaderBackground = styled.div`
  position: absolute;
  z-index: 3;
  top: calc(-1 * ${HEADER_HEIGHT});
  width: 100%;
  height: ${HEADER_HEIGHT};
  background: var(--color-muted);
  transition: background ${TRANSITION_DURATION}ms ease 0s;
`;

const DarkHeaderBackground = styled.div`
  position: sticky;
  z-index: 3;
  top: 0;
  width: 100%;
  height: calc(${HEADER_HEIGHT} + 2px);
  background: var(--color-background);
  transition: background ${TRANSITION_DURATION}ms ease 0s;
  transform: translateY(-2px);
  /* will-change: transform; */
`;

const Heading = styled.h1<{ alone?: boolean }>`
  font-size: calc(32 / 16 * 1rem);
  color: var(--color-gray-1000);
`;

const Title = styled(Heading)`
  /* margin-bottom: 16px; */
  font-weight: var(--font-weight-medium);
  transition: color ${TRANSITION_DURATION}ms ease 0s;

  /* margin-top: ${(p) => (p.alone ? 8 : 24)}px; */
`;

const Subtitle = styled.span`
  display: block;
  font-size: 13px;
  margin-top: 0.25rem;
  margin-bottom: 0px;
  font-weight: var(--font-weight-book);
  color: var(--color-gray-700);
  transition: color 350ms ease 0s;
`;

export default ArticleLayout;
