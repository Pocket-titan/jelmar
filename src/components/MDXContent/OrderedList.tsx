import styled from "styled-components";
import React, { PropsWithChildren } from "react";

const Ol = styled.ol`
  list-style: decimal inside;
  margin-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 0;

  & li::marker {
    color: var(--color-gray-700);
    transition: color 350ms ease 0s;
  }

  li:not(:last-of-type) {
    margin-bottom: 0.5em;
  }
`;

const OrderedList = ({ children, ...props }: PropsWithChildren) => {
  return <Ol {...props}>{children}</Ol>;
};

export default OrderedList;
