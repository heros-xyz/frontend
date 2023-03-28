import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetAthleteInteractionDetailQuery } from "@/api/fan";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import SkeletonInteractionDetail from "@/modules/athlete-interaction/components/detail/SkeletonInteractionDetail";
import { IHerosError } from "@/types/globals/types";
import InteractionSection from "../../components/InteractionSection";
import CommentSection from "../CommentSection";
import NotFoundPage from "../../components/NotFound";

const PostDetail = () => {
  const router = useRouter();
  const { view: postId } = router.query;
  const { validateIsFan } = useAthleteProfile();
  const {
    data: interactionDetail,
    error,
    isSuccess,
    isLoading,
  } = useGetAthleteInteractionDetailQuery(postId as string, {
    refetchOnMountOrArgChange: true,
    skip: !postId,
  });

  if (isLoading) {
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

  if (
    error &&
    ((error as IHerosError).status === 404 ||
      (error as IHerosError).status === 500)
  ) {
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
          <Box overflowY={{ lg: "auto" }} flex={{ lg: "1" }}>
            <Flex
              as="a"
              onClick={router.back}
              cursor="pointer"
              alignItems="center"
              color="primary"
              position={{ lg: "sticky" }}
              top="0"
              pb={5}
              zIndex={10}
            >
              <ArrowLeft w="32px" h="32px" color="primary" />
              <Text ml="20px" fontWeight="bold" fontSize="xl">
                Interaction
              </Text>
            </Flex>

            {isSuccess ? (
              <Box mb={{ lg: "30px" }}>
                <InteractionSection
                  validateIsFan={validateIsFan}
                  isDetailView
                  {...interactionDetail}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Divider
            display={{ base: "none", lg: "block" }}
            mx="80px"
            orientation="vertical"
          />
          {isSuccess ? (
            <Box flex={{ lg: "1" }}>
              <CommentSection {...interactionDetail} />
            </Box>
          ) : (
            <></>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default PostDetail;
