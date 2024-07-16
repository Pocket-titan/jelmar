import type { InferGetStaticPropsType, GetStaticProps } from "next";
import styled from "styled-components";
import DefaultLayout from "src/layouts/DefaultLayout";
import MaxWidthWrapper from "@components/MaxWidthWrapper";
import GitHubActivity, { GitHubEvent } from "@components/GitHubActivity";
import Face from "components/Face";
import {
  BREAKPOINTS,
  BREAKPOINT_SIZES,
  DARK_COLORS,
  LIGHT_COLORS,
} from "ts/theme";
import Socials from "components/Socials";
import Link from "components/Link";
import _ from "lodash";
import { SVGAttributes } from "react";
import SpaceSvgs, { WAVE_HEIGHT } from "@components/SpaceSvgs";
import LinkedInActivity, {
  LinkedInBio,
  LinkedInPost,
} from "@components/LinkedInActivity";
import SEO from "@components/SEO";

const Main = styled.main`
  padding-top: 64px;
  padding-bottom: 16px;
  flex: 1;

  @media (${BREAKPOINTS.smAndSmaller}) {
    padding-top: 24px;
  }
`;

const First = styled.div`
  position: relative;
  padding-bottom: ${WAVE_HEIGHT}px;

  @media (${BREAKPOINTS.smAndSmaller}) {
  }
`;

const TwoColumns = styled(MaxWidthWrapper)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 32px;

  @media (${BREAKPOINTS.smAndSmaller}) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
`;

const Second = styled.div`
  background: var(--color-muted);
  min-height: 100%;
  transition: background 350ms ease 0s;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (${BREAKPOINTS.smAndSmaller}) {
    padding-left: 8px;
    padding-right: 8px;

    font-size: 1.1rem;
  }
