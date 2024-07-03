import ArticleLayout from "@layouts/ArticleLayout";
import Image from "@components/MDXContent/Image";

const Test = () => {
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
      <h2>Test</h2>
      <Image
        src="/images/notebooks/test/cell_output_1_1.png"
        caption="width, height"
        width={556}
        height={413}
      />
      width, height, maxWidth
      <Image
        src="/images/notebooks/test/cell_output_1_1.png"
        width={556}
        height={413}
        maxWidth={200}
      />
      width, height, maxHeight
      <Image
        src="/images/notebooks/test/cell_output_1_1.png"
        width={556}
        height={413}
        maxHeight={300}
      />
      width, height, maxWidth, maxHeight
      <Image
        src="/images/notebooks/test/cell_output_1_1.png"
        width={556}
        height={413}
        maxHeight={200}
        maxWidth={200}
      />
      maxWidth
      <Image src="/images/notebooks/test/cell_output_1_1.png" maxWidth={200} />
      maxHeight
      <Image src="/images/notebooks/test/cell_output_1_1.png" maxHeight={200} />
      maxWidth, maxHeight
      <Image
        src="/images/notebooks/test/cell_output_1_1.png"
        maxHeight={200}
        maxWidth={200}
      />
    </ArticleLayout>
  );
};

export default Test;
