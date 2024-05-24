import styled from "styled-components";
import Heading from "./Heading";
import { SHADOWS } from "@ts/theme";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
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

const GitHubActivity = ({ events }: { events: GitHubEvent[] }) => {
  return (
    <List>
      <Title type="small-title"> GitHub activity </Title>
      {events
        .filter(({ type }) => ["WatchEvent", "CreateEvent", "PushEvent"].includes(type))
        .slice(0, 5)
        .map((event) => (
          <Event event={event} key={event.id} />
        ))}
    </List>
  );
};

const DateString = styled.div`
  font-size: 0.7rem;
  transition: color 350ms ease 0s;
  color: var(--color-gray-500);
`;

const Event = ({ event }: { event: GitHubEvent }) => {
  return (
    <ListItem href={getUrl(event)} target="_blank">
      <Avatar height={35} width={35} src={event.actor.avatar_url} />
      <Entry>{getEventText(event)}</Entry>
      <DateString>{formatDateString(event.created_at)}</DateString>
    </ListItem>
  );
};

const getUrl = ({ type, repo, payload }: GitHubEvent) => {
  try {
    switch (type) {
      case "WatchEvent":
        return repo.url.replace("api.", "").replace("/repos", "");
      case "PushEvent": {
        return payload.commits[0].url
          .replace("api.", "")
          .replace("/repos", "")
          .replace("commits", "commit");
      }
      case "CreateEvent": {
        return `${repo.url.replace("api.", "").replace("/repos", "")}/releases/${
          payload.ref_type
        }/${payload.ref}`;
      }
      default:
        return undefined;
    }
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const Mono = styled.span`
  font-family: monospace;
  background: var(--color-muted);
  border-radius: 3px;
  padding: 1px;
  transition: background 350ms ease 0s;
`;

const getEventText = (event: GitHubEvent) => {
  try {
    const name = (event.repo || "").name.replace("Pocket-titan/", "");

    switch (event.type) {
      case "PushEvent": {
        const amount = event.payload.commits.length || 1;

        return (
          <span>
            created {amount} commit{amount > 1 ? "s" : ""} in <Mono>{name}</Mono>
          </span>
        );
      }
      case "CreateEvent": {
        return (
          <span>
            created {event.payload.ref_type} {event.payload.ref} in <Mono>{name}</Mono>
          </span>
        );
      }
      case "WatchEvent": {
        return (
          <span>
            starred <Mono>{name}</Mono>
          </span>
        );
      }
      case "DeleteEvent": {
        return (
          <span>
            deleted {event.payload.ref_type} {event.payload.ref} in <Mono>{name}</Mono>
          </span>
        );
      }
      default: {
        return "did something";
      }
    }
  } catch (e) {
    console.error(e);
    return "did something";
  }
};

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

  const months = currentDate.getMonth() - date.getMonth();
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  const days = currentDate.getDate() - date.getDate();
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

type GitHubEvent = {
  id: string;
  actor: Actor;
  created_at: string;
  repo: Repo;
  public: boolean;
} & (PushEvent | CreateEvent | WatchEvent | DeleteEvent);

interface PushEvent {
  type: "PushEvent";
  payload: PushPayload;
}

interface CreateEvent {
  type: "CreateEvent";
  payload: CreatePayload;
}

interface WatchEvent {
  type: "WatchEvent";
  payload: WatchPayload;
  org: {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
}

interface DeleteEvent {
  type: "DeleteEvent";
  payload: DeletePayload;
}

interface Actor {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  url: string;
}

interface PushPayload {
  repository_id: number;
  push_id: number;
  size: number;
  distinct_size: number;
  ref: string;
  head: string;
  before: string;
  commits: Commit[];
}

interface CreatePayload {
  ref: string;
  ref_type: string;
  master_branch: string;
  description: string;
  pusher_type: string;
}

interface WatchPayload {
  action: string;
}

interface DeletePayload {
  ref: string;
  ref_type: string;
  pusher_type: string;
}

interface Commit {
  sha: string;
  author: Author;
  message: string;
  distinct: boolean;
  url: string;
}

interface Author {
  email: string;
  name: string;
}

export type { GitHubEvent };

export default GitHubActivity;
