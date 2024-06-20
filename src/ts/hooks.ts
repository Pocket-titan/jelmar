import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { EditorState, Extension, Prec } from "@codemirror/state";
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

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, event: MediaQueryListEvent) => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);

      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    throw Error("useMediaQuery is a client-only hook");
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

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
          Prec.highest(EditorState.readOnly.of(true)),
          Prec.highest(EditorView.editable.of(false)),
          ...(wrapLines ? [EditorView.lineWrapping] : []),
          ...(isMergeEditor ? mergeExtension(oldValue.trim(), 0) : []),
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
