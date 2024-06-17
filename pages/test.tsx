import ArticleLayout from "@layouts/ArticleLayout";

const test = () => {
  return (
    <ArticleLayout
      frontmatter={{
        title: "",
        date: "",
        tags: [],
        slug: "slug",
        excerpt: "excp",
        extension: "mdx",
      }}
    >
      <div
        style={{
          background: "teal",
          padding: "2rem",
          minHeight: "1900px",
        }}
      >
        Content
      </div>
    </ArticleLayout>
  );
};

export default test;
