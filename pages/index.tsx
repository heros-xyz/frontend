import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Session } from "next-auth";
import DefaultLayout from "@/layouts/default";
import { wrapper } from "@/store";

import HomePageBanner from "@/components/ui/HomePage/HomePageBanner";
import { checkUserRoles } from "@/middleware/checkUserRoles";
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

export const getServerSideProps = wrapper.getServerSideProps(
  () => (context) => {
    return checkUserRoles(context, (session: Session | null) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
