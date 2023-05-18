import { Box } from "@chakra-ui/react";
import Head from "next/head";
import PostDetail from "@/modules/athlete-profile/interactions/post-detail/PostDetail";

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
