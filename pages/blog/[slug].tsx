import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import ArticleLayout from "layouts/ArticleLayout";
import { readFile, readFiles } from "ts/files";
import MDXContent from "components/MDXContent";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";
import SEO from "@components/SEO";

type Params = {
  slug: string;
};

const Post = ({
  mdx,
  headings,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        title={mdx.frontmatter?.title}
        description={mdx.frontmatter?.excerpt}
        // type="article"
        darkColor={DARK_COLORS.background}
        lightColor={LIGHT_COLORS.background}
        ogImage={mdx.frontmatter?.image}
      />
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
