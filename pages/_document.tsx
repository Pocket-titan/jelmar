import { ServerStyleSheet } from "styled-components";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
// @ts-expect-error
import script from "!!raw-loader!../src/ts/script/script.js";

const DarkModeScript = () => {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="/global.css" />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            id="icon-light-1"
            href="/favicon_light/apple-touch-icon.png"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            id="icon-light-2"
            href="/favicon_light/favicon-32x32.png"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            id="icon-light-3"
            href="/favicon_light/favicon-16x16.png"
            media="(prefers-color-scheme: light)"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            id="icon-dark-1"
            href="/favicon_dark/apple-touch-icon.png"
            media="(prefers-color-scheme: dark)"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            id="icon-dark-2"
            href="/favicon_dark/favicon-32x32.png"
            media="(prefers-color-scheme: dark)"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            id="icon-dark-3"
            href="/favicon_dark/favicon-16x16.png"
            media="(prefers-color-scheme: dark)"
          />

          {/* <meta
            key="theme_color_light"
            name="theme-color"
            content="#eff1f5"
            media="(prefers-color-scheme: light)"
          />
          <meta
            key="theme_color_dark"
            name="theme-color"
            content="#181d2a"
            media="(prefers-color-scheme: dark)"
          /> */}
        </Head>
        <noscript id="meta-tag-jail" />
        <body>
          <DarkModeScript />
          <div id="mobile-nav" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
