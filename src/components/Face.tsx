import styled from "styled-components";
import { SHADOWS } from "ts/theme";
import NextImage from "next/image";
import FacePicture from "public/images/bakkes_new.jpg";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
`;

const Img = styled(NextImage)`
  border-radius: 50%;
  box-shadow: ${SHADOWS.medium};
  object-position: 50% 0;
  object-fit: cover;
  user-select: none;
`;

const Face = () => {
  return (
    <Wrapper>
      <Img
        src={FacePicture}
        alt="Picture of the author"
        width={200}
        height={200}
        placeholder="blur"
        loading="eager"
        priority
      />
    </Wrapper>
  );
};

export default Face;
