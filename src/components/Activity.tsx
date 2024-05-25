import styled from "styled-components";
import Heading from "./Heading";
import { SHADOWS } from "@ts/theme";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  flex: 1;
`;

const ListItem = styled.a`
  font-size: 0.85rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  background: var(--color-muted-contrast);
  border-radius: 5px;
  box-shadow: ${SHADOWS.low}, 0px 0px 5px 3px hsl(var(--shadow-color) / 0.03);
  transition: box-shadow 350ms ease 0s, background 350ms ease 0s, transform 350ms ease 0s;
  text-decoration: none;
  cursor: default;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }

  ${({ href }) =>
    href !== undefined &&
    `
    cursor: pointer;

    &:hover {
      box-shadow: ${SHADOWS.medium}, 0px 0px 5px 3px hsl(var(--shadow-color) / 0.05);
      transform: scale(1.03);
    }
  `}
`;

const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 0.5rem;
  user-select: none;
`;

const Entry = styled.div`
  transition: color 350ms ease 0s;
  color: var(--color-gray-900);
  flex: 1;
`;

const Title = styled(Heading)`
  transition: color 350ms ease 0s;
  margin-bottom: 0.25em;
`;

const DateString = styled.div`
  font-size: 0.7rem;
  transition: color 350ms ease 0s;
  color: var(--color-gray-500);
`;

export { List, ListItem, Avatar, Entry, Title, DateString };
