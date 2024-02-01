import styled from "styled-components";
import Heading from "components/Heading";
import { FaLink as LinkIcon } from "react-icons/fa";
import { stringifyChildren } from "@ts/utils";
import { HEADER_HEIGHT } from "@ts/theme";

const SCROLL_MARGIN_TOP = HEADER_HEIGHT;

const Wrapper = styled.div`
  position: relative;

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    scroll-margin-top: ${SCROLL_MARGIN_TOP};
  }

  &:first-child h2 {
    margin-top: 0;
  }
`;

const Hidden = styled.div`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const ContentHeading = ({ children, ...props }: Parameters<typeof Heading>[0]) => {
  const id = stringifyChildren(children).toLowerCase().replace(/\s/g, "-");

  return (
    <Wrapper>
      <Heading {...props} style={{ position: "relative" }}>
        <Anchor id={id} href={`#${id}`}>
          <IconElement size={24} />
          <Hidden>Link to this heading</Hidden>
        </Anchor>
        {children}
      </Heading>
    </Wrapper>
  );
};

const Anchor = styled.a`
  display: none;
  pointer-events: none;

  &:focus {
    outline: none;
  }

  @media ${(p) => p.theme.breakpoints.mdAndLarger} {
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    transform: translateX(-150%);
    transition: opacity 250ms;
    opacity: 0;
    scroll-margin-top: ${SCROLL_MARGIN_TOP};

    ${Wrapper}:hover &,
    &:focus {
      opacity: 0.75;
    }
  }
`;

const IconElement = styled(LinkIcon)<{ $hide?: boolean }>`
  pointer-events: auto;
  opacity: ${(p) => (p.$hide ? 0 : 1)};

  ${Anchor}:focus & {
    outline: 2px auto var(--color-primary);
  }
`;

export default ContentHeading;
