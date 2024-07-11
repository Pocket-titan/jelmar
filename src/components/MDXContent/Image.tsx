import styled, { css } from "styled-components";
import { CSSProperties, ComponentProps, ReactNode } from "react";
import NextImage from "next/image";
import { BREAKPOINTS } from "@ts/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 22px;
  margin-bottom: 22px;

  @media (${BREAKPOINTS.mdAndSmaller}) {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  @media (${BREAKPOINTS.smAndSmaller}) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

const StyledImage = styled(NextImage)`
  object-position: center;
  object-fit: contain;

  border-radius: 3px;
`;

const ImageWrapper = styled.div<{
  $fill: boolean;
  $maxHeight?: number;
  $maxWidth?: number;
}>`
  ${({ $fill }) =>
    !$fill &&
    css`
      img {
        height: 100% !important;
      }
    `}

  ${({ $fill, $maxWidth, $maxHeight }) =>
    $fill &&
    $maxHeight &&
    !$maxWidth &&
    css`
      img {
        width: unset !important;
        margin: auto !important;
      }
    `}
`;

const Caption = styled.span`
  display: block;
  padding-top: 8px;
  font-size: 0.84rem;
  text-align: center;
`;

const Image = ({
  src,
  alt,
  width,
  height,
  caption,
  maxWidth,
  maxHeight,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string | ReactNode;
  maxWidth?: number;
  maxHeight?: number;
}) => {
  const props: Omit<ComponentProps<typeof NextImage>, "src" | "alt" | "ref"> = {
    ...(width && height
      ? {
          width,
          height,
        }
      : {
          fill: true,
        }),
  };

  const wrapperStyle: CSSProperties = {
    ...(!(width && height)
      ? {
          position: "relative",
          display: "block",
          ...(maxWidth
            ? {
                maxWidth,
                height: "auto",
              }
            : {}),
        }
      : {
          ...(maxWidth
            ? {
                maxWidth,
                height: "auto",
              }
            : maxHeight
            ? {
                maxWidth: (width / height) * maxHeight,
                height: "auto",
              }
            : {}),
        }),
  };

  const imageStyle: CSSProperties = {
    ...(width && height
      ? {
          aspectRatio: `${width}/${height}`,
        }
      : {}),
  };

  if (!(width && height) && maxWidth) {
    console.warn(
      "maxWidth is ignored because width and height are not provided (I don't know how to fix this yet)"
    );
  }

  return (
    <Container>
      <ImageWrapper
        $fill={!!props.fill}
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        style={wrapperStyle}
      >
        <StyledImage
          src={src}
          sizes="75vw,100vw"
          alt={alt || ""}
          style={imageStyle}
          {...props}
        />
      </ImageWrapper>
      {caption && <Caption>{caption}</Caption>}
    </Container>
  );
};

export default Image;
