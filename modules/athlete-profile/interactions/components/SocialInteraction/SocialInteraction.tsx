import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
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
  const [isLiked, setIsLiked] = useState(liked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalReactions, setTotalReactions] = useState(reactionCount);
  const [request, { data }] = useReactionInteractionMutation();

  const { data: listComment } = useGetListCommentInteractionQuery({
    interactionId: postId,
    pageInfo: {
      take: 2,
      order: "DESC",
    },
  });

  useEffect(() => {
    !!data && setTotalReactions(data?.totalReaction);
  }, [data]);

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
      <Flex gap={5} my={{ base: "15px", lg: "20px" }} alignItems="center">
        <Button
          onClick={handleLike}
          style={{ all: "unset", cursor: "pointer" }}
        >
          <LoveIcon
            maxW={4}
            fill={isLiked ? "currentcolor" : "none"}
            color={isLiked ? "acccent.1" : "white"}
          />
        </Button>
        <Button
          onClick={handleComment}
          style={{ all: "unset", cursor: "pointer" }}
        >
          <CommentIcon maxW={4} />
        </Button>
        <Button onClick={onOpen} style={{ all: "unset", cursor: "pointer" }}>
          <ShareIcon maxW={4} />
        </Button>
      </Flex>
      <Text
        fontWeight="medium"
        mb={{ base: "5px", lg: "20px" }}
        fontSize={{ base: "xs", lg: "lg" }}
        color="acccent.1"
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
