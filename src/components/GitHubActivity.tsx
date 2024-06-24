import styled from "styled-components";
import {
  List,
  Title,
  ListItem,
  Avatar,
  Entry,
  DateString,
  formatDateString,
} from "@components/Activity";

const GitHubList = styled(List)`
  flex: 1.3;
`;

const GitHubActivity = ({ events }: { events: GitHubEvent[] }) => {
  const filteredEvents = events
    .filter(({ type }) =>
      ["WatchEvent", "CreateEvent", "PushEvent"].includes(type)
    )
    .reduce((acc, curr) => {
      if (
        acc.length > 0 &&
        acc[acc.length - 1].type === "PushEvent" &&
        curr.type === "PushEvent" &&
        acc[acc.length - 1].repo.id === curr.repo.id &&
        new Date(curr.created_at).getTime() -
          new Date(acc[acc.length - 1].created_at).getTime() <
          24 * 60 * 60
      ) {
        acc[acc.length - 1] = {
          ...acc[acc.length - 1],
          payload: {
            ...acc[acc.length - 1].payload,
            commits: (acc[acc.length - 1] as PushEvent).payload.commits.concat(
              curr.payload.commits
            ),
          } as any,
        };
      } else {
        acc.push(curr);
      }

      return acc;
    }, [] as GitHubEvent[])
    .slice(0, 5);

  return (
    <GitHubList>
      <Title type="small-title"> GitHub activity </Title>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => <Event event={event} key={event.id} />)
      ) : (
        <em
          style={{
            color: "var(--color-gray-500)",
          }}
        >
          No recent activity
        </em>
      )}
    </GitHubList>
  );
};

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
        return `${repo.url
          .replace("api.", "")
          .replace("/repos", "")}/releases/${payload.ref_type}/${payload.ref}`;
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
            pushed {amount} commit{amount > 1 ? "s" : ""} to <Mono>{name}</Mono>
          </span>
        );
      }
      case "CreateEvent": {
        return (
          <span>
            created {event.payload.ref_type} {event.payload.ref} in{" "}
            <Mono>{name}</Mono>
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
            deleted {event.payload.ref_type} {event.payload.ref} in{" "}
            <Mono>{name}</Mono>
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
