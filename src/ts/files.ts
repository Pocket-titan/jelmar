import { serialize } from "next-mdx-remote/serialize";
import frontMatter from "front-matter";
import remarkMath from "remark-math";
import fs from "fs/promises";
import path from "path";
import type { Frontmatter } from "src/components/MDXContent";

const MARKDOWN_FOLDER = "content/markdown";

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

function remarkGetCodeFile() {
  const mapChild = async (child: any) => {
    if (child.type && child.type === "code" && child.type === "code" && child.value) {
      // TODO
    }

    if (
      child.type &&
      child.type === "mdxJsxFlowElement" &&
      child.name &&
      child.name === "Code" &&
      child.attributes
    ) {
      child.attributes = await Promise.all(
        child.attributes.map(async (attr: any) => {
          if (
            attr.type !== undefined &&
            attr.type === "mdxJsxAttribute" &&
            attr.name !== undefined &&
            ["value", "oldValue"].includes(attr.name) &&
            attr.value !== undefined &&
            attr.value.startsWith("file:")
          ) {
            const filePath = attr.value.slice(5).trim();

            try {
              const content = await fs.readFile(path.resolve(process.cwd(), filePath), "utf-8");
              attr.value = content.trim();
            } catch (err) {
              console.error(`Failed to load file at ${filePath} for Code element:`, err);
            }
          }

          return attr;
        })
      );
    }

    if (child.type === "mdxJsxFlowElement" && child.name === "Cell") {
      // TODO
    }

    if (child.children) {
      child.children = await Promise.all(child.children.map(mapChild));
    }

    return child;
  };

  return async (tree: any, file: any) => {
    tree.children = await Promise.all(tree.children.map(mapChild));
  };
}

async function doSerialize(source: string) {
  return await serialize<Record<string, unknown>, Frontmatter>(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkMath, remarkGetCodeFile],
    },
  });
}

async function readMarkdownFiles() {
  const markdownFiles = await fs.readdir(path.resolve(process.cwd(), MARKDOWN_FOLDER));
  return await Promise.all(markdownFiles.map(async (file) => await readMarkdownFile(file)));
}

async function readMarkdownFile(file: string) {
  const filepath = path.resolve(process.cwd(), `${MARKDOWN_FOLDER}/${file}`);
  const source = await fs.readFile(filepath, "utf-8");

  const mdx = await doSerialize(source);

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

  return mdx;
}

export async function readFiles() {
  return await readMarkdownFiles();
}

export async function readFile(slug: string) {
  const hasExtension = path.extname(slug).length > 0;

  if (hasExtension) {
    const extension = path.extname(slug);
    const filename = slug.replace(extension, "");

    if (extension === ".mdx" || extension === ".md") {
      return await readMarkdownFile(`${filename}${extension}`);
    }

    throw new Error(`Unknown file extension ${extension} for slug ${slug}`);
  }

  try {
    return await readMarkdownFile(`${slug}.mdx`);
  } catch {}

  try {
    return await readMarkdownFile(`${slug}.md`);
  } catch {}

  throw new Error(`No file found with slug ${slug}`);
}
