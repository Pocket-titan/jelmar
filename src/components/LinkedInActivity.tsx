import styled from "styled-components";
import { List, Title, ListItem, Avatar, formatDateString } from "@components/Activity";

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
  align-items: unset;
  flex-direction: column;
  color: unset;

  span.link {
    color: var(--color-subtle-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 350ms ease 0s;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  margin-bottom: 0.6rem;
`;

const Left = styled.div``;

const Middle = styled.div`
  flex: 1;
`;

const Who = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Job = styled.span`
  color: var(--color-gray-700);
  font-size: 0.75rem;
`;

const When = styled.div`
  color: var(--color-gray-700);
  font-size: 0.75rem;
`;

const Right = styled.div``;

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

  console.log(post);

  return (
    <MyListItem href={postUrl} target="_blank">
      <Top>
        <Left>
          <Avatar height={40} width={40} src={bio.profile_picture} alt={bio.full_name} />
        </Left>
        <Middle>
          <Who>
            <Name>{bio.full_name}</Name>
            <Job>{bio.profile_description}</Job>
          </Who>
          <When>{formatDateString(post.post_date_time)}</When>
        </Middle>
        <Right>right</Right>
      </Top>
      <span dangerouslySetInnerHTML={{ __html: description }} />
      <div>
        <span>images?? too big, special case for: 1 img, 2, 3, 4, 5+ </span>
        {post.images.slice(0, 1).map((image) => (
          <img src={image} alt="image" />
        ))}
      </div>
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
