import styled from "styled-components";
import {
  FaLinkedin as LinkedInLogo,
  FaTwitter as TwitterLogo,
  FaGithub as GitHubLogo,
  FaEnvelope as EmailLogo,
} from "react-icons/fa";
import Link from "src/components/Link";
import { CSSProperties, PropsWithChildren, SVGAttributes } from "react";

const XLogo = (props: SVGAttributes<SVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" {...props}>
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const Wrapper = styled.div<{ $color: string; $hoverColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;

  svg {
    transition: fill 200ms ease 0s;
    fill: ${(p) => p.$color};
  }

  svg:hover {
    fill: ${(p) => p.$hoverColor};
  }
`;

const socials = [
  { icon: GitHubLogo, url: "https://github.com/Pocket-titan", alt: "My GitHub" },
  { icon: LinkedInLogo, url: "https://www.linkedin.com/in/jelmargerritsen/", alt: "My LinkedIn" },
  { icon: XLogo, url: "https://x.com/JelmarGerritsen", alt: "My X" },
  { icon: EmailLogo, url: "mailto:jelmargerritsen@gmail.com", alt: "Send me an email" },
];

const SocialLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 12px;
  }
`;

const Socials = ({
  children,
  style = {},
  color = "var(--color-gray-700)",
  hoverColor = "var(--color-gray-900)",
}: PropsWithChildren<{
  color?: string;
  hoverColor?: string;
  style?: CSSProperties;
}>) => {
  return (
    <Wrapper style={style} $color={color} $hoverColor={hoverColor}>
      {socials.map(({ icon: Icon, url, alt }) => (
        <SocialLink href={url} title={alt} key={alt}>
          <Icon aria-label={alt} />
        </SocialLink>
      ))}
      {children}
    </Wrapper>
  );
};

export default Socials;
