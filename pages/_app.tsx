import { ReactElement, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import theme from "ts/theme";
import ConfigProvider, { swapMetaTags } from "components/ConfigProvider";
import GlobalStyle from "components/GlobalStyle";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  useEffect(() => {
    const maybeSwapMetaTags = () => {
      const root = window.document.documentElement;
      const isDark = root.getAttribute("data-color-mode") === "dark";

      if (!isDark) {
        return;
      }

      swapMetaTags();
    };

    maybeSwapMetaTags();

    router.events.on("routeChangeComplete", maybeSwapMetaTags);

    return () => {
      router.events.off("routeChangeComplete", maybeSwapMetaTags);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfigProvider>
          <GlobalStyle />
          <Component {...pageProps} />
          <Analytics />
        </ConfigProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
