import ArticleLayout from "@layouts/ArticleLayout";
import Collapsed from "@components/Collapsed";
import Code from "@components/MDXContent/Code";

const test = () => {
  return (
    <ArticleLayout
      frontmatter={{
        title: "",
        date: "",
        slug: "",
        tags: [],
        excerpt: "",
        extension: "mdx",
      }}
    >
      <h2>test</h2>
      I'm typing normally!
      <Collapsed>
        <div>content goes here</div>
        <Code language="javascript">{`console.log("hello world")`}</Code>
      </Collapsed>
      after that, we talk
    </ArticleLayout>
  );
};

export default test;
