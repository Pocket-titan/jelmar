import styled from "styled-components";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { readFiles } from "ts/files";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import DefaultLayout from "src/layouts/DefaultLayout";
import Link from "components/Link";
import { capitalize, formatDate } from "ts/utils";
import { FaChevronRight } from "react-icons/fa";
import ContentGrid from "components/ContentGrid";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";
import Head from "next/head";
import { useCssVariable } from "@ts/hooks";

const Arrow = styled(FaChevronRight)`
  transition: opacity 250ms ease 0s;
  margin-left: 3px;
  margin-top: 2px;
  color: var(--color-primary);
  opacity: 0;

  article:hover & {
    opacity: 1;
  }
`;

const Main = styled.main`
  padding-top: 32px;
`;

const Article = styled.article`
  height: 100%;

  &:hover h3 {
    color: var(--color-primary);
  }
`;

const Title = styled.h3`
  transition: color 250ms ease 0s;
`;

const Description = styled.p`
  margin-bottom: 8px;
  flex: 1;
`;

const SmallDate = styled.p`
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--color-gray-700);
`;

function Blog({ files }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <meta
          key="theme_color_light"
          name="theme-color"
          content={LIGHT_COLORS.background}
          // media="(prefers-color-scheme: light)"
        />
        <meta
          key="theme_color_dark"
          name="theme-color"
          content={DARK_COLORS.background}
          // media="(prefers-color-scheme: dark)"
        />
      </Head>
      <DefaultLayout background={"var(--color-subtle-background)"}>
        <MaxWidthWrapper>
          <Main>
            <ContentGrid title="Posts" type="grid">
              {files.map((file) => (
                <Article key={file.slug}>
                  <Link
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                    href={`/blog/${file.slug}`}
                  >
                    <Title>{capitalize(file.title)}</Title>
                    <SmallDate>{formatDate(file.date)}</SmallDate>
                    <Description>{file.excerpt}</Description>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Read more <Arrow />
                    </div>
                  </Link>
                </Article>
              ))}
            </ContentGrid>
          </Main>
        </MaxWidthWrapper>
      </DefaultLayout>
    </>
  );
}

export const getStaticProps = (async (context) => {
  const files = (await readFiles()).map((file) => file.frontmatter);

  files.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  return { props: { files } };
}) satisfies GetStaticProps;

export default Blog;
