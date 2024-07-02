import React, {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import styled from "styled-components";

type HeadingType =
  | "section-title"
  | "small-title"
  | "medium-title"
  | "large-title"
  | "major-heading"
  | "normal-heading"
  | "minor-heading"
  | "mini-heading";

const Heading = ({
  type = "medium-title",
  as,
  ...props
}: PropsWithChildren<{
  type?: HeadingType;
  as?: string;
  style?: CSSProperties;
}> &
  HTMLAttributes<HTMLHeadingElement>) => {
  let Component: ComponentType<any>;

  switch (type) {
    case "section-title":
      Component = SectionTitle;
      break;
    case "small-title":
      Component = SmallTitle;
      break;
    case "medium-title":
      Component = MediumTitle;
      break;
    case "large-title":
      Component = LargeTitle;
      break;
    case "major-heading":
      Component = MajorHeading;
      break;
    case "normal-heading":
      Component = NormalHeading;
      break;
    case "minor-heading":
      Component = MinorHeading;
      break;
    case "mini-heading":
      Component = MiniHeading;
      break;
    default:
      throw new Error(`No valid title found for type: ${type}`);
  }

  return (
    <Component
      as={as}
      {...props}
      style={{
        ...(props.style || {}),
        transition: "color 350ms ease 0s",
      }}
    />
  );
};

const SectionTitle = styled.h1`
  font-size: calc(16 / 16 * 1rem);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SmallTitle = styled.h1`
  font-size: calc(20 / 16 * 1rem);
  color: var(--color-gray-1000);
`;

const MediumTitle = styled.h1`
  font-size: calc(24 / 16 * 1rem);
  color: var(--color-gray-1000);
  line-height: 1.2;
`;

const LargeTitle = styled.h1`
  font-size: calc(32 / 16 * 1rem);
  color: var(--color-gray-1000);
`;

const MajorHeading = styled.h2`
  font-size: calc(26 / 16 * 1rem);
  color: var(--color-gray-1000);
  margin-top: 24px;
  margin-bottom: 14px;
`;

const NormalHeading = styled.h3`
  font-size: calc(20 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 22px;
  margin-bottom: 6px;
`;

const MinorHeading = styled.h4`
  font-size: calc(18 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 18px;
  margin-bottom: 2px;
`;

const MiniHeading = styled.h5`
  font-size: calc(16 / 16 * 1rem);
  color: var(--color-gray-900);
  margin-top: 9px;
  margin-bottom: 0px;
`;

export default Heading;
