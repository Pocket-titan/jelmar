import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import theme from "src/ts/theme";
import ConfigProvider from "src/components/ConfigProvider";
import GlobalStyle from "src/components/GlobalStyle";

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
