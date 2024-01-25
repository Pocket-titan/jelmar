import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@emotion/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import theme from "@ts/theme";
import ConfigProvider from "@app/components/ConfigProvider";
import GlobalStyle from "@components/GlobalStyle";
import "./global.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
