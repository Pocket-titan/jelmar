import ArticleLayout from "@layouts/ArticleLayout";
import Collapsed from "@components/Collapsed";
import Code from "@components/MDXContent/Code";
import styled from "styled-components";
import { PropsWithChildren, useState } from "react";
import { useSpring, config, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";

const Details = styled.details``;

const Summary = styled.summary`
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

const ContentWrapper = styled(animated.div)`
  will-change: height;
  overflow: visible;
`;

const Content = styled.div<{ $isExpanded: boolean }>``;

const Comp = ({ children }: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [measureRef, { height }] = useMeasure();

  const styles = useSpring({
    config: config.default,
    from: {
      height: 0,
    },
    to: {
      height: isExpanded ? height : 0,
    },
  });

  console.log(isExpanded, styles);

  return (
    <Details open={isExpanded}>
      <Summary onClick={() => setIsExpanded((prev) => !prev)}>Click me</Summary>
      <ContentWrapper style={{ ...styles }}>
        <Content $isExpanded={isExpanded} ref={measureRef}>
          {children}
        </Content>
      </ContentWrapper>
    </Details>
  );
};

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
      <Comp>
        <p>what's in here</p>
        <Code language="javascript">{`console.log("hello world")`}</Code>
      </Comp>
    </ArticleLayout>
  );
};

export default test;
