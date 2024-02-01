import styled from "styled-components";
import { IBM_Plex_Mono } from "next/font/google";
import MDXContent, { Frontmatter, type MDX } from "components/MDXContent";
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

const ContentWrapper = styled(MaxWidthWrapper)`
  padding-top: 0px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-start; /* required for sticky sidebar */
  max-width: 1100px;
`;

const Article = styled.article<{ $toc: boolean }>`
  flex: 1 1 ${(p) => (p.$toc ? "800px" : "100%")};
  max-width: min(${(p) => (p.$toc ? "800px" : "100%")}, 100%);
`;

const Sidebar = styled.aside`
  flex: 0 100000 250px;
  display: none;
  position: sticky;
  top: 148px;
  max-height: calc(100vh - 148px);
  overflow: auto;
  padding-bottom: 16px;
  margin-left: auto;
  /* Optical alignment */
  margin-top: 4px;

  @media (min-width: 1084px) {
    display: flex;
    justify-content: flex-end;
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
  toc = false,
}: PropsWithChildren<{ frontmatter: Frontmatter; toc?: boolean }>) => {
  const headings = [
    {
      id: "wow",
      text: "wow",
      level: 1,
    },
  ];

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
              {/* <Breadcrumbs.Crumb href={`/blog/`}>{"formattedCategory"}</Breadcrumbs.Crumb> */}
            </Breadcrumbs>
            <Title>{title && capitalize(title)}</Title>
            <Subtitle>{date && formatDate(new Date(date))}</Subtitle>
            {tags.length > 0 && (
              <Tags>
                {tags.map((tag) => (
                  <Tag>{tag}</Tag>
                ))}
              </Tags>
            )}
          </MaxWidthWrapper>
        </Hero>
      </HeroWrapper>

      <DarkHeaderBackground />

      <Main>
        {/* Content */}
        <ContentWrapper className={ibmPlexMono.variable}>
          {toc && (
            <Sidebar>
              <TableOfContents headings={headings} />
            </Sidebar>
          )}
          <Article $toc={toc}>{children}</Article>
        </ContentWrapper>
        {/* End content */}
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

const Main = styled.main`
  position: relative;
  z-index: 1;
  flex: 1;

  @media ${(p) => p.theme.breakpoints.lgAndSmaller} {
    max-width: 100vw;
    overflow: hidden;
  }
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
  will-change: transform;
`;

const Heading = styled.h1<{ alone?: boolean }>`
  font-size: calc(38 / 16 * 1rem);
  color: var(--color-gray-1000);
`;

const Title = styled(Heading)`
  /* margin-bottom: 16px; */
  font-weight: var(--font-weight-medium);
  transition: color ${TRANSITION_DURATION}ms;

  /* margin-top: ${(p) => (p.alone ? 8 : 24)}px; */
`;

const Subtitle = styled.span`
  display: block;
  font-size: 13px;
  margin-top: 0.25rem;
  margin-bottom: 0px;
  font-weight: var(--font-weight-book);
  color: var(--color-gray-700);
`;

export default ArticleLayout;
