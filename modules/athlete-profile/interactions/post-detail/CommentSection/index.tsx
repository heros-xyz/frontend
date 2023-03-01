import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import {
  useAddCommentInteractionMutation,
  useGetListCommentInteractionQuery,
} from "@/api/athlete";
import { useReplyCommentMutation } from "@/api/fan";
import CommentItem from "@/components/ui/Comment/Item";
import ReplyingComment from "../../components/ReplyingComment";
import { SocialInteraction } from "../../components/SocialInteraction/SocialInteraction";
import { IAthleteInteraction } from "../../constants";

export interface IReplyingTo {
  firstName: string;
  lastName: string;
  content: string;
  id: string;
}

const CommentSection: FC<IAthleteInteraction> = ({ reactionCount, liked }) => {
  const router = useRouter();
  const { view } = router.query;

  const [takeComment, setTakeComment] = useState(4);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [replyComment, replyCommentResponse] = useReplyCommentMutation();
  const [addComment, addCommentResponse] = useAddCommentInteractionMutation();
  const [isReplyingTo, setIsReplyingTo] = useState<IReplyingTo | undefined>(
    undefined
  );

  const {
    data: listComment,
    refetch,
    isLoading,
    isFetching,
  } = useGetListCommentInteractionQuery({
    interactionId: view as string,
    pageInfo: {
      page: 1,
      take: takeComment,
      order: "DESC",
    },
  });

  const handleCancelReply = () => {
    setIsReplyingTo(undefined);
  };

  const handleReply = (value: IReplyingTo) => {
    setIsReplyingTo(value);
    setIsFocusOnInput(true);
  };

  const handleFocusOnInput = (value: boolean) => {
    setIsFocusOnInput(value);
  };

  const handleFetchMoreComment = () => {
    setTakeComment((s) => s + 4);
  };

  const handleSubmitComment = (content: string) => {
    if (isReplyingTo) {
      const { id: commentId } = isReplyingTo;
      replyComment({
        interactionId: view,
        content,
        commentId,
      });
      return;
    }
    addComment({
      interactionId: view,
      content,
    });
  };

  useEffect(() => {
    if (addCommentResponse.isSuccess || replyCommentResponse.isSuccess) {
      setIsReplyingTo(undefined);
      refetch();
    }
  }, [addCommentResponse, replyCommentResponse]);

  if (!listComment) {
    return <></>;
  }

  return (
    <Flex flexDirection="column" position="relative">
      <Flex flexDirection="column">
        <SocialInteraction
          liked={liked}
          postId={view}
          reactionCount={reactionCount}
          commentsCount={listComment.meta.itemCount ?? 0}
          handleComment={() => handleFocusOnInput(true)}
        />
        <Flex
          py={4}
          overflowY="auto"
          flexDirection="column"
          maxHeight={{ lg: "580px" }}
          gap={{ base: 4, lg: 8 }}
        >
          {listComment?.data.map(
            ({
              id,
              liked,
              content,
              createdAt,
              parentComment,
              reactedCommentsCount,
              user: { avatar, firstName, lastName },
            }) => (
              <CommentItem
                key={id}
                commentId={id}
                handleReply={() =>
                  handleReply({
                    firstName,
                    lastName,
                    content,
                    id,
                  })
                }
                item={{
                  avatar,
                  name: firstName + " " + lastName,
                  likeCount: reactedCommentsCount,
                  text: content,
                  isLiked: liked,
                  parentComment,
                  createdAt,
                }}
              />
            )
          )}
          {listComment.meta.hasNextPage && (
            <Button
              alignSelf="baseline"
              variant="link"
              color="secondary"
              textDecoration="underline"
              textTransform="unset"
              mt={{ base: "5px", lg: "10px" }}
              fontSize={{ base: "12px", lg: "18px" }}
              fontWeight="bold"
              mb="6"
              cursor={isFetching ? "progress" : "pointer"}
              opacity={isFetching ? 0.5 : 1}
              onClick={() => {
                if (isFetching) return;
                handleFetchMoreComment();
              }}
            >
              View more comments
            </Button>
          )}
        </Flex>
      </Flex>

      <ReplyingComment
        isLoading={isLoading}
        isReplying={isReplyingTo}
        isFocused={isFocusOnInput}
        onCancelReply={handleCancelReply}
        onSubmitComment={handleSubmitComment}
        isUnfocused={() => handleFocusOnInput(false)}
      />
    </Flex>
  );
};

export default CommentSection;
