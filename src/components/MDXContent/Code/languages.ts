import {
  javascriptLanguage,
  jsxLanguage,
  tsxLanguage,
  typescriptLanguage,
} from "@codemirror/lang-javascript";
import { LanguageSupport } from "@codemirror/language";
import { pythonLanguage } from "@codemirror/lang-python";
import { rustLanguage } from "@codemirror/lang-rust";
import { pythonHighlighting, jsHighlighting, rustHighlighting } from "./highlighting";

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
};
