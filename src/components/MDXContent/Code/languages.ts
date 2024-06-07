import {
  javascriptLanguage,
  jsxLanguage,
  tsxLanguage,
  typescriptLanguage,
} from "@codemirror/lang-javascript";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { shell as bashLanguage } from "@codemirror/legacy-modes/mode/shell";
import { fortran as fortranLanguage } from "@codemirror/legacy-modes/mode/fortran";
import { pythonLanguage } from "@codemirror/lang-python";
import { rustLanguage } from "@codemirror/lang-rust";
import { pythonHighlighting, jsHighlighting, rustHighlighting } from "./highlighting";

// It works /shrug
const bash = StreamLanguage.define(bashLanguage) as unknown as LanguageSupport;
const fortran = StreamLanguage.define(fortranLanguage) as unknown as LanguageSupport;

const python = new LanguageSupport(
  pythonLanguage.configure({
    props: [pythonHighlighting],
  })
);

const javascript = new LanguageSupport(
  javascriptLanguage.configure({
    props: [jsHighlighting],
  })
);

const jsx = new LanguageSupport(
  jsxLanguage.configure({
    props: [jsHighlighting],
  })
);

const typescript = new LanguageSupport(
  typescriptLanguage.configure({
    props: [jsHighlighting],
  })
);

const tsx = new LanguageSupport(
  tsxLanguage.configure({
    props: [jsHighlighting],
  })
);

const rust = new LanguageSupport(
  rustLanguage.configure({
    props: [rustHighlighting],
  })
);

export const languages: { [key: string]: LanguageSupport } = {
  jsx,
  tsx,
  typescript,
  javascript,
  python,
  rust,
  bash,
  fortran,
};
