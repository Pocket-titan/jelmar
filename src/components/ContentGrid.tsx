import { Children, type PropsWithChildren } from "react";
import styled from "styled-components";
import Heading from "src/components/Heading";
import { SHADOWS } from "src/ts/theme";

const Wrapper = styled.div`
  &:not(:first-of-type) {
    margin-top: 64px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled(Heading)`
  padding-bottom: 16px;

  @media (min-width: 1150px) {
    padding-left: 0;
  }
`;

const Grid = styled.div<{ type: "grid" | "list" }>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.type === "grid" ? "repeat(auto-fill, minmax(400px, 1fr))" : "1fr"};
  grid-gap: 32px;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    grid-template-columns: 1fr;
  }

  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    grid-gap: 16px;
  }
`;

const GridItem = styled.div`
  background: var(--color-subtle-floating);
  /* background: hsl(220, 23%, 95%); */
  padding: 24px 32px 24px 32px;
  border-radius: 8px;
  transition: background 350ms ease 0s;
  box-shadow: ${SHADOWS.low};

  a {
    color: var(--color-text);
    text-decoration: none;
  }
`;

const ContentGrid = ({
  children,
  title,
  type = "grid",
}: PropsWithChildren<{ title?: string; type?: "grid" | "list" }>) => {
  return (
    <Wrapper>
      {title && (
        <Header>
          <Title type="medium-title">{title}</Title>
        </Header>
      )}
      <Grid type={type}>
        {Children.map(children, (child) => (
          <GridItem>{child}</GridItem>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ContentGrid;
