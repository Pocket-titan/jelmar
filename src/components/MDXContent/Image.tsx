import styled from "styled-components";
import NextImage from "next/image";
import { PropsWithChildren } from "react";

const Img = styled(NextImage)<{
  $width?: number | string;
  $height?: number | string;
}>`
  display: block;
  /* width: 100%; */
  border-radius: 3px;
  margin: auto;

  object-fit: contain;
  object-position: center;
  position: relative !important;
  height: 100% !important;
  /* height: unset !important; */
  /* width: 100% !important; */

  /* if you want full width, comment */
  /* width: unset !important; */

  /* if you want limited height, uncomment these 2 */
  /* height: auto;
  max-height: 250px; */

  ${({ $height, $width }) =>
    $height && !$width
      ? `
    height: auto !important;
    width: unset !important;
    max-height: ${$height}${typeof $height === "number" ? "px" : ""};
  `
      : ""}

  ${({ $height, $width }) =>
    !$height && $width
      ? `
    height: unset !important;
    width: auto !important;
    max-width: ${$width}${typeof $width === "number" ? "px" : ""};
  `
      : ""}
`;

const Image = ({
  src,
  width,
  height,
  caption,
  alt = "",
  marginBottom = 32,
  includeWhiteBackground = false,
}: PropsWithChildren<{
  src: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
  alt?: string;
  marginBottom?: number;
  includeWhiteBackground?: boolean;
}>) => {
  // const style =
  //   width && !height
  //     ? { maxWidth: width, height: "auto" }
  //     : !width && height
  //     ? { height, width: "auto" }
  //     : width && height
  //     ? { maxHeight: height, maxWidth: width }
  //     : {};

  const wrapperStyle = {
    background: includeWhiteBackground ? "white" : undefined,
    padding: includeWhiteBackground ? "16px" : undefined,
    borderRadius: includeWhiteBackground ? "8px" : undefined,
    "--margin-bottom":
      typeof marginBottom === "number" ? `${marginBottom}px` : undefined,
    // ...style,
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
      <Img
        src={src}
        alt={alt}
        sizes="75vw"
        $width={width}
        $height={height}
        {...props}
      />
      {caption && <Caption>{caption}</Caption>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  margin: 24px auto var(--margin-bottom);
  box-sizing: content-box;
  position: relative;

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
  font-size: 0.84rem;
  text-align: center;
`;

export default Image;
