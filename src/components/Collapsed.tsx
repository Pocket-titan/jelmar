import styled from "styled-components";
import { type PropsWithChildren, type ReactNode, useState, CSSProperties } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSpring, animated, config } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "@ts/hooks";

const Container = styled.div`
  margin: 0.5em 0;
  padding: 0em 0.5em;

  border: 1px solid var(--color-gray-500);
  border-radius: 4px;
`;

const Wrapper = styled.div`
  padding: 0.5em 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Clip the text that overflows */
`;

const Button = styled.button`
  --color: var(--color-gray-900);

  font-size: 1.125rem;
  padding: 7px;
  width: calc(1.125rem + 7px * 2);
  height: calc(1.125rem + 7px * 2);

  flex-shrink: 0;
  background: none;

  cursor: pointer;
  transition: color 350ms ease 0s, border 350ms ease 0s;
  color: var(--color);
  border: 2px solid var(--color);
  border-radius: 4px;

  ${ButtonWrapper}:hover & {
    --color: var(--color-primary);
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const Icon = styled(FaChevronDown)<{ $isExpanded: boolean }>`
  will-change: transform;
  transform: ${({ $isExpanded }) => ($isExpanded ? "scaleY(-1)" : "none")};
  transition: transform 400ms ease 0s;
`;

const ContentWrapper = styled(animated.div)`
  will-change: height;
  overflow: hidden;
`;

const Content = styled.div`
  margin-top: 0.5em;
  padding-bottom: 0.5em;
`;

const Info = styled.em`
  color: var(--color-gray-800);
  font-size: 0.9rem;
  transition: color 350ms ease 0s, opacity 350ms ease 0s;
`;

const ActionWord = styled.span`
  color: var(--color-subtle-primary);
  transition: color 350ms ease 0s;
`;

const defaultInfo = (
  <>
    This content was hidden. <ActionWord>Click</ActionWord> to reveal it.
  </>
);

const MediaQuery = styled.div<{ $query: string }>`
  display: none;
  visibility: hidden;
  opacity: 0;

  @media ${({ $query }) => $query} {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;

const Collapsed = ({
  info = true,
  buttonStyle = {},
  outerStyle = {},
  innerStyle = {},
  children,
}: PropsWithChildren<{
  info?: boolean | ReactNode;
  buttonStyle?: CSSProperties;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
}>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [measureRef, { height }] = useMeasure();

  const styles = useSpring({
    config: config.default,
    from: {
      height: 0,
    },
    to: {
      height: isExpanded ? height : 0,
    },
  });

  return (
    <Container>
      <Wrapper style={outerStyle}>
        <ButtonWrapper
          onClick={() => setIsExpanded((prev) => !prev)}
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <Button style={buttonStyle}>
            <Icon $isExpanded={isExpanded} />
          </Button>
          {info && (
            <Info style={{ opacity: isExpanded ? 0 : 1 }}>
              <MediaQuery $query="(min-width: 450px)">
                {info === true ? defaultInfo : info}
              </MediaQuery>
              <MediaQuery $query="(max-width: 450px)">Show</MediaQuery>
            </Info>
          )}
        </ButtonWrapper>
        <ContentWrapper style={{ ...styles }}>
          <Content ref={measureRef} style={innerStyle}>
            {children}
          </Content>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Collapsed;
