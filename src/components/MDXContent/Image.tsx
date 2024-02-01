import styled from "styled-components";
import NextImage from "next/image";

const Img = styled(NextImage)`
  display: block;
  width: 100%;
  border-radius: 3px;
  margin: auto;

  object-fit: contain;
  object-position: center;
  /* width: 100% !important; */
  position: relative !important;
  /* height: unset !important; */
`;

const Image = ({
  src,
  width,
  height,
  caption,
  alt = "",
  marginBottom = 32,
  includeWhiteBackground = false,
}: {
  src: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
  alt?: string;
  marginBottom?: number;
  includeWhiteBackground?: boolean;
}) => {
  const style =
    width && !height
      ? { maxWidth: width, height: "auto" }
      : !width && height
      ? { height, width: "auto" }
      : width && height
      ? { maxHeight: height, maxWidth: width }
      : {};

  const wrapperStyle = {
    background: includeWhiteBackground ? "white" : undefined,
    padding: includeWhiteBackground ? "16px" : undefined,
    borderRadius: includeWhiteBackground ? "8px" : undefined,
    "--margin-bottom": typeof marginBottom === "number" ? `${marginBottom}px` : undefined,
    ...style,
  };

  const props =
    typeof width === "number" && typeof height === "number"
      ? {
          width,
          height,
        }
      : {
          fill: true,
        };

  return (
    <Wrapper style={wrapperStyle}>
      <Img src={src} alt={alt} {...props} />
      {caption && <Caption>{caption}</Caption>}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  width: 100%;
  margin: 16px auto var(--margin-bottom);
  box-sizing: content-box;

  /*
    HACK: Next-image does some trickery which undoes the auto-margins.
    I'll need to target it here directly.
  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${(p) => p.theme.breakpoints.smAndSmaller} {
    padding: 0;
    border: none;
  }
`;

const Caption = styled.span`
  display: block;
  padding-top: 8px;
  font-size: 15px;
  text-align: center;
`;

export default Image;
