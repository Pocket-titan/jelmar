import path from "path";
import fs from "fs/promises";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { gfm } from "micromark-extension-gfm";
import { mdxjs } from "micromark-extension-mdxjs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { mathFromMarkdown, mathToMarkdown } from "mdast-util-math";
import { gfmFromMarkdown, gfmToMarkdown } from "mdast-util-gfm";
import { math } from "micromark-extension-math";
import { toMarkdown } from "mdast-util-to-markdown";
import { map } from "unist-util-map";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKDOWN_FOLDER = "content/markdown";
const NOTEBOOK_FOLDER = "content/notebooks";

async function main() {
  process.chdir(path.resolve(__dirname, ".."));
  await convertNotebookFiles(process.argv[2]);
}

main();

async function convertNotebookFiles(glob?: string) {
  let notebookFiles = await fs.readdir(
    path.resolve(process.cwd(), NOTEBOOK_FOLDER)
  );
  if (glob) {
    notebookFiles = notebookFiles.filter((file) => file.match(glob));
  }
  console.log(`Converting ${notebookFiles.length} notebook files to MDX...`);

  for (let file of notebookFiles) {
    const source = await readNotebookFile(file);

    const extension = path.extname(file);
    const slug = file.replace(extension, "");
    await fs.writeFile(
      path.resolve(process.cwd(), `${MARKDOWN_FOLDER}/${slug}.mdx`),
      source
    );
  }

  console.log("Done!");
}

function fixHeadingLevels(cells: NotebookCell[]): NotebookCell[] {
  let minLevel = 99;

  const markdownCells = cells
    .filter(({ cell_type }) => cell_type === "markdown")
    .forEach(({ source }) => {
      const headingLines = source
        .map((line) => line.match(/^##*\s/))
        .filter((x) => !!x)
        .map((x) => x![0].trim().length);

      for (let level of headingLines) {
        minLevel = Math.min(minLevel, level);
      }
    });

  const delta = -1 * (minLevel - 1);

  return cells.map((cell) => {
    if (cell.cell_type === "code") {
      return cell;
    }

    return {
      ...cell,
      source: cell.source.map((line) => {
        let match = line.match(/^##*\s/);

        if (match) {
          return line.replace(
            match[0],
            "#".repeat(match[0].trim().length + delta) + " "
          );
        }

        return line;
      }),
    };
  });
}

async function readNotebookFile(file: string) {
  const filepath = path.resolve(process.cwd(), `${NOTEBOOK_FOLDER}/${file}`);
  const contents = await fs.readFile(filepath, "utf-8");
  const notebook = JSON.parse(contents) as Notebook;
  const language =
    notebook.metadata.kernelspec?.language ||
    notebook.metadata.language_info.name;

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

  const extension = path.extname(file);
  const slug = file.replace(extension, "");

  const cells = await fixHeadingLevels(notebook.cells.slice(startCell))
    .map((cell) =>
      cell.cell_type === "code"
        ? {
            ...cell,
            metadata: {
              ...cell.metadata,
              language: cell.metadata?.vscode?.languageId || language,
            },
          }
        : cell
    )
    .reduce(
      async (acc, cell, i) =>
        (await acc) + (await convertCellToMDX(cell, slug, i)),
      Promise.resolve("")
    );

  const source = [frontmatter, cells].join("\n\n");
  return source;
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

function saveDataUrl(src: string, folder: string, filename: string): string {
  mkdirSync(path.resolve(process.cwd(), folder), { recursive: true });

  try {
    console.info(`Saving base64 image: ${folder}/${filename}...`);

    writeFileSync(path.resolve(process.cwd(), folder, filename), src, {
      encoding: "base64",
    });
  } catch (err) {
    console.error("Something went wrong while saving a base64 image: ", err);
  }

  return `${folder.replace("public", "")}/${filename}`;
}

const mapCellOutput = async (
  output: NotebookOutput,
  i: string,
  slug: string
) => {
  const { output_type, data } = output;

  if (output_type === "display_data") {
    if (data["image/png"] && isBase64(data["image/png"])) {
      const folder = `public/images/notebooks/${slug}`;
      const filename = `cell_output_${i}.png`;

      const imgPath = saveDataUrl(data["image/png"], folder, filename);
      data["image/png"] = imgPath;
    }
  }

  return output;
};

function reparseMarkdown(source: string, slug: string, nr: number) {
  const doc = fromMarkdown(source, {
    extensions: [math(), gfm(), mdxjs()],
    mdastExtensions: [mathFromMarkdown(), gfmFromMarkdown(), mdxFromMarkdown()],
  });

  const tree = map(doc, (node, i) => {
    if (node.type === "image") {
      let attributes: any[] = [
        {
          type: "mdxJsxAttribute",
          name: "src",
          value: node.url,
        },
      ];

      if (node.title) {
        attributes.push({
          type: "mdxJsxAttribute",
          name: "alt",
          value: node.title,
        });
      }

      if (node.alt) {
        attributes.push({
          type: "mdxJsxAttribute",
          name: "alt",
          value: node.alt,
        });
      }

      node = {
        type: "mdxJsxFlowElement",
        name: "Image",
        attributes,
        children: [],
        position: node.position,
      };
    }

    if (node.type === "mdxJsxFlowElement" && node.name === "Image") {
      node.attributes = node.attributes.map((attr) => {
        if (
          attr.type === "mdxJsxAttribute" &&
          attr.name === "src" &&
          attr.value &&
          typeof attr.value === "string" &&
          attr.value.startsWith("data:image/png;base64")
        ) {
          const folder = `public/images/notebooks/${slug}`;
          const filename = `markdown_image_${nr}_${i}.png`;

          const imgPath = saveDataUrl(
            attr.value.replace("data:image/png;base64,", ""),
            folder,
            filename
          );
          attr.value = imgPath;
        }

        return attr;
      });
    }

    return node;
  });

  return toMarkdown(tree, {
    extensions: [mathToMarkdown(), gfmToMarkdown(), mdxToMarkdown()],
  });
}

async function convertCellToMDX(cell: NotebookCell, slug: string, nr: number) {
  let { metadata, source } = cell;

  if (
    source.length === 0 ||
    source.map((x) => x.trim()).join("").length === 0
  ) {
    return "";
  }

  if (cell.cell_type === "markdown") {
    try {
      return reparseMarkdown(source.join(""), slug, nr) + "\n";
    } catch (err) {
      console.warn(`Error parsing markdown, reverting to naive mode: ${err}`);
      return source.join("") + "\n\n";
    }
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

    const outputs = await Promise.all(
      (cell.outputs || []).map(
        async (x, i) => await mapCellOutput(x, `${nr}_${i}`, slug)
      )
    );

    return `<Cell cell={${JSON.stringify({
      ...cell,
      outputs,
      metadata,
      source,
    })}}/>\n\n`;
  }

  return "";
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

function isBase64(str: string) {
  try {
    return Buffer.from(str, "base64").toString("base64") === str;
  } catch {
    return false;
  }
}
