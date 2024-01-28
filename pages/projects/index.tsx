import styled from "styled-components";
import Image from "next/image";
import DefaultLayout from "src/layouts/DefaultLayout";
import ContentGrid from "src/components/ContentGrid";
import MaxWidthWrapper from "src/components/MaxWidthWrapper";
import Link from "src/components/Link";
import { capitalize } from "src/ts/utils";

const projects: {
  title: string;
  description: string;
  tags: string[];
  url: string;
  image?: string;
}[] = [
  {
    title: "project 1",
    description: "my description",
    tags: ["react", "science"],
    url: "",
    image: "/images/greenland_ice.png",
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
  /* min-height: 300px; */
  max-height: 200px;
  width: 100%;
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
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
  }
`;

const Project = ({ title, description, tags, url, image }: (typeof projects)[number]) => {
  return (
    <Article>
      <Link
        href={url}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
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
          <Right>
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              // layout="responsive"
              style={{
                height: "100%",
                width: "auto",
                borderRadius: 8,
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
