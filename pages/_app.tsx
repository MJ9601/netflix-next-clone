import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>Netflix clone</title>
      </Head>

      <SessionProvider session={pageProps?.session}>
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
