import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import ArticleLayout from "layouts/ArticleLayout";
import { readFile, readFiles } from "ts/files";
import MDXContent from "components/MDXContent";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";
import Head from "next/head";

type Params = {
  slug: string;
};

const Post = ({ mdx, headings }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <meta
          key="theme_color_light"
          name="theme-color"
          content={LIGHT_COLORS.background}
          media="(prefers-color-scheme: light)"
        />
        <meta
          key="theme_color_dark"
          name="theme-color"
          content={DARK_COLORS.background}
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <ArticleLayout headings={headings} frontmatter={mdx.frontmatter}>
        <MDXContent {...mdx} />
      </ArticleLayout>
    </>
  );
};

export const getStaticProps = (async (context) => {
  const { slug } = context.params!;
  const { mdx, headings } = await readFile(slug);

  return { props: { mdx, headings } };
}) satisfies GetStaticProps<any, Params>;

export const getStaticPaths = (async (context) => {
  const files = await readFiles();

  const paths = files.map(({ mdx }) => ({
    params: { slug: mdx.frontmatter.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default Post;
