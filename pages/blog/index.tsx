import styled from "styled-components";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { readFiles } from "ts/files";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import DefaultLayout from "src/layouts/DefaultLayout";
import Link from "components/Link";
import { capitalize, formatDate } from "ts/utils";
import { FaChevronRight } from "react-icons/fa";
import ContentGrid from "components/ContentGrid";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";
import SEO from "@components/SEO";
import NextImage from "next/image";

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

function Blog({ files }: StaticProps) {
  return (
    <>
      <SEO
        title="Blog"
        darkColor={DARK_COLORS.subtleBackground}
        lightColor={LIGHT_COLORS.subtleBackground}
      />
      <DefaultLayout background={"var(--color-subtle-background)"}>
        <MaxWidthWrapper>
          <Main>
            <ContentGrid title="Posts" type="grid">
              {files.map((file) => (
                <Post key={file.slug} {...file} />
              ))}
            </ContentGrid>
          </Main>
        </MaxWidthWrapper>
      </DefaultLayout>
    </>
  );
}

const Main = styled.main`
  padding-top: 32px;
`;

function Post({
  title,
  slug,
  date,
  excerpt,
  image,
  ...file
}: StaticProps["files"][number]) {
  return (
    <Article>
      <StyledLink href={`/blog/${slug}`}>
        <Left>
          <Title>{capitalize(title)}</Title>
          <SmallDate>{formatDate(date)}</SmallDate>
          <Description>{excerpt}</Description>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            Read more <Arrow />
          </div>
        </Left>
        {image && (
          <Right>
            <Img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={title}
              loading="eager"
            />
          </Right>
        )}
      </StyledLink>
    </Article>
  );
}

const Article = styled.article`
  height: 100%;
  width: 100%;

  &:hover h3 {
    color: var(--color-primary);
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr clamp(100px, 25%, 150px);
  gap: 32px;

  height: 100%;
  width: 100%;

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    grid-template-columns: 1fr clamp(100px, 30%, 150px);
    gap: 16px;
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    grid-template-columns: 1fr;

    ${Right} {
      display: none;
    }
  }
`;

const Img = styled(NextImage)`
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
`;

const Title = styled.h3`
  transition: color 350ms ease 0s;
  color: var(--color-text);
`;

const Description = styled.p`
  font-size: 1.1rem;
  transition: color 350ms ease 0s;
  color: var(--color-text);
  overflow-wrap: anywhere;
  margin-bottom: 8px;
  flex: 1;
`;

const SmallDate = styled.span`
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--color-gray-700);
`;

const Arrow = styled(FaChevronRight)`
  transition: opacity 250ms ease 0s;
  margin-left: 3px;
  margin-top: 2px;
  color: var(--color-primary);
  opacity: 0;

  article:hover & {
    opacity: 1;
  }
`;

export const getStaticProps = (async (context) => {
  const files = (await readFiles()).map(({ mdx }) => mdx.frontmatter);

  files.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  return { props: { files } };
}) satisfies GetStaticProps;

export default Blog;
