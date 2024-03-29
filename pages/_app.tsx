import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider as ThemeProvider } from "@chakra-ui/react";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { If, Then } from "react-if";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import theme from "@/styles/themes/theme";
import { wrapper } from "@/store";

import "@/styles/scss/globals.scss";
import HerosLoading from "@/components/common/HerosLoading";
import { gaMeasurementId } from "@/utils/constants";
import { useEnv } from "@/hooks/useEnv";
import { AuthContextProvider } from "@/context/AuthContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { isProd } = useEnv();

  return (
    <QueryParamProvider adapter={NextAdapter}>
      <AuthContextProvider>
        <If condition={isProd}>
          <Then>
            <GoogleAnalytics gaMeasurementId={gaMeasurementId} />
          </Then>
        </If>
        <ThemeProvider theme={theme}>
          <HerosLoading />
          <NextNProgress options={{ showSpinner: false }} />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AuthContextProvider>
    </QueryParamProvider>
  );
}

export default wrapper.withRedux(MyApp);
