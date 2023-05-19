import React, { ReactElement } from "react";
import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import Head from "next/head";
import { Waypoint } from "react-waypoint";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { HashTagIcon } from "@/components/svg/HashTagIcon";
import { PhotoIcon } from "@/components/svg/Photo";
import AthletePost from "@/components/ui/AthletePost";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import { IInteractionItem } from "@/types/athlete/types";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { useAuthContext } from "@/context/AuthContext";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";
import { usePostsAsMaker } from "@/libs/dtl/post";

const Interactions = () => {
  const { userProfile } = useAuthContext();
  const { athleteProfile, loading } = useGetAthleteProfile();
  const router = useRouter();
  /*
  const { hasNextPage, interactionsList, isLoading, onLoadMore } =
    useAthleteInteraction({
      isGetPublic: false,
      take: 10,
    });
    */
  const hasNextPage = false;
  const onLoadMore = () => {};
  const { data: interactionsList, loading: isLoading } = usePostsAsMaker();

  const formatPropAthletePost = (postInfo: IInteractionItem) => {
    return {
      id: postInfo.id,
      menuList: [
        { id: "edit", itemName: "Edit", Icon: <EditIcon color="primary" /> },
        {
          id: "delete",
          itemName: "Delete",
          Icon: <DeleteIcon color="primary" />,
        },
      ],
      athleteInfo: {
        imagePath: userProfile?.avatar || "",
        athleteName: athleteProfile?.nickName ?? "",
        publishDate: postInfo.publicDate,
        id: userProfile?.uid ?? "",
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

  if (loading || !userProfile || !athleteProfile || isLoading) {
    return <></>;
  }

  return (
    <Box minHeight="100vh">
      <Head>
        <title>Athlete | Interactions</title>
      </Head>
      <Container position="relative" size={["base", "sm", "md", "lg", "500px"]}>
        <Box h="88px" mx={{ base: -5, lg: 0 }} py={6} px={{ base: 5, lg: 0 }}>
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", lg: "2xl" }}
            color="primary"
            fontWeight="bold"
          >
            Interactions
          </Text>
        </Box>
        <Box
          py={{ base: 4, lg: 6 }}
          px={5}
          mb={5}
          bg="grey.0"
          cursor="pointer"
          mx={{ base: -5, lg: 0 }}
          rounded={{ lg: "xl" }}
          onClick={() => router.push("/athlete/interactions/post")}
        >
          <Text
            fontSize={{ base: "xs", lg: "lg" }}
            color="grey.300"
            mb={10}
            fontWeight={{ base: "normal", lg: "500" }}
          >
            {interactionsList.length
              ? "Let your fans know what's on your mind."
              : "Add your first interaction."}
          </Text>
          <Box>
            <Flex alignItems="center" gap={6}>
              <PhotoIcon
                w={{ base: "20px", lg: "26px" }}
                h={{ base: "20px", lg: "26px" }}
                color="primary"
              />
              <HashTagIcon
                w={{ base: "16px", lg: "21px" }}
                h={{ base: "16px", lg: "21px" }}
                color="primary"
              />
            </Flex>
          </Box>
        </Box>
        <If condition={status === "loading" || isLoading}>
          <Then>
            <PostSkeleton pb={12} />
            <PostSkeleton pb={12} />
            <PostSkeleton pb={12} />
          </Then>
          <Else>
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
                      interactionInfo={{
                        ...item,
                        isAccessRight: true, // TODO: check this
                        isSchedulePost: !!item?.schedule,
                        tags: item.tags as any,
                        commentCount: item?.commentCount ?? 0,
                        reactionCount: item?.reactionCount ?? 0,
                        liked: item?.liked ?? false,
                        isCurrentUserReacted: userProfile?.uid === item?.uid,
                        interactionMedia: item?.media.map((media, index) => ({
                          id: media.url,
                          url: media.url,
                          type: media.type,
                          sortOrder: index,
                        })),
                      }}
                      onDeleted={router.reload}
                      onUpdated={router.reload}
                      {...formatPropAthletePost({
                        ...item,
                        isCurrentUserReacted: false,
                        isAccessRight: true,
                        isSchedulePost: !!item?.schedule,
                        tags: item.tags as any,
                        commentCount: item?.commentCount ?? 0,
                        reactionCount: item?.reactionCount ?? 0,
                        liked: item?.liked ?? false,
                        interactionMedia: item?.media.map((media, index) => ({
                          type: media.type,
                          url: media.url,
                          sortOrder: index,
                        })),
                      })}
                    >
                      <Box mt={{ base: 1, lg: 3 }}>
                        <AthleteInteractionComments id={item?.id} isPreview />
                      </Box>
                    </AthletePost>
                    <Divider display={{ lg: "none" }} my={{ base: 6, lg: 8 }} />
                  </Box>
                </Box>
              ))}

              {hasNextPage && (
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
            <If condition={!interactionsList?.length}>
              <Then>
                <Text color="grey.300" fontSize={{ base: "xs", lg: "md" }}>
                  You have not had any interactions. Start interacting with your
                  fans by sharing your thoughts, or just some daily updates!
                </Text>
              </Then>
            </If>
          </Else>
        </If>
      </Container>
    </Box>
  );
};

export default Interactions;

Interactions.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
