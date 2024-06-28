import path from "path";
import fs from "fs/promises";

const MARKDOWN_FOLDER = "content/markdown";
const NOTEBOOK_FOLDER = "content/notebooks";

async function main() {
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

const mapCellOutput = async (
  output: NotebookOutput,
  i: string,
  slug: string
) => {
  const { output_type, data } = output;

  if (output_type === "display_data") {
    if (data["image/png"] && isBase64(data["image/png"])) {
      const folder = `public/images/notebooks/${slug}`;
      await fs.mkdir(path.resolve(process.cwd(), folder), { recursive: true });

      try {
        const filename = `cell_output_${i}.png`;
        console.info(`Saving base64 image: ${slug}/${filename}...`);
        await fs.writeFile(
          path.resolve(process.cwd(), folder, filename),
          data["image/png"],
          {
            encoding: "base64",
          }
        );
        data["image/png"] = `${folder.replace("public", "")}/${filename}`;
      } catch (err) {
        console.error(
          "Something went wrong while saving a base64 image: ",
          err
        );
      }
    }
  }

  return output;
};

async function convertCellToMDX(cell: NotebookCell, slug: string, nr: number) {
  let { metadata, source } = cell;

  if (
    source.length === 0 ||
    source.map((x) => x.trim()).join("").length === 0
  ) {
    return "";
  }

  if (cell.cell_type === "markdown") {
    return source.join("") + "\n\n";
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
