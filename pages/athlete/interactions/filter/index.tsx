import React, { ReactElement } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import Head from "next/head";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import AthletePost from "@/components/ui/AthletePost";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { Close } from "@/components/svg/Close";
import { usePostsAsMaker } from "@/libs/dtl/post";

const InteractionsByTag = () => {
  const router = useRouter();
  const { tag } = router.query;

  const { data: interactionsList, loading: isLoading } = usePostsAsMaker(
    true,
    tag as string
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <Box minHeight="100vh">
      <Head>
        <title>Athlete | Interactions By Tag</title>
      </Head>
      <Container position="relative" size={["base", "sm", "md", "lg", "500px"]}>
        <Box
          mx={{ base: -5, lg: 0 }}
          py={{ base: 5, lg: 6 }}
          px={{ base: 5, lg: 0 }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", lg: "2xl" }}
            fontWeight="bold"
            color="primary"
          >
            Interactions
          </Text>
        </Box>
        <Text color="primary" mb={2.5} fontSize={{ base: "xs ", lg: "lg" }}>
          You are viewing the interactions with the tag:
        </Text>
        <Tag
          size={{ base: "sm", lg: "lg" }}
          borderRadius="full"
          variant="solid"
          bg="accent.2"
          mb={{ base: 0, lg: 12 }}
        >
          <TagLabel fontSize={{ base: "sm", lg: "lg" }} color="white">
            #{tag || " ... "}
            <Close
              width="9px"
              height="9px"
              ml="10px"
              cursor="pointer"
              onClick={() => router.push("/athlete/interactions")}
            />
          </TagLabel>
        </Tag>
        <Divider display={{ lg: "none" }} my={{ base: 7, lg: 12 }} />
        <If condition={!isLoading}>
          <Then>
            <Flex
              flexDirection="column"
              gap={{ base: 0, lg: 12 }}
              position="relative"
            >
              {interactionsList?.map?.((item) => (
                <Box key={item.id}>
                  <Box>
                    <AthletePost isNavigate id={item.id}>
                      <Box mt={{ base: 1, lg: 3 }}>
                        {/* <AthleteInteractionComments id={item.id} isPreview /> */}
                      </Box>
                    </AthletePost>
                    <Divider display={{ lg: "none" }} my={{ base: 6, lg: 8 }} />
                  </Box>
                </Box>
              ))}
            </Flex>
            <If condition={!interactionsList?.length}>
              <Then>
                <Text color="white" fontSize={{ base: "xs", lg: "md" }}>
                  You have not had any interactions with tag is{" "}
                  <Text as="b">{tag}</Text>
                </Text>
              </Then>
            </If>
          </Then>
          <Else>
            <PostSkeleton pb={12} />
            <PostSkeleton pb={12} />
            <PostSkeleton pb={12} />
          </Else>
        </If>
      </Container>
    </Box>
  );
};

export default InteractionsByTag;

InteractionsByTag.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
