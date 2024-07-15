import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import theme from "ts/theme";
import ConfigProvider from "components/ConfigProvider";
import GlobalStyle from "components/GlobalStyle";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
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
