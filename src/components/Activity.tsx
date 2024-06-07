import styled from "styled-components";
import Heading from "./Heading";
import { SHADOWS } from "@ts/theme";

const List = styled.div`
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
  background: var(--color-background);
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
      transform: scale(1.02);
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
  text-align: center;
`;

const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  if (date.toDateString() === currentDate.toDateString()) {
    return "Today";
  }

  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);
  if (date.toDateString() === yesterdayDate.toDateString()) {
    return "Yesterday";
  }

  const years = currentDate.getFullYear() - date.getFullYear();
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7 * 4)
  );
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

export { List, ListItem, Avatar, Entry, Title, DateString, formatDateString };
