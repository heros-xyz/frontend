import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import DefaultLayout from "@/layouts/default";

import HomePageBanner from "@/components/ui/HomePage/HomePageBanner";
export default function Home() {
  return (
    <Box className="home-page h-full flex flex-col">
      <Head>
        <title>Welcome to Heros</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePageBanner content="" title="" />
    </Box>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

