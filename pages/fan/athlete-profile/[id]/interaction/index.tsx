import { Box } from "@chakra-ui/react";
import Head from "next/head";
import PostDetail from "@/modules/athlete-profile/interactions/post-detail/PostDetail";
import { wrapper } from "@/store";

import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";
import { getAthleteInteractionDetail, getRunningQueriesThunk } from "@/api/fan";
import { getFocusComment, getRunningQueriesThunkAthlete } from "@/api/athlete";
import { setTokenToStore } from "@/utils/auth";

export default function PostDetailPage() {
  return (
    <Box pb={{ base: 16, lg: 0 }}>
      <Head>
        <title>Interaction Details</title>
      </Head>
      <PostDetail />
    </Box>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    setTokenToStore(store, context);

    if (typeof context.query.view === "string") {
      store.dispatch(getAthleteInteractionDetail.initiate(context.query.view));
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
    }

    if (typeof context.query.commentId === "string") {
      store.dispatch(getFocusComment.initiate(context.query.commentId));
      await Promise.all(store.dispatch(getRunningQueriesThunkAthlete()));
    }

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
