import React from "react";
import Head from "next/head";
import { useConfig } from "./ConfigProvider";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";

const BASIC_DESCRIPTION = "Jelmar's personal website and blog.";

const PROD_URL = "https://www.jelmar.eu";

const SEO = ({
  title,
  seoTitle,
  description,
  ogImage,
  type = "website",
  darkColor = DARK_COLORS.background,
  lightColor = LIGHT_COLORS.background,
}: {
  title?: string;
  seoTitle?: string;
  description?: string;
  ogImage?: string;
  type?: string;
  darkColor?: string;
  lightColor?: string;
}) => {
  const { colorMode } = useConfig();
  const color = colorMode === "dark" ? darkColor : lightColor;

  const metaTagTitle = title || "Jelmar.eu";
  const pageTitle = seoTitle || metaTagTitle;

  const metaTagDescription = description || BASIC_DESCRIPTION;

  const image = PROD_URL + (ogImage || "/images/og-default.png");

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta key="description" name="description" content={metaTagDescription} />
      <meta key="theme-color" name="theme-color" content={color} />
      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta key="og:image" property="og:image" content={image} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="675" />
      <meta key="og:type" property="og:type" content={type} />
    </Head>
  );
};

export default SEO;
