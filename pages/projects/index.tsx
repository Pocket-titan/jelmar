import type { InferGetStaticPropsType, GetStaticProps } from "next";
import styled from "styled-components";
import NextImage, { StaticImageData } from "next/image";
import DefaultLayout from "src/layouts/DefaultLayout";
import ContentGrid from "components/ContentGrid";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Link from "components/Link";
import { capitalize } from "ts/utils";
import GreenlandImage from "public/images/projects/greenland_ice.png";
import ApygeeLogo from "public/images/projects/apygee_logo.jpg";
import WikigraphImage from "public/images/projects/wikigraph_logo_new_w_1024.png";
import WhcImage from "public/images/projects/whc.png";
import ExternalLinkIcon from "@components/ExternalLinkIcon";
import { CSSProperties } from "react";
import { sortBy } from "lodash";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";
import SEO from "@components/SEO";

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
    title: "Apygee",
    description:
      "A Python package for creating, manipulating and visualizing Kepler orbits.",
    tags: ["Python", "Astrodynamics"],
    url: "https://pypi.org/project/apygee/",
    image: {
      src: ApygeeLogo,
    },
    date: {
      year: 2024,
      month: 5,
    },
  },
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
  width: 100%;

  &:hover h3 {
    color: var(--color-primary);
  }
`;

const Top = styled.div``;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
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
  transition: color 350ms ease 0s, background 350ms ease 0s;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    padding: 2px;
    background: linear-gradient(
      330deg,
      var(--color-secondary) 20%,
      var(--color-primary) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const Img = styled(NextImage)`
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
`;

const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  display: inline;
  vertical-align: middle;
  margin-left: 0.3rem;
  margin-bottom: 1px;
  font-size: 0.9em;
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr minmax(25%, 150px);

  height: 100%;
  width: 100%;

  &:hover ${StyledExternalLinkIcon} {
    color: var(--color-primary);
  }

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    grid-template-columns: 1fr minmax(100px, 33%);
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

  margin-left: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    margin-left: 16px;
  }
`;

const ImageWrapper = styled.div`
  /* min-width: 75px;
  max-width: 125px;
  min-height: 75px;
  max-height: 200px; */
`;

const Project = ({ title, description, tags, url, image }: Project) => {
  const isExternal = url.match(/(^http|^www)/i);

  return (
    <Article>
      <StyledLink href={url}>
        <Left>
          <Top>
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
          </Top>
          <Bottom>
            <Description>{description}</Description>
          </Bottom>
        </Left>
        {image && (
          <Right
            style={{
              ...(image.style || {}),
            }}
          >
            <ImageWrapper>
              <Img
                src={image.src}
                alt={title}
                loading="eager"
                placeholder="blur"
              />
            </ImageWrapper>
          </Right>
        )}
      </StyledLink>
    </Article>
  );
};

const Projects = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        title="Projects"
        description="A collection of projects I've worked on."
        darkColor={DARK_COLORS.subtleBackground}
        lightColor={LIGHT_COLORS.subtleBackground}
      />

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
    </>
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
