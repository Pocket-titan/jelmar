import styled from "styled-components";
import React, { PropsWithChildren } from "react";

const BlockQuote = styled.blockquote`
  border-left: 3px solid var(--color-primary);
  padding: 0.75em 1em;
  margin: 1em 0;
  background: var(--color-gray-100);
  border-radius: 4px;
  color: var(--color-text);
  font-style: italic;
  transition: background 350ms ease 0s, border-color 350ms ease 0s;
`;

const Quote = ({ children, ...props }: PropsWithChildren) => {
  return <BlockQuote> {children}</BlockQuote>;
};

export default Quote;
