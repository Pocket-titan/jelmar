import { serialize } from "next-mdx-remote/serialize";
import frontMatter from "front-matter";
import remarkMath from "remark-math";
import fs from "fs/promises";
import path from "path";
import type { Frontmatter, MDX } from "src/components/MDXContent";

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

async function readNotebookFiles() {
  const notebookFiles = await fs.readdir(path.resolve(process.cwd(), NOTEBOOK_FOLDER));
  return (
    await Promise.all(
      notebookFiles.map(async (file) => {
        try {
          return await readNotebookFile(file);
        } catch (e) {
          console.error(`Error reading notebook file ${file}`, e);
          return undefined;
        }
      })
    )
  ).filter((x) => !!x) as NonNullable<Awaited<ReturnType<typeof readNotebookFile>>>[];
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

function makeReadable(item: any): any {
  if (typeof item === "string") {
    return item.length > 10 ? item.slice(0, 10) + "..." : item;
  }

  if (Array.isArray(item)) {
    return item.slice(0, 5).map((x) => makeReadable(x));
  }

  if (typeof item === "object" && item !== null) {
    const processed: { [key: string]: any } = {};

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        processed[key] = makeReadable(item[key]);
      }
    }

    return processed;
  }

  return item;
}

type NotebookOutputData = {
  "text/plain"?: string[];
  "image/png"?: string;
};

type NotebookOutput = {
  data: NotebookOutputData;
  execution_count: number | null;
  metadata: Record<string, any>;
  output_type: string;
};

type CodeCell = {
  cell_type: "code";
  execution_count: number | null;
  metadata: Record<string, any>;
  outputs: NotebookOutput[];
  source: string[];
};

type MarkdownCell = {
  cell_type: "markdown";
  metadata: Record<string, any>;
  source: string[];
};

type NotebookCell = CodeCell | MarkdownCell;

type NotebookMetadata = {
  kernelspec: {
    display_name: string;
    language: string;
    name: string;
  };
  language_info: {
    codemirror_mode: {
      name: string;
      version: number;
    };
    file_extension: string;
    mimetype: string;
    name: string;
    nbconvert_exporter: string;
    pygments_lexer: string;
    version: string;
  };
};

type Notebook = {
  cells: NotebookCell[];
  metadata: NotebookMetadata;
  nbformat_minor: number;
  nbformat: number;
};

function convertCellToMDX(cell: NotebookCell): string {
  let { metadata, source } = cell;

  if (source.length === 0 || source.map((x) => x.trim()).join("").length === 0) {
    return "";
  }

  if (cell.cell_type === "markdown") {
    return source.join("");
  }

  if (cell.cell_type === "code") {
    let tag = null;

    if (source[0].trim() === "# hide") {
      tag = "hide";
    }

    if (source[0].trim() === "# fold") {
      tag = "fold";
    }

    if (tag) {
      metadata.tags = [...(metadata.tags || []), tag];
      source = source.slice(1);
    }

    if ((metadata.tags || []).includes("hide")) {
      return "";
    }

    return `<Cell cell={${JSON.stringify({ ...cell, metadata, source })}}/>\n\n`;
  }

  return "";
}

const parseFrontmatterCell = ({ cell_type, source }: NotebookCell) => {
  if (cell_type !== "code") {
    throw new Error("Error parsing frontmatter");
  }

  return source
    .filter((line) => line.trim().length > 0)
    .map((line, i) => {
      const res = line.trim();

      if (!res.startsWith("#")) {
        throw new Error(`Error parsing frontmatter on line ${i}`);
      }

      return res.slice(1).trim();
    })
    .join("\n");
};

const parseTitleCell = ({ cell_type, source }: NotebookCell) => {
  if (cell_type !== "markdown") {
    throw new Error("Error parsing title");
  }

  return source
    .filter((line) => line.trim().length > 0)
    .map((line) => line.replace("#", "").trim())[0]
    .trim();
};

async function readNotebookFile(file: string) {
  const filepath = path.resolve(process.cwd(), `${NOTEBOOK_FOLDER}/${file}`);
  const contents = await fs.readFile(filepath, "utf-8");
  const notebook = JSON.parse(contents) as Notebook;
  const language = notebook.metadata.kernelspec.language;

  let startCell = 1;
  let frontmatter = parseFrontmatterCell(notebook.cells[0]);
  if (!frontmatter.includes("title:")) {
    startCell = 2;
    const title = parseTitleCell(notebook.cells[1]);
    let lines = frontmatter.split("\n");
    const idx = lines.indexOf("---");
    lines.splice(idx + 1, 0, `title: ${title}`);
    frontmatter = lines.join("\n");
  }

  const cells = notebook.cells
    .slice(startCell)
    .map((cell) =>
      cell.cell_type === "code" ? { ...cell, metadata: { ...cell.metadata, language } } : cell
    )
    .reduce((acc, cell) => acc + convertCellToMDX(cell), "");
  const source = [frontmatter, cells].join("\n\n");

  const mdx = await doSerialize(source);

  const extension = path.extname(file);
  const slug = file.replace(extension, "");
  const fm = frontMatter(source);
  mdx.frontmatter = maybeFixFrontmatter(
    source
      .split("\n")
      .slice(Math.max(0, fm.bodyBegin - 1))
      .join("\n"),
    { ...(fm.attributes as object), slug }
  );

  return mdx;
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
