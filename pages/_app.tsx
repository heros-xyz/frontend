import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import Head from "next/head";
import theme from "@/styles/themes/theme";
import { wrapper } from "@/store";

import "@/styles/scss/globals.scss";
import HerosLoading from "@/components/common/HerosLoading";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryParamProvider adapter={NextAdapter}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
            />
          </Head>
          <HerosLoading />
          <NextNProgress options={{ showSpinner: false }} />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionProvider>
    </QueryParamProvider>
  );
}

export default wrapper.withRedux(MyApp);
