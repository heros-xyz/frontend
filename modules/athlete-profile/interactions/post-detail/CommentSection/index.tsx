import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { If, Then } from "react-if";
import CommentItem from "@/components/ui/Comment/Item";
import { useComments } from "@/hooks/useComment";
import LoadMoreSkeleton from "@/components/ui/AthletePost/LoadMoreSkeleton";
import { useDevice } from "@/hooks/useDevice";
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
  const { isMobile } = useDevice();
  const { view: postId, id: authorId, focus } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    isFocusOnInput,
    isLoading,
    listComment,
    listMergedComments,
    replyingTo,
    isShowLoadMore,
    totalComments,
    take,
    setTake,
    handleSendMessage,
    replyComment,
    setOffset,
    setReplyingTo,
    setIsFocusOnInput,
  } = useComments({
    authorId: authorId as string,
    isPreview: false,
    interactionId: postId as string,
    isAthlete: false,
  });

  useEffect(() => {
    if (focus) {
      setIsFocusOnInput(true);
    }
  }, [focus]);

  const handleCancelReply = () => {
    setReplyingTo(undefined);
  };

  const handleReply = (value: IReplyingTo) => {
    setReplyingTo(value);
    setIsFocusOnInput(true);
  };

  const handleFocusOnInput = (value: boolean) => {
    setIsFocusOnInput(value);
  };

  const handleSubmitComment = (content: string) => {
    if (replyingTo) {
      const { id: commentId } = replyingTo;
      replyComment({
        interactionId: postId,
        content,
        commentId,
      });
      return;
    }
    handleSendMessage({
      interactionId: postId,
      content,
    });
  };

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
          commentsCount={totalComments ?? 0}
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
          {listMergedComments.map(
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
                isReply={!!parentComment}
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
          <If condition={!isMobile}>
            <Then>
              <LoadMoreSkeleton
                isShowLoadMore={isShowLoadMore}
                setOffset={() => {
                  setTake(20);
                  setOffset((offset) => offset + take);
                }}
              />
            </Then>
          </If>
        </Flex>
        <If condition={isMobile}>
          <Then>
            <LoadMoreSkeleton
              isShowLoadMore={isShowLoadMore}
              setOffset={() => {
                setTake(20);
                setOffset((offset) => offset + take);
              }}
            />
          </Then>
        </If>
      </Flex>

      <CommentField
        isLoading={isLoading}
        isReplying={replyingTo}
        isFocused={isFocusOnInput}
        onCancelReply={handleCancelReply}
        onSubmitComment={handleSubmitComment}
        isUnfocused={() => handleFocusOnInput(false)}
      />
    </Flex>
  );
};

export default CommentSection;
