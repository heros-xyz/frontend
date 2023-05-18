import React, { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import { useSession } from "next-auth/react";
import { useGetInteractionDetailQuery } from "@/api/athlete";
import AthletePost from "@/components/ui/AthletePost";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import { EditIcon } from "@/components/svg/menu/EditIcon";
import { DeleteIcon } from "@/components/svg/menu/DeleteIcon";
import SkeletonInteractionDetail from "@/modules/athlete-interaction/components/detail/SkeletonInteractionDetail";
import BackButton from "@/components/ui/BackButton";
import { useGetAthleteProfile } from "@/libs/dtl/athleteProfile";
import { usePostAsMaker } from "@/libs/dtl/post";
import { useAuthContext } from "@/context/AuthContext";

interface InteractionDetailProps {
  id: string;
  href: string;
  isDetailPage?: boolean;
  onClose: () => void;
}

const InteractionDetail: React.FC<InteractionDetailProps> = ({
  id,
  href,
  isDetailPage,
  onClose,
}) => {
  const router = useRouter();
  const { focus } = router.query;
  const { userProfile } = useAuthContext();
  const { athleteProfile, loading: loadingAthleteProfile } =
    useGetAthleteProfile();
  const [totalComments, setTotalComments] = useState(0);
  const [isFocusComment, setIsFocusComment] = useState(false);
  /*
  const {
    data: postInfo,
    isLoading,
    refetch,
  } = useGetInteractionDetailQuery(id as string, {
    skip: typeof id !== "string" || !Boolean(id),
  });
  */
  console.log({ id });
  const { data: postInfo, loading: isLoading } = usePostAsMaker(id);
  console.log({ postInfo });

  const formatPropAthletePost = useMemo(
    () => ({
      id: postInfo?.id,
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
        publishDate: postInfo?.publicDate || postInfo?.createdAt,
        id: userProfile?.uid,
      },
      slideData: postInfo?.media?.map?.((item, index) => ({
        url: item?.url,
        type: item?.type,
        sortOrder: index,
      })),
      socialOrder: true,
      hashtag: postInfo?.tags || [],
      postLikes: postInfo?.reactionCount || 0,
      postComments: totalComments || 0,
      postContent: postInfo?.content || "",
      liked: postInfo?.liked || false,
    }),
    [postInfo, totalComments, id]
  );

  useEffect(() => {
    if (focus) {
      setIsFocusComment(true);
    }
  }, [focus]);

  useEffect(() => {
    if (postInfo) {
      setTotalComments(postInfo?.commentCount);
    }
  }, [postInfo]);

  const onClickBack = () => {
    onClose();
    if (isDetailPage) {
      router.push(href);
      return;
    }

    router.push(router.pathname, href, {
      shallow: true,
    });
  };

  if (!loadingAthleteProfile || isLoading) {
    return <></>;
  }

  return (
    <Container size={["base", "sm", "md", "lg", "xl"]}>
      <Box
        position={{ sm: "sticky", lg: "static" }}
        top={0}
        mx={{ base: -5, lg: 0 }}
        py={6}
        px={{ base: 5, lg: 0 }}
        zIndex={10}
        fontWeight="bold"
        bg="white"
      >
        <BackButton href={href} title="Interaction" onBack={onClickBack} />
      </Box>
      <Box>
        <If condition={!isLoading && !!postInfo}>
          <Then>
            <AthletePost
              interactionInfo={postInfo}
              onUpdated={() => {}}
              isDetailPage
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
  );
};

export default InteractionDetail;
