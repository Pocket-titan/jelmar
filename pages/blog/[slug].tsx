import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import ArticleLayout from "@app/layouts/ArticleLayout";
import { readFile, readFiles } from "@ts/files";

type Params = {
  slug: string;
};

const Post = ({ mdx }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ArticleLayout mdx={mdx} />;
};

export const getStaticProps = (async (context) => {
  const { slug } = context.params!;
  const mdx = await readFile(slug);

  return { props: { mdx } };
}) satisfies GetStaticProps<any, Params>;

export const getStaticPaths = (async (context) => {
  const files = await readFiles();

  const paths = files.map((file) => ({
    params: { slug: file.frontmatter.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export default Post;
