import styled from "styled-components";
import { SHADOWS } from "src/ts/theme";
import Image from "next/image";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
`;

const Face = () => {
  return (
    <Wrapper>
      <Image
        src="/images/bakkes_new.jpg"
        alt="Picture of the author"
        width={200}
        height={200}
        style={{
          objectFit: "cover",
          objectPosition: "50% 0",
          borderRadius: "50%",
          boxShadow: SHADOWS.high,
          width: 200,
          height: 200,
        }}
      />
    </Wrapper>
  );
};

export default Face;
