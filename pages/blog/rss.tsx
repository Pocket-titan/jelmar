import type { GetServerSideProps } from "next";
import { readFiles } from "ts/files";
import type { Frontmatter } from "@components/MDXContent";
import { generateFeed } from "ts/utils";

export const getServerSideProps = (async ({ res }) => {
  const files = (await readFiles()).map(({ mdx }) => mdx.frontmatter);

  files.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  const rss = await generateFeed(files, "rss");

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return { props: { posts: files } };
}) satisfies GetServerSideProps<{ posts: Frontmatter[] }>;

const Rss = () => {};

export default Rss;
