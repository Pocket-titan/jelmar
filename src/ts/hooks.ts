import { useRef, useState, useEffect } from "react";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";

export function useEditor(
  { initialValue = "" }: { initialValue?: string },
  extensions: any[] = [],
  wrapLines = true
) {
  const ref = useRef<HTMLElement>();
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    const view = new EditorView({
      state: EditorState.create({
        doc: initialValue,
        extensions: [
          EditorState.readOnly.of(true),
          EditorView.editable.of(false),
          ...(wrapLines ? [EditorView.lineWrapping] : []),
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
