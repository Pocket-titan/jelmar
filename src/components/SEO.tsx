import React from "react";
import Head from "next/head";
import { useConfig } from "./ConfigProvider";
import { DARK_COLORS, LIGHT_COLORS } from "@ts/theme";

const BASIC_DESCRIPTION = "Jelmar's personal website and blog.";

const SEO = ({
  title,
  seoTitle,
  description,
  darkColor = DARK_COLORS.background,
  lightColor = LIGHT_COLORS.background,
}: {
  title?: string;
  seoTitle?: string;
  description?: string;
  darkColor?: string;
  lightColor?: string;
}) => {
  const { colorMode } = useConfig();
  const color = colorMode === "dark" ? darkColor : lightColor;

  const metaTagTitle = title || "Jelmar.eu";
  const pageTitle = seoTitle || metaTagTitle;

  const metaTagDescription = description || BASIC_DESCRIPTION;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta key="description" name="description" content={metaTagDescription} />
      <meta key="theme-color" name="theme-color" content={color} />
    </Head>
  );
};

export default SEO;
