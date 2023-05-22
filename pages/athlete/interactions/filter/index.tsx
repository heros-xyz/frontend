import React, { ReactElement, useEffect, useState } from "react";
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
import { Waypoint } from "react-waypoint";
import { useUpdateEffect } from "react-use";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import AthletePost from "@/components/ui/AthletePost";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import { IInteractionItem } from "@/types/athlete/types";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { Close } from "@/components/svg/Close";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";

const InteractionsByTag = () => {
  const { data, loading } = useMyAthleteProfile();
  const status = loading ? "loading" : "";
  const session = { user: data };
  const router = useRouter();
  const { tag } = router.query;
  const [take] = useState(10);
  const [page, setPage] = useState(1);
  const [interactionsList, setInteractions] = useState<IInteractionItem[]>([]);

  const {
    data: interactionData,
    isLoading,
    isFetching,
  } = {
    data: { data: [], meta: { hasNextPage: false, totalCount: 0 } },
    isFetching: false,
    isLoading: false,
  };

  const onLoadMore = () => {
    if (interactionData?.meta?.hasNextPage && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  useUpdateEffect(() => {
    if (tag) {
      setPage(1);
      setInteractions([]);
    }
  }, [tag]);

  useEffect(() => {
    if (interactionData) {
      setInteractions((prevArr) => [...prevArr, ...interactionData.data]);
    }
  }, [interactionData]);

  const formatPropAthletePost = (postInfo: IInteractionItem) => {
    return {
      id: postInfo.id,
      menuList: [
        { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
        { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
      ],
      athleteInfo: {
        imagePath: session?.user?.avatar || "",
        athleteName: session?.user?.nickName ?? "",
        publishDate: postInfo.publicDate,
        id: session?.user?.id ?? "",
      },
      slideData: postInfo.interactionMedia ?? [],
      hashtag: postInfo.tags,
      socialOrder: true,
      postLikes: postInfo.reactionCount,
      postComments: postInfo.commentCount,
      postContent: postInfo.content,
      liked: postInfo.liked,
    };
  };

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
        <If condition={status !== "loading" && !isLoading}>
          <Then>
            <Flex
              flexDirection="column"
              gap={{ base: 0, lg: 12 }}
              position="relative"
            >
              {interactionsList.map((item) => (
                <Box key={item.id}>
                  <Box>
                    <AthletePost
                      isNavigate
                      isDetailPage={false}
                      interactionInfo={item}
                      onDeleted={router.reload}
                      onUpdated={router.reload}
                      {...formatPropAthletePost(item)}
                    >
                      <Box mt={{ base: 1, lg: 3 }}>
                        <AthleteInteractionComments id={item.id} isPreview />
                      </Box>
                    </AthletePost>
                    <Divider display={{ lg: "none" }} my={{ base: 6, lg: 8 }} />
                  </Box>
                </Box>
              ))}

              {interactionData?.meta?.hasNextPage && (
                <Waypoint onEnter={onLoadMore}>
                  <Box
                    className="post-load-more"
                    display="flex"
                    justifyContent="center"
                    mt={5}
                    w="full"
                  >
                    <PostSkeleton hasImage={false} w="full" />
                  </Box>
                </Waypoint>
              )}
            </Flex>
            <If condition={!interactionData?.data?.length}>
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
