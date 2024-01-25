import styled from "@emotion/styled";
import DefaultLayout from "@app/layouts/DefaultLayout";
import MaxWidthWrapper from "@components/MaxWidthWrapper";

const Main = styled.main`
  padding-top: 32px;
`;

const About = () => {
  return (
    <DefaultLayout>
      <MaxWidthWrapper>
        <Main>about me</Main>
      </MaxWidthWrapper>
    </DefaultLayout>
  );
};

export default About;
