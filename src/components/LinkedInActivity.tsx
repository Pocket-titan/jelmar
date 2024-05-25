import styled from "styled-components";
import { List, Title, ListItem } from "@components/Activity";

const LinkedInList = styled(List)`
  flex: 2;
`;

const LinkedInActivity = ({ posts, bio }: { posts: LinkedInPost[]; bio: LinkedInBio }) => {
  return (
    <LinkedInList>
      <Title type="small-title"> LinkedIn activity </Title>
      {posts.slice(0, 5).map((post) => (
        <Post post={post} bio={bio} key={post.id} />
      ))}
    </LinkedInList>
  );
};

const MyListItem = styled(ListItem)`
  flex-direction: column;

  span.link {
    color: var(--color-subtle-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 350ms ease 0s;
  }
`;

const Post = ({ post, bio }: { post: LinkedInPost; bio: LinkedInBio }) => {
  post.post_date_time;
  post.images;
  post.description;
  post.likes_count;
  post.comments_count;
  const postUrl = `https://www.linkedin.com/feed/update/urn:li:activity:${post.id}`;

  bio.username;
  bio.full_name;
  bio.profile_picture;
  const profileUrl = `https://www.linkedin.com/in/${bio.username}`;

  const description = post.description
    .replaceAll("<!---->", "")
    .replaceAll(/<a([^>]*)class="app-aware-link"([^>]*)>/g, "<span>")
    .replaceAll(/<a([^>]*)>/g, "<span class='link'>")
    .replaceAll(/<\/a>/g, "</span>");

  return (
    <MyListItem>
      <div>face</div>
      <span dangerouslySetInnerHTML={{ __html: description }} />
    </MyListItem>
  );
};

type LinkedInPost = {
  id: string;
  username: string;
  date_time: string;
  post_date_time: string;
  post_date: string;
  description: string;
  images: string[];
  images_sk_img: string[];
  thumbnail: string;
  thumbnail_url: string;
  thumbnail_sk_img: string;
  shared_post_owner_picture_sk_img: string;
  video_url: string;
  likes_count: string;
  comments_count: string;
  embed_source: string;
  shared_post_owner_picture: string;
  shared_post_owner_name: string;
  shared_post_owner_link: string;
  shared_post_description: string;
  shared_post_date: string;
  shared_post_owner_description: string;
  reposted: string;
  order: string;
};

type LinkedInBio = {
  profile_description: string;
  profile_picture: string;
  embed_id: string;
  username: string;
  full_name: string;
  followers_count: string;
};

export type { LinkedInPost, LinkedInBio };

export default LinkedInActivity;