`;

const Greeting = styled.h1`
  position: relative;

  @keyframes slideInFromLeft {
    0% {
      background-size: 100% 0.2em, 0 0.2em;
    }
    100% {
      background-size: 0 0.2em, 100% 0.2em;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 95%;
    width: 110%;
    left: -5%;
    height: 5px;
    border-radius: 2px;
    background: none,
      linear-gradient(
        111.3deg,
        var(--color-primary) 9.6%,
        var(--color-secondary) 93.6%
      );
    background-size: 100% 0.2em, 0 0.2em;
    background-position: 100% 100%, 0 100%;
    background-repeat: no-repeat;
    /* transition: background-size 350ms ease 0s; */
    animation: slideInFromLeft 600ms cubic-bezier(0.65, 0, 0.35, 1) 500ms 1
      normal forwards;
    /* transition: background 350ms ease 0s; */
    /* transition --color-primary 350ms ease 0s, --color-secondary 350ms ease 0s; */
  }
`;

const UnderlinedLink = styled(Link)`
  color: var(--color-subtle-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-subtle-primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;

  &:hover {
    color: var(--color-primary);
    text-decoration-color: var(--color-primary);
  }

  transition: color 350ms ease 0s, text-decoration-color 350ms ease 0s;
`;

const Arrow = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 800 800"
    {...props}
  >
    <g
      strokeWidth="10"
      stroke="var(--color-gray-400)"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      // transform="matrix(-0.5150380749100543,0.8571673007021123,-0.8571673007021123,-0.5150380749100543,785.8821502448666,263.14830968317676)"
    >
      <path
        d="M 1209 0 Q 693 702 450 400.6022"
        markerEnd="url(#SvgjsMarker1999)"
      ></path>
    </g>
    <defs>
      <marker
        markerWidth="7"
        markerHeight="7"
        refX="3.5"
        refY="3.5"
        viewBox="0 0 7 7"
        orient="auto"
        id="SvgjsMarker1999"
      >
        <polyline
          points="0,3.5 3.5,1.75 0,0"
          fill="none"
          strokeWidth="1.1666666666666667"
          stroke="var(--color-gray-400)"
          strokeLinecap="round"
          transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
          strokeLinejoin="round"
        ></polyline>
      </marker>
    </defs>
  </svg>
);

const ContactMe = styled.div`
  display: none;

  @media (max-width: 400px) {
    display: none;
  }

  @media (min-width: 400px) and (max-width: ${BREAKPOINT_SIZES.sm}px) {
    display: block;
  }

  @media (min-width: 950px) {
    display: block;
  }
`;

const ContactText = styled.span`
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  position: absolute;
  right: 0;
  top: 0;
  transform: scale(calc(1 / 1.2)) translate(158%, -65%) rotate(10deg);
  font-size: 13px;
  color: var(--color-gray-400);
`;

const Feeds = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5em;

  @media (${BREAKPOINTS.mdAndSmaller}) {
    flex-direction: column;
    gap: 0.75em;
  }
`;

const Home = ({
  events,
  posts,
  bio,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        darkColor={DARK_COLORS.background}
        lightColor={LIGHT_COLORS.background}
      />
      <DefaultLayout
        childStyles={{ display: "flex" }}
        footerStyles={{
          background: "var(--color-muted)",
          color: "var(--color-gray-600)",
        }}
      >
        <Main>
          <First>
            <TwoColumns>
              <Left>
                <Face />
                <Socials
                  style={{
                    marginTop: 24,
                    transform: "scale(1.2)",
                    position: "relative",
                  }}
                >
                  <ContactMe>
                    <Arrow
                      width={150}
                      height={150}
                      style={{
                        position: "absolute",
                        pointerEvents: "none",
                        right: 0,
                        top: 0,
                        transform:
                          "scale(calc(1/1.2)) translate(53%, -45%) rotate(-15deg)",
                      }}
                    />
                    <ContactText>contact me!</ContactText>
                  </ContactMe>
                </Socials>
              </Left>
              <Right>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Greeting>hi!</Greeting>
                </div>
                <div>
                  My name is Jelmar. I'm currently finishing up a MSc in
                  Aerospace Engineering at TU Delft in the Netherlands. I'm
                  passionate about science and software engineering. Have a look
                  at some of the{" "}
                  <UnderlinedLink href="/projects">projects</UnderlinedLink>{" "}
                  I've done, or see my{" "}
                  <UnderlinedLink href="/blog">blog</UnderlinedLink> if you're
                  interested in my writings.
                </div>
              </Right>
            </TwoColumns>

            <div
              style={{
                // overflow: "hidden",
                // overflowX: "hidden",
                display: "block",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                transform: "translateY(1px)",
              }}
            >
              <svg
                preserveAspectRatio="none"
                viewBox="0 0 1703 100"
                width={1703}
                height={WAVE_HEIGHT}
                id="wave"
                style={{
                  position: "absolute",
                  left: "-3%",
                  right: "-3%",
                  bottom: 0,
                  width: "106%",
                  minWidth: 800,
                  maxWidth: "unset",
                  transition: `fill 350ms ease 0s`,
                  fill: "var(--color-muted)",
                }}
              >
                <path
                  fillOpacity="1"
                  d={
                    "M 0 26.7 L 90 37.4 C 180 47.7 360 69.7 540 58.7 C 720 47.7 900 5.7 1080 0 C 1260 -5.3 1440 26.7 1620 48 C 1800 69.7 1980 79.7 2070 85.4 L 2160 90.7 L 2160 100 L 2070 100 C 1980 100 1800 100 1620 100 C 1440 100 1260 100 1080 100 C 900 100 720 100 540 100 C 360 100 180 100 90 100 L 0 100 Z"
                  }
                ></path>
              </svg>
            </div>

            <SpaceSvgs />
          </First>

          <Second>
            <MaxWidthWrapper>
              <Feeds>
                <GitHubActivity events={events} />
                <LinkedInActivity posts={posts} bio={bio} />
              </Feeds>
            </MaxWidthWrapper>
          </Second>
        </Main>
      </DefaultLayout>
    </>
  );
};

async function fetchGithub() {
  try {
    const data = await fetch(
      `https://api.github.com/users/pocket-titan/events`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );
    const events = (await data.json()) as GitHubEvent[];
    return events;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchLinkedIn() {
  try {
    const feed = await fetch("https://data.accentapi.com/feed/25417027.json");
    const json = await feed.json();
    const posts = (json.posts || []) as LinkedInPost[];
    const bio = (json.bio || {}) as LinkedInBio;
    return { posts, bio };
  } catch (err) {
    console.error(err);
    return {
      posts: [] as LinkedInPost[],
      bio: {} as LinkedInBio,
    };
  }
}

export const getStaticProps = (async (context) => {
  const events = await fetchGithub();

  const { posts, bio } = await fetchLinkedIn();

  return {
    props: { events, posts, bio },
  };
}) satisfies GetStaticProps<any, any>;

export default Home;
