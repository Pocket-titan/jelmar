import ArticleLayout from "@layouts/ArticleLayout";
import { EditorView } from "codemirror";
import { lineNumbers, Decoration, DecorationSet, WidgetType } from "@codemirror/view";
import {
  MergeView,
  unifiedMergeView,
  presentableDiff,
  diff,
  getOriginalDoc,
  getChunks,
  type Chunk,
} from "@codemirror/merge";
import { useEffect, useRef, useState } from "react";
import { EditorState, StateField, StateEffect, Facet, Extension } from "@codemirror/state";
import { TRANSITION_DURATION, SHADOWS } from "@ts/theme";
import styled from "styled-components";
import { range } from "lodash";
import Code from "@components/MDXContent/Code";

const initialValue = `
same text
same text
same text
same text
same text
this one has been changed
same
same
same
cdelete cdelete
bdelete
rdelete
same
same
same
same
`.trim();

const newValue = `
same text
same text
same text
same text
same text
same text
this one has been chnaged yes
same
same
same
same
same
same
same
a
`.trim();

const test = () => {
  return (
    <ArticleLayout
      frontmatter={{
        title: "test",
        slug: "test",
        date: "2021-01-01",
        tags: ["test"],
        excerpt: "test",
        extension: "mdx",
      }}
    >
      hello
      <Code children={newValue} oldValue={initialValue} filename="test.py" />
      <Code language="tsx">
        {`
import React from "react";
import { useEditor } from "ts/hooks";

const test = () => {
  const { ref, view } = useEditor({
    value: "hello world",
  });

  return <div ref={ref} />;
};
        `}
      </Code>
    </ArticleLayout>
  );
};

export default test;
