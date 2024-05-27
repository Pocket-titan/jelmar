import styled from "styled-components";
import { FaLinkedin as LinkedInLogo, FaThumbsUp as ThumbsUp } from "react-icons/fa";
import { List, Title, ListItem, Avatar, formatDateString } from "@components/Activity";

const LinkedInList = styled(List)`
  flex: 1.5;
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
  padding: 1rem;

  span.link {
    color: var(--color-subtle-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 350ms ease 0s;
  }

  &:not(:last-child) {
    margin-bottom: 0.9rem;
  }
`;

const First = styled.div`
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

  display: flex;
  align-items: center;
`;

const Right = styled.div``;

const Second = styled.span`
  margin-bottom: 0.75rem;
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
    <MyListItem href={postUrl} target="_blank">
      <First>
        <Left>
          <Avatar height={40} width={40} src={bio.profile_picture} alt={bio.full_name} />
        </Left>
        <Middle>
          <Who>
            <Name>{bio.full_name}</Name>
            <Job>{bio.profile_description}</Job>
          </Who>
          <When>
            {formatDateString(post.post_date_time) + " •"}
            <LinkedInLogo
              style={{
                marginLeft: "0.2rem",
              }}
            />
          </When>
        </Middle>
        <Right>
          <Likes likes={post.likes_count} />
        </Right>
      </First>
      <Second dangerouslySetInnerHTML={{ __html: description }} />
      <Images images={post.images} />
    </MyListItem>
  );
};

const ImagesWrapper = styled.div<{ nrows: number; ncols: number }>`
  display: grid;
  grid-template-rows: repeat(${(p) => p.nrows}, auto);
  grid-template-columns: repeat(${(p) => p.ncols}, auto);
  height: auto;
  min-height: auto;
  max-height: 400px;
  overflow: clip;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 200px;
  height: 100%;
  width: 100%;
  overflow: clip;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const layouts: { [key: number]: (number | string)[][] } = {
  0: [],
  1: [[1, 1]],
  2: [
    [1, 1],
    [1, 2],
  ],
  3: [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  4: [
    [1, "1 / span 4"],
    [2, 1],
    [2, 2],
    [2, 3],
  ],
};

const Images = ({ images }: { images: string[] }) => {
  const nrows = Math.ceil(images.length / 3);
  const ncols = Math.min(images.length, 3);

  const layout = layouts[Math.min(images.length, 4)];

  return (
    <ImagesWrapper nrows={nrows} ncols={ncols}>
      {images.slice(0, 4).map((image, i) => (
        <ImageWrapper
          key={image}
          style={{
            gridRow: layout[i][0],
            gridColumn: layout[i][1],
          }}
        >
          <Image src={image} alt="image" />
        </ImageWrapper>
      ))}
    </ImagesWrapper>
  );
};

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gray-500);
  font-size: 0.8rem;
`;

const Likes = ({ likes }: { likes: string }) => {
  return (
    <LikesWrapper>
      <ThumbsUp
        style={{
          display: "inline",
          marginRight: "0.2rem",
          color: "var(--color-primary)",
        }}
      />
      <span>{likes}</span>
    </LikesWrapper>
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
