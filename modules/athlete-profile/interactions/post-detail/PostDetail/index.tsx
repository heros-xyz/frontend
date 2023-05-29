import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import SkeletonInteractionDetail from "@/modules/athlete-interaction/components/detail/SkeletonInteractionDetail";
import { usePost } from "@/libs/dtl/post";
import InteractionSection from "../../components/InteractionSection";
import CommentSection from "../CommentSection";
import NotFoundPage from "../../components/NotFound";

const PostDetail = () => {
  const router = useRouter();

  const { view: postId, id: athleteId } = router.query;
  const post = usePost(postId as string|undefined);


  if (post.loading) {
    return (
      <Container
        size={["base", "sm", "md", "lg", "xl"]}
        pt={{ base: 6, lg: 12 }}
      >
        <Box mt={2}>
          <SkeletonInteractionDetail />
        </Box>
      </Container>
    );
  }

  if (post.error) {
    //TODO
    if (post.error === "NO TIENE SUSCRIPCIÓN") {
      router.push({
        pathname: `/fan/athlete-profile/[id]`,
        query: {
          id: athleteId,
          current: 1,
          showJoinNow: true,
        },
      });
    }
    return <></>
  }

  if (post.data === undefined) {
    return <NotFoundPage />;
  }

  return (
    <Box
      minH={{ base: "100vh", lg: "unset" }}
      h={{ lg: "100vh" }}
      maxH={{ lg: "100vh" }}
    >
      <Container
        h="full"
        pt={{ base: "20px", lg: "60px" }}
        pb={{ lg: "80px" }}
        size={["base", "sm", "md", "lg", "xl"]}
      >
        <Flex h="full" flexDirection={{ base: "column", lg: "row" }}>
          <Box
            overflowY={{ lg: "auto" }}
            flex={{ lg: "1" }}
            className="postComment"
          >
            <Flex
              as="a"
              onClick={router.back}
              cursor="pointer"
              alignItems="center"
              color="primary"
              position={{ lg: "sticky" }}
              top="0"
              pb={5}
              bg="white"
              zIndex={15}
            >
              <ArrowLeft
                color="primary"
                w={{ base: 6, lg: 6 }}
                h={{ base: 6, lg: 6 }}
              />
              <Text
                ml="20px"
                fontWeight="bold"
                fontSize={{ base: "xl", lg: "2xl" }}
              >
                Interaction
              </Text>
            </Flex>

            <Box mb={{ lg: "30px" }}>
              <InteractionSection
                post={post.data}
                isDetailView
              />
            </Box>
          </Box>
          <Divider
            display={{ base: "none", lg: "block" }}
            mx="80px"
            orientation="vertical"
          />
          <Box flex={{ lg: "1" }}>
            <CommentSection post={post.data} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PostDetail;
