import { Box } from "@chakra-ui/react";
import Head from "next/head";
import PostDetail from "@/modules/athlete-profile/interactions/post-detail/PostDetail";

export default function PostDetailPage() {
  return (
    <Box>
      <Head>
        <title>Interaction Details</title>
      </Head>
      <PostDetail />
    </Box>
  );
}
