import { Box } from "@chakra-ui/react";
import Head from "next/head";
import PostDetail from "@/modules/athlete-profile/interactions/post-detail/PostDetail";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { fanAuthGuard } from "@/middleware/fanGuard";
import { IGuards } from "@/types/globals/types";

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
  () => (context) => {
    setContext(context);

    return fanAuthGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
