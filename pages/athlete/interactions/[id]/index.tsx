import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getFocusComment, getRunningQueriesThunkAthlete } from "@/api/athlete";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";
import InteractionDetail from "@/modules/athlete-interaction/components/detail";

const InteractionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box bg="white" minHeight="100vh" pb={8}>
      <Head>
        <title>Athlete | Interaction Details</title>
      </Head>
      <InteractionDetail
        id={id as string}
        href="/athlete/interactions"
        isDetailPage
        onClose={() => {}}
      />
    </Box>
  );
};

export default InteractionDetailPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setContext(context);

    if (typeof context.query.commentId === "string") {
      store.dispatch(getFocusComment.initiate(context.query.commentId));
      await Promise.all(store.dispatch(getRunningQueriesThunkAthlete()));
    }

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
