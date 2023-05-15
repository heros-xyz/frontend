import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { If, Then } from "react-if";
import { useGetListCommentInteractionQuery } from "@/api/athlete";
import { useReactionInteractionMutation } from "@/api/fan";
import { CommentIcon } from "@/components/svg/social/CommentIcon";
import { LoveIcon } from "@/components/svg/social/LoveIcon";
import { ShareIcon } from "@/components/svg/social/ShareIcon";
import { PreviewComment } from "../PreviewComment";
import SocialSharingModal from "../SocialSharing";

interface ISocialInteractionProps {
  reactionCount: number;
  commentsCount?: number;
  liked: boolean;
  isAdmin?: boolean;
  postId?: string | string[];
  isInDetailPage?: boolean;
  handleComment?: (isFocus?: boolean) => void;
}

export const SocialInteraction: FC<ISocialInteractionProps> = ({
  handleComment,
  commentsCount,
  reactionCount = 0,
  isInDetailPage,
  liked,
  postId,
  isAdmin,
}) => {
  const router = useRouter();
  const { view, id, isFocus } = router.query;
  const iconActions = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(liked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalReactions, setTotalReactions] = useState(reactionCount);
  const [request, { data, isLoading: isReactionLoading }] =
    useReactionInteractionMutation();

  const { data: listComment } = useGetListCommentInteractionQuery(
    {
      interactionId: postId,
      pageInfo: {
        take: 3,
        order: "ASC",
        getReply: false,
        authorId: id as string,
      },
    },
    {
      skip: typeof id !== "string",
    }
  );

  useEffect(() => {
    !!data && setTotalReactions(data?.totalReaction);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      if (iconActions && iconActions?.current && view && isFocus) {
        iconActions.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
  }, []);

  const handleLike = () => {
    if (isReactionLoading) return;
    setIsLiked((prev) => !prev);
    request({
      interactionId: postId,
      reactionType: 1,
    });
  };

  return (
    <>
      <SocialSharingModal
        postId={postId as string}
        athleteId={id as string}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Flex
        columnGap={{ base: 3, lg: 5 }}
        mt={{ base: "15px", lg: "20px" }}
        mb={{ base: "5px", lg: "10px" }}
        alignItems="center"
        ref={iconActions}
      >
        <If condition={!isAdmin}>
          <Then>
            <Button
              onClick={handleLike}
              isDisabled={isAdmin}
              variant="unstyled"
              cursor={isAdmin ? "not-allowed" : "pointer"}
              minW="auto"
            >
              <LoveIcon
                width={{ base: "24px", lg: "32px" }}
                height={{ base: "24px", lg: "32px" }}
                fill={isLiked ? "currentcolor" : "none"}
                color={isLiked ? "accent.5" : "primary"}
              />
            </Button>
          </Then>
        </If>

        <If condition={!isInDetailPage || !isAdmin}>
          <Then>
            <Button
              onClick={() => handleComment && handleComment(true)}
              isDisabled={isAdmin && isInDetailPage}
              variant="unstyled"
              cursor={isAdmin && isInDetailPage ? "not-allowed" : "pointer"}
              minW="auto"
            >
              <CommentIcon
                width={{ base: "24px", lg: "32px" }}
                height={{ base: "24px", lg: "32px" }}
                color="primary"
              />
            </Button>
          </Then>
        </If>

        <If condition={!isAdmin}>
          <Then>
            <Button
              onClick={onOpen}
              variant="unstyled"
              isDisabled={isAdmin}
              cursor={isAdmin ? "not-allowed" : "pointer"}
              minW="auto"
            >
              <ShareIcon
                width={{ base: "24px", lg: "32px" }}
                height={{ base: "24px", lg: "32px" }}
                color="primary"
              />
            </Button>
          </Then>
        </If>
      </Flex>

      <Text
        fontWeight="medium"
        mb={{ base: "5px", lg: "20px" }}
        fontSize={{ base: "xs", lg: "lg" }}
        color="secondary"
      >
        {totalReactions} like(s), {commentsCount ?? listComment?.meta.itemCount}{" "}
        comment(s)
      </Text>
      {!view && (
        <PreviewComment
          item={listComment}
          navigateToPostDetail={() => handleComment && handleComment(false)}
        />
      )}
    </>
  );
};
