import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Else, If, Then } from "react-if";
import { useSession } from "next-auth/react";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { useGetInteractionDetailQuery } from "@/api/athlete";
import AthletePost from "@/components/ui/AthletePost";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import SkeletonInteractionDetail from "@/modules/athlete-interaction/components/detail/SkeletonInteractionDetail";

const InteractionDetail = () => {
  const router = useRouter();
  const { id, focus } = router.query;
  const { data: session } = useSession();
  const [totalComments, setTotalComments] = useState(0);
  const [isFocusComment, setIsFocusComment] = useState(false);
  const {
    data: postInfo,
    isLoading,
    refetch,
  } = useGetInteractionDetailQuery(id as string, {
    skip: typeof id !== "string" || !Boolean(id),
  });

  const formatPropAthletePost = useMemo(
    () => ({
      id: postInfo?.id,
      menuList: [
        { id: "edit", itemName: "Edit", Icon: <EditIcon /> },
        { id: "delete", itemName: "Delete", Icon: <DeleteIcon /> },
      ],
      athleteInfo: {
        imagePath: postInfo?.user?.avatar || "",
        athleteName: session?.user?.nickname ?? "",
        publishDate: postInfo?.publicDate || postInfo?.createdAt,
        id: postInfo?.user?.id,
      },
      slideData: postInfo?.interactionMedia ?? [],
      socialOrder: true,
      hashtag: postInfo?.tags || [],
      postLikes: postInfo?.reactionCount || 0,
      postComments: totalComments || 0,
      postContent: postInfo?.content || "",
      liked: postInfo?.liked || false,
    }),
    [postInfo, totalComments]
  );

  useEffect(() => {
    if (focus) {
      setIsFocusComment(true);
    }
  }, [focus]);

  useEffect(() => {
    if (postInfo) {
      setTotalComments(postInfo.commentCount);
    }
  }, [postInfo]);

  return (
    <Box bg="white" minHeight="100vh" pb={8}>
      <Head>
        <title>Athlete | Interaction Details</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "xl"]}>
        <Box
          position={{ sm: "sticky", lg: "static" }}
          top={0}
          mx={{ base: -5, lg: 0 }}
          py={6}
          px={{ base: 5, lg: 0 }}
          zIndex={10}
        >
          <Flex
            alignItems="center"
            gap={3}
            cursor="pointer"
            onClick={() => router.push("/athlete/interactions")}
          >
            <ArrowLeft />
            <Text
              fontFamily="heading"
              fontSize={{ base: "xl", lg: "2xl" }}
              color="primary"
            >
              Interaction
            </Text>
          </Flex>
        </Box>
        <Box>
          <If condition={!isLoading && !!postInfo}>
            <Then>
              <AthletePost
                interactionInfo={postInfo}
                onUpdated={refetch}
                focusInputComment={setIsFocusComment}
                {...formatPropAthletePost}
              >
                <AthleteInteractionComments
                  id={id as string}
                  scrollToWhenCommented
                  focusComment={isFocusComment}
                  onUnFocusComment={setIsFocusComment}
                  setTotalComments={setTotalComments}
                />
              </AthletePost>
            </Then>
            <Else>
              <Box mt={2}>
                <SkeletonInteractionDetail />
              </Box>
            </Else>
          </If>
        </Box>
      </Container>
    </Box>
  );
};

export default InteractionDetail;
