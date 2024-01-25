import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script type="text/javascript" strategy="beforeInteractive" src="/script.js" />
        <div id="mobile-nav" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
