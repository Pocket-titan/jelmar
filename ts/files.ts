import { serialize } from "next-mdx-remote/serialize";
import frontMatter from "front-matter";
import remarkMath from "remark-math";
import fs from "fs/promises";
import path from "path";
import type { Frontmatter, MDX } from "@components/MDXContent";

const MARKDOWN_FOLDER = "content/markdown";
const NOTEBOOK_FOLDER = "content/notebooks";

function makeExcerpt(source: string, characters: number = 150) {
  const noTitles = source.replace(/^#\s+.*/gm, "");
  const noImports = noTitles.replace(/import.*from.*/g, "");
  return (
    noImports
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .join(" ")
      .slice(0, characters) + "..."
  );
}

function maybeFixFrontmatter(source: string, frontmatter: { [key: string]: any }): Frontmatter {
  if (frontmatter.date && frontmatter.date instanceof Date) {
    frontmatter.date = frontmatter.date.toISOString();
  }

  if (!frontmatter.title) {
    frontmatter.title = source.match(/^#\s+(.*)$/m)?.[1] ?? frontmatter.slug.replace(/-/g, " ");
  }

  if (!frontmatter.excerpt) {
    frontmatter.excerpt = makeExcerpt(source);
  }

  if (!frontmatter.tags) {
    frontmatter.tags = [];
  }

  return frontmatter as Frontmatter;
}

async function readMarkdownFiles() {
  const markdownFiles = await fs.readdir(path.resolve(process.cwd(), MARKDOWN_FOLDER));
  return await Promise.all(markdownFiles.map(async (file) => await readMarkdownFile(file)));
}

async function readNotebookFiles() {
  // const notebookFiles = await fs.readdir(path.resolve(process.cwd(), NOTEBOOK_FOLDER));
  const notebookFiles: string[] = [];
  return await Promise.all(notebookFiles.map(async (file) => await readNotebookFile(file)));
}

async function readMarkdownFile(file: string) {
  const filepath = path.resolve(process.cwd(), `${MARKDOWN_FOLDER}/${file}`);
  const source = await fs.readFile(filepath, "utf-8");

  const mdx = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkMath],
    },
  });

  const extension = path.extname(file);
  const slug = file.replace(extension, "");
  const frontmatter = frontMatter(source);
  mdx.frontmatter = maybeFixFrontmatter(
    source
      .split("\n")
      .slice(Math.max(0, frontmatter.bodyBegin - 1))
      .join("\n"),
    { ...(frontmatter.attributes as object), slug }
  );

  return mdx as MDX;
}

async function readNotebookFile(file: string) {
  // const filepath = path.resolve(process.cwd(), `${NOTEBOOK_FOLDER}/${file}`);
  // const source = await fs.readFile(filepath, "utf-8");

  throw new Error("Unimplemented");
  return {} as MDX;
}

export async function readFiles() {
  const markdownFiles = await readMarkdownFiles();
  const notebookFiles = await readNotebookFiles();

  return [...markdownFiles, ...notebookFiles];
}

export async function readFile(slug: string) {
  const hasExtension = path.extname(slug).length > 0;

  if (hasExtension) {
    const extension = path.extname(slug);
    const filename = slug.replace(extension, "");

    if (extension === ".mdx" || extension === ".md") {
      return await readMarkdownFile(`${filename}${extension}`);
    }

    if (extension === ".ipynb") {
      return await readNotebookFile(`${filename}${extension}`);
    }

    throw new Error(`Unknown file extension ${extension} for slug ${slug}`);
  }

  try {
    return await readMarkdownFile(`${slug}.mdx`);
  } catch {}

  try {
    return await readNotebookFile(`${slug}.ipynb`);
  } catch {}

  try {
    return await readMarkdownFile(`${slug}.md`);
  } catch {}

  throw new Error(`No file found with slug ${slug}`);
}
