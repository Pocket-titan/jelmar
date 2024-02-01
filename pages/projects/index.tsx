import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import styled from "styled-components";
import NextImage, { StaticImageData } from "next/image";
import DefaultLayout from "src/layouts/DefaultLayout";
import ContentGrid from "components/ContentGrid";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Link from "components/Link";
import { capitalize } from "ts/utils";
import GreenlandImage from "public/images/greenland_ice.png";

type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  image?: string | StaticImageData;
};

const projects: Project[] = [
  {
    title: "project 1",
    description: "my description",
    tags: ["react", "science"],
    url: "",
    image: GreenlandImage,
  },
  {
    title: "project 2",
    description:
      "my description much longer than previous and should wrap multiple lines I think that would be very cool don't you think so okay let's move on!",
    tags: ["react", "science"],
    url: "",
  },
];

const Main = styled.main`
  padding-top: 32px;
`;

const Article = styled.article`
  height: 100%;

  &:hover h3 {
    color: var(--color-primary);
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  transition: color 250ms ease 0s;
  margin-bottom: 6px;
`;

const Description = styled.p`
  margin-top: 6px;
  margin-bottom: 8px;
  flex: 1;
`;

const Right = styled.div`
  margin-left: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin-left: 16px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled.div`
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 13px;
  position: relative;
  color: var(--color-gray-900);

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    padding: 2px;
    background: linear-gradient(330deg, var(--color-secondary) 20%, var(--color-primary) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const Img = styled(NextImage)`
  position: relative !important;
  display: block;
  margin: auto;
  width: 100%;

  border-radius: 8px;
  object-fit: contain;
  object-position: center;
`;

const Project = ({ title, description, tags, url, image }: Project) => {
  return (
    <Article>
      <Link
        href={url}
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Left>
          <Title> {capitalize(title)} </Title>
          {tags.length > 0 && (
            <Tags>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>
          )}
          <Description>{description}</Description>
        </Left>
        {image && (
          <Right
            style={{
              minWidth: 75,
              minHeight: 75,
              maxWidth: 200,
              maxHeight: 200,
            }}
          >
            <Img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Right>
        )}
      </Link>
    </Article>
  );
};

const Projects = () => {
  return (
    <DefaultLayout background={"var(--color-subtle-background)"}>
      <MaxWidthWrapper>
        <Main>
          <ContentGrid title="Projects" type="grid">
            {projects.map((project) => (
              <Project key={project.title} {...project} />
            ))}
          </ContentGrid>
        </Main>
      </MaxWidthWrapper>
    </DefaultLayout>
  );
};

export default Projects;
