import {
  MDXRemote,
  type MDXRemoteSerializeResult,
  type MDXRemoteProps,
} from "next-mdx-remote";
import styled from "styled-components";
import Code from "./Code";
import Math from "./Math";
import Note from "./Note";
import Image from "./Image";
import ContentHeading from "./ContentHeading";
import ContentLink from "./ContentLink";
import Cell from "./Notebook/Cell";
import FileTree from "./FileTree";
import Collapsed from "@components/Collapsed";
import Quote from "./Quote";
import OrderedList from "./OrderedList";
import FootnoteLabel from "./FootnoteLabel";

export type Frontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  extension: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
};

export type MDX = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Frontmatter
>;

const InlineCode = styled.code`
  background: var(--color-code-base);
  border-radius: 3px;
  margin-right: 0.1em;
  padding: 0.1em 0.2em;
  font-size: 1rem;
  transition: background 350ms ease 0s;
`;

const components: MDXRemoteProps["components"] = {
  Collapsed,
  FileTree,
  Cell,
  Math,
  Code,
  Note,
  Image,
  blockquote: Quote,
  pre: ({ children, ...props }) => {
    if (
      children &&
      typeof children === "object" &&
      "type" in children &&
      children.type === "code"
    ) {
      const { className, ...childProps } = children.props;
      const language = (className || "").replace(/language-/, "");

      return (
        <Code
          language={language.length > 0 ? language : undefined}
          {...props}
          {...childProps}
        />
      );
    }

    return <pre {...props}>{children}</pre>;
  },
  FootnoteLabel,
  h1: (props) => <ContentHeading type="major-heading" {...props} />,
  h2: (props) => <ContentHeading type="normal-heading" {...props} />,
  h3: (props) => <ContentHeading type="minor-heading" {...props} />,
  h4: (props) => <ContentHeading type="mini-heading" {...props} />,
  a: (props) => <ContentLink {...props} />,
  ol: OrderedList,
  code: ({ children, ...props }) => {
    if (!children) {
      return null;
    }

    const { className, ...rest } = props;

    if (className && className.includes("math-display")) {
      return <Math>{children}</Math>;
    }

    if (className && className.includes("math-inline")) {
      return <Math inline>{children}</Math>;
    }

    const isMultiline = children.toString().trim().split("\n").length > 1;

    if (isMultiline || (className && className.includes("language-"))) {
      const language = (className || "").replace(/language-/, "");

      return (
        <Code language={language.length > 0 ? language : undefined} {...rest}>
          {children}
        </Code>
      );
    }

    return (
      <InlineCode {...props} className="inline-code">
        {children}
      </InlineCode>
    );
  },
};

const MDXContent = (props: MDXRemoteProps) => {
  return <MDXRemote {...props} components={components} />;
};

export default MDXContent;
