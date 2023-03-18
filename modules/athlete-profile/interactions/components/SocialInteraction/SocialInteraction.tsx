import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
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
  postId?: string | string[];
  handleComment?: () => void;
}

export const SocialInteraction: FC<ISocialInteractionProps> = ({
  handleComment,
  commentsCount,
  reactionCount = 0,
  liked,
  postId,
}) => {
  const router = useRouter();
  const { view, id } = router.query;
  const iconActions = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(liked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalReactions, setTotalReactions] = useState(reactionCount);
  const [request, { data }] = useReactionInteractionMutation();

  const { data: listComment } = useGetListCommentInteractionQuery({
    interactionId: postId,
    pageInfo: {
      take: 3,
      order: "ASC",
      getReply: false,
    },
  });

  useEffect(() => {
    !!data && setTotalReactions(data?.totalReaction);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      if (iconActions && iconActions?.current && view) {
        iconActions.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 250);
  }, []);

  const handleLike = () => {
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
        gap={5}
        my={{ base: "15px", lg: "20px" }}
        alignItems="center"
        ref={iconActions}
      >
        <Button
          onClick={handleLike}
          style={{ all: "unset", cursor: "pointer" }}
        >
          <LoveIcon
            width={{ base: "24px", lg: "32px" }}
            height={{ base: "24px", lg: "32px" }}
            fill={isLiked ? "currentcolor" : "none"}
            color={isLiked ? "accent.5" : "primary"}
          />
        </Button>
        <Button
          onClick={handleComment}
          style={{ all: "unset", cursor: "pointer" }}
        >
          <CommentIcon
            width={{ base: "24px", lg: "32px" }}
            height={{ base: "24px", lg: "32px" }}
            color="primary"
          />
        </Button>
        <Button onClick={onOpen} style={{ all: "unset", cursor: "pointer" }}>
          <ShareIcon
            width={{ base: "24px", lg: "32px" }}
            height={{ base: "24px", lg: "32px" }}
            color="primary"
          />
        </Button>
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
          navigateToPostDetail={handleComment}
        />
      )}
    </>
  );
};
