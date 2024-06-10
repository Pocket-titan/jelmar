import { lineNumbers, Decoration, DecorationSet, WidgetType } from "@codemirror/view";
import { getChunks, getOriginalDoc, unifiedMergeView, presentableDiff } from "@codemirror/merge";
import { EditorState, Extension, StateField } from "@codemirror/state";
import { EditorView } from "codemirror";
import { range } from "lodash";

export function mergeExtension(oldValue: string): Extension[] {
  const mark = Decoration.replace({
    widget: new Widget(),
  });

  const lineNumbersToHide: { [key: number]: number } = {};

  const field = StateField.define<DecorationSet>({
    create(state) {
      const ranges = getRanges(state);

      ranges.forEach(([from, to]) => {
        const [startLine, endLine] = [from, to].map((x) => state.doc.line(x).number);
        const numLines = endLine - startLine + 1;
        lineNumbersToHide[startLine] = numLines;
      });

      return Decoration.set(
        ranges.map(([from, to]) => mark.range(state.doc.line(from).from, state.doc.line(to).to))
      );
    },
    update(value, transaction) {
      return value;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

  const cdot = "|";

  return [
    field,
    lineNumbers({
      formatNumber: (n) => (lineNumbersToHide[n] ? cdot : n.toString()),
    }),
    unifiedMergeView({
      original: oldValue,
      mergeControls: false,
      gutter: false,
    }),
  ];
}

type Kind = "normal" | "insert" | "delete";

type Line = {
  kind: Kind;
  index: number;
};

function getRanges(state: EditorState) {
  const chunks = getChunks(state);
  const linesToInclude: { [key: number]: Line } = {};
  const N_CONTEXT = 1;

  if (!chunks || chunks["side"] !== "b") {
    return [];
  }

  const originalDoc = getOriginalDoc(state);

  chunks["chunks"].forEach((x) => {
    const bText = state.doc.slice(x.fromB, x.endB);

    if (bText.length > 0) {
      const [startLine, endLine] = [x.fromB, x.endB].map((x) => state.doc.lineAt(x).number);

      const lines: Line[] = range(startLine, endLine + 1).map((x) => ({
        kind: "insert",
        index: x,
      }));

      lines.forEach((line) => {
        linesToInclude[line.index] = line;
      });

      const contextLines: Line[] = [
        ...range(startLine - N_CONTEXT, startLine),
        ...range(endLine + 1, endLine + N_CONTEXT + 1),
      ]
        .filter((x) => x > 0 && x <= state.doc.lines)
        .map((x) => ({ kind: "normal", index: x }));

      contextLines.forEach((line) => {
        if (!linesToInclude[line.index]) {
          linesToInclude[line.index] = line;
        }
      });
    } else {
      const aText = originalDoc.slice(x.fromA, x.endA);

      const [startLine, endLine] = [x.fromB, x.endB].map((x) => state.doc.lineAt(x).number);
      const lines: Line[] = range(startLine - N_CONTEXT, endLine + 1 + N_CONTEXT - 1).map((x) => ({
        kind: "normal",
        index: x,
      }));

      lines.forEach((line) => {
        if (!linesToInclude[line.index]) {
          linesToInclude[line.index] = line;
        }
      });
    }
  });

  const linesToHide = range(1, state.doc.lines).filter((x) => !linesToInclude[x]);

  const ranges = linesToHide
    .reduce((acc, x) => {
      if (acc.length === 0) {
        acc.push([x]);
      } else {
        const last = acc[acc.length - 1];
        const lastValue = last[last.length - 1];

        if (x === lastValue + 1) {
          last.push(x);
        } else {
          acc.push([x]);
        }
      }

      return acc;
    }, [] as number[][])
    .map((x) => [x[0], x[x.length - 1]]);

  return ranges;
}

class Widget extends WidgetType {
  toDOM() {
    const el = document.createElement("span");
    const ellipsis = "…";
    el.textContent = ellipsis;
    el.className = "line-number-hidden";
    return el;
  }
}
