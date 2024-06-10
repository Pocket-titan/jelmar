import { useRef, useState, useEffect } from "react";
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "codemirror";
import { mergeExtension } from "./cm_merge_view";

export function useCssVariable(variable: string, ref?: HTMLElement) {
  if (!ref) {
    return;
  }

  const root = ref || window.document.documentElement;
  return window.getComputedStyle(root).getPropertyValue(variable);
}

export function useRem() {}

export function useEditor(
  { value = "", oldValue }: { value?: string; oldValue?: string },
  extensions: Extension[] = [],
  wrapLines = true
) {
  const ref = useRef<HTMLElement>();
  const [view, setView] = useState<EditorView>();
  const isMergeEditor = oldValue !== undefined;

  useEffect(() => {
    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          EditorState.readOnly.of(true),
          EditorView.editable.of(false),
          ...(wrapLines ? [EditorView.lineWrapping] : []),
          ...(isMergeEditor ? mergeExtension(oldValue.trim()) : []),
          ...extensions,
        ],
      }),
      parent: ref.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
}
