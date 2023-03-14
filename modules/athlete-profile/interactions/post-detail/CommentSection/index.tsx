import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";

import {
  useAddCommentInteractionMutation,
  useGetListCommentInteractionQuery,
} from "@/api/athlete";
import { useReplyCommentMutation } from "@/api/fan";
import CommentItem from "@/components/ui/Comment/Item";
import CommentField from "../../components/CommentField";
import { SocialInteraction } from "../../components/SocialInteraction/SocialInteraction";
import { IAthleteInteraction } from "../../constants";

export interface IReplyingTo {
  firstName: string;
  lastName: string;
  content: string;
  id: string;
  nickName: string;
}

const CommentSection: FC<IAthleteInteraction> = ({ reactionCount, liked }) => {
  const router = useRouter();
  const { view: postId, id: authorId } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [takeComment, setTakeComment] = useState(10);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [isReplyingTo, setIsReplyingTo] = useState<IReplyingTo | undefined>(
    undefined
  );

  const [replyComment, replyCommentResponse] = useReplyCommentMutation();
  const [addComment, addCommentResponse] = useAddCommentInteractionMutation();

  const {
    data: listComment,
    refetch,
    isLoading,
    isFetching,
  } = useGetListCommentInteractionQuery({
    interactionId: postId as string,
    pageInfo: {
      page: 1,
      take: takeComment,
      order: "DESC",
      authorId: authorId as string,
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
    setTakeComment((s) => s + 10);
  };

  const handleSubmitComment = (content: string) => {
    if (isReplyingTo) {
      const { id: commentId } = isReplyingTo;
      replyComment({
        interactionId: postId,
        content,
        commentId,
      });
      return;
    }
    addComment({
      interactionId: postId,
      content,
    });
  };

  useEffect(() => {
    if (addCommentResponse.isSuccess || replyCommentResponse.isSuccess) {
      setIsReplyingTo(undefined);
      refetch();

      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [addCommentResponse, replyCommentResponse]);

  if (!listComment) {
    return <></>;
  }

  return (
    <Flex flexDirection="column" position="relative" ref={scrollRef}>
      <Flex flexDirection="column">
        <SocialInteraction
          liked={liked}
          postId={postId}
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
          className="postComment"
        >
          {listComment?.data.map(
            ({
              id,
              liked,
              content,
              createdAt,
              parentComment,
              reactedCommentsCount,
              isAuthorComment,
              user: { avatar, firstName, lastName, nickName },
            }) => (
              <CommentItem
                key={id}
                isAuthorComment={isAuthorComment}
                commentId={id}
                handleReply={() =>
                  handleReply({
                    firstName,
                    lastName,
                    content,
                    id,
                    nickName,
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
                  nickName,
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

      <CommentField
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
