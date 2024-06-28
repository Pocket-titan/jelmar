import type { Frontmatter } from "src/components/MDXContent";
import { serialize } from "next-mdx-remote/serialize";
import { slug } from "github-slugger";
import frontMatter from "front-matter";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import fs from "fs/promises";
import path from "path";

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

function maybeFixFrontmatter(
  source: string,
  frontmatter: { [key: string]: any }
): Frontmatter {
  if (frontmatter.date && frontmatter.date instanceof Date) {
    frontmatter.date = frontmatter.date.toISOString();
  }

  if (!frontmatter.title) {
    frontmatter.title =
      source.match(/^#\s+(.*)$/m)?.[1] ?? frontmatter.slug.replace(/-/g, " ");
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
    if (
      child.type &&
      child.type === "code" &&
      child.type === "code" &&
      child.value
    ) {
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
              const content = await fs.readFile(
                path.resolve(process.cwd(), filePath),
                "utf-8"
              );
              attr.value = content.trim();
            } catch (err) {
              console.error(
                `Failed to load file at ${filePath} for Code element:`,
                err
              );
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
      remarkPlugins: [remarkMath, remarkGetCodeFile, remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });
}

async function readMarkdownFiles() {
  const markdownFiles = await fs.readdir(
    path.resolve(process.cwd(), MARKDOWN_FOLDER)
  );
  return await Promise.all(
    markdownFiles.map(async (file) => await readMarkdownFile(file))
  );
}

// Credit to joshwcomeau: https://stackoverflow.com/questions/73447710/parse-mdx-file-in-next-js
function getHeadings(source: string) {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^##*\s/);
  });

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const text = raw.replace(/^##*\s/, "");
    const id = slug(text);

    const max_heading_level = 3;
    const levels = [...Array(max_heading_level)].map((_, i) => i + 1).reverse();

    for (let level of levels) {
      if (raw.slice(0, level) === "#".repeat(level)) {
        return { id, text, level: Math.max(level, 1) };
      }
    }

    return { id, text, level: 99 };
  });
}

async function readMarkdownFile(file: string) {
  const filepath = path.resolve(process.cwd(), `${MARKDOWN_FOLDER}/${file}`);
  const source = await fs.readFile(filepath, "utf-8");

  const headings = getHeadings(source);
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

  return { mdx, headings };
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
