import { MDXRemote, type MDXRemoteSerializeResult, type MDXRemoteProps } from "next-mdx-remote";
import Code from "./Code";
import Math from "./Math";
import Note from "./Note";
import Image from "./Image";

export type Frontmatter = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  extension: string;
};

export type MDX = MDXRemoteSerializeResult<Record<string, unknown>, Frontmatter>;

const components: MDXRemoteProps["components"] = {
  Code,
  Math,
  Note,
  Image,
  pre: ({ children, ...props }) => {
    if (
      children &&
      typeof children === "object" &&
      "type" in children &&
      children.type === "code"
    ) {
      const { className, ...childProps } = children.props;
      const language = className.replace(/language-/, "");

      return (
        <Code language={language.length > 0 ? language : undefined} {...props} {...childProps} />
      );
    }

    return <pre {...props}>{children}</pre>;
  },
  div: ({ children, ...props }) => {
    if (props.className && props.className.includes("math-display")) {
      return <Math>{children}</Math>;
    }

    return <div {...props}> {children}</div>;
  },
  span: ({ ...props }) => {
    if (props.className && props.className.includes("math-inline")) {
      return <Math inline>{props.children}</Math>;
    }

    return <span {...props} />;
  },
};

const MDXContent = (props: MDXRemoteProps) => {
  return <MDXRemote {...props} components={components} />;
};

export default MDXContent;
