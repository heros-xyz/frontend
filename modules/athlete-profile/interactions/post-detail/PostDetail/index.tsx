import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetAthleteInteractionDetailQuery } from "@/api/fan";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import InteractionSection from "../../components/InteractionSection";
import CommentSection from "../CommentSection";

const PostDetail = () => {
  const router = useRouter();
  const { view: postId } = router.query;
  const { validateIsFan } = useAthleteProfile();
  const { data: interactionDetail } = useGetAthleteInteractionDetailQuery(
    postId as string,
    {
      refetchOnMountOrArgChange: true,
      skip: !postId,
    }
  );

  if (!interactionDetail) {
    return <></>;
  }

  return (
    <Box
      minH={{ base: "100vh", lg: "unset" }}
      h={{ lg: "100vh" }}
      maxH={{ lg: "100vh" }}
      bg="primary"
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
              color="white"
              position={{ lg: "sticky" }}
              top="0"
              pb={5}
              zIndex={10}
              bg="primary"
            >
              <ArrowLeft />
              <Text ml="20px" fontWeight="bold" fontSize="xl">
                Interaction
              </Text>
            </Flex>

            <Box mb={{ lg: "30px" }}>
              <InteractionSection
                validateIsFan={validateIsFan}
                isDetailView
                {...interactionDetail}
              />
            </Box>
          </Box>
          <Divider
            display={{ base: "none", lg: "block" }}
            mx="80px"
            orientation="vertical"
          />
          <Box flex={{ lg: "1" }}>
            <CommentSection {...interactionDetail} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PostDetail;
