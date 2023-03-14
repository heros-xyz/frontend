import React, { ReactElement, useState } from "react";
import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { useUnmount } from "react-use";
import { Waypoint } from "react-waypoint";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { HashTagIcon } from "@/components/svg/HashTagIcon";
import { PhotoIcon } from "@/components/svg/Photo";
import { resetApiState, useGetMyListInteractionsQuery } from "@/api/athlete";
import AthletePost from "@/components/ui/AthletePost";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import { IInteractionItem } from "@/types/athlete/types";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { setContext } from "@/libs/axiosInstance";
import { wrapper } from "@/store";
import { IGuards } from "@/types/globals/types";
import { athleteGuard } from "@/middleware/athleteGuard";

const Interactions = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [take] = useState(10);
  const [page, setPage] = useState(1);

  const {
    data: interactionData,
    isLoading,
    isFetching,
  } = useGetMyListInteractionsQuery(
    {
      page,
      take,
      order: "DESC",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onLoadMore = () => {
    if (interactionData?.meta?.hasNextPage && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  useUnmount(() => {
    dispatch(resetApiState());
  });

  const router = useRouter();
  const formatPropAthletePost = (postInfo: IInteractionItem) => {
    return {
      id: postInfo.id,
      menuList: [
        { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
        { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
      ],
      athleteInfo: {
        imagePath: session?.user?.avatar || "",
        athleteName: session?.user.nickname ?? "",
        publishDate: postInfo.createdAt,
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
    <Box bg="primary" minHeight="100vh">
      <Head>
        <title>Athlete | Interactions</title>
      </Head>
      <Container position="relative" size={["base", "sm", "md", "lg", "500px"]}>
        <Box h="88px" mx={{ base: -5, lg: 0 }} py={6} px={{ base: 5, lg: 0 }}>
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", lg: "2xl" }}
            color="white"
          >
            Interactions
          </Text>
        </Box>
        <Box
          py={4}
          px={5}
          mb={5}
          bg="acccent.4"
          cursor="pointer"
          mx={{ base: -5, lg: 0 }}
          rounded={{ lg: "xl" }}
          onClick={() => router.push("/athlete/interactions/post")}
        >
          <Text fontSize={{ base: "xs", lg: "lg" }} color="grey.300" mb={10}>
            {interactionData?.data?.length
              ? "Let your fans know what's on your mind."
              : "Add your first interaction."}
          </Text>
          <Box>
            <Flex alignItems="center" gap={6}>
              <PhotoIcon
                w={{ base: "20px", lg: "26px" }}
                h={{ base: "20px", lg: "26px" }}
              />
              <HashTagIcon
                w={{ base: "16px", lg: "21px" }}
                h={{ base: "16px", lg: "21px" }}
              />
            </Flex>
          </Box>
        </Box>
        <If condition={status !== "loading" && !isLoading}>
          <Then>
            <Flex
              flexDirection="column"
              pb={10}
              gap={{ base: 0, lg: 12 }}
              position="relative"
            >
              {interactionData?.data?.map((item) => (
                <Box key={item.id}>
                  <Box>
                    <AthletePost
                      isNavigate
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
                  You have not had any interactions. Start interacting with your
                  fans by sharing your thoughts, or just some daily updates!
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

export default Interactions;

Interactions.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
