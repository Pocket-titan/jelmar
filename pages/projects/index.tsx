import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import styled from "styled-components";
import NextImage, { StaticImageData } from "next/image";
import DefaultLayout from "src/layouts/DefaultLayout";
import ContentGrid from "components/ContentGrid";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Link from "components/Link";
import { capitalize } from "ts/utils";
import GreenlandImage from "public/images/projects/greenland_ice.png";
import WikigraphImage from "public/images/projects/wikigraph_logo_new_w_1024.png";
import WhcImage from "public/images/projects/whc.svg";
import ExternalLinkIcon from "@components/ExternalLinkIcon";
import { CSSProperties } from "react";
import { sortBy } from "lodash";

type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  image?: {
    src: string | StaticImageData;
    style?: CSSProperties;
  };
  date: {
    year: number;
    month: number;
  };
};

const projects: Project[] = [
  {
    title: "WikiGraph",
    description:
      "A tool to visualise connections between Wikipedia articles and the images found on them. Useful for creating Wikipedia puzzles.",
    tags: ["React", "Math"],
    url: "https://pocket-titan.github.io/wikigraph/",
    image: {
      src: WikigraphImage,
    },
    date: {
      year: 2022,
      month: 1,
    },
  },
  {
    title: "World Heritage map",
    description:
      "A better map of UNESCO World Heritage sites, with a focus on usability and clarity.",
    url: "https://pocket-titan.github.io/world-heritage/",
    tags: ["React", "GIS"],
    image: {
      src: WhcImage,
    },
    date: {
      year: 2017,
      month: 1,
    },
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

  display: flex;
  align-items: center;
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

const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  display: inline-block;
  margin-left: 0.3rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  height: 100%;
  width: 100%;

  &:hover ${StyledExternalLinkIcon} {
    color: var(--color-primary);
  }
`;

const Project = ({ title, description, tags, url, image }: Project) => {
  const isExternal = url.match(/(^http|^www)/i);

  return (
    <Article>
      <StyledLink href={url}>
        <Left>
          <Title>
            {capitalize(title)}
            {isExternal && <StyledExternalLinkIcon />}
          </Title>
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
              maxWidth: 150,
              maxHeight: 200,
              ...(image.style || {}),
            }}
          >
            <Img
              src={image.src}
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
      </StyledLink>
    </Article>
  );
};

const Projects = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps = (async () => {
  return {
    props: {
      projects: sortBy(projects, ["date.year", "date.month"]).reverse(),
    },
  };
}) satisfies GetStaticProps;

export default Projects;
