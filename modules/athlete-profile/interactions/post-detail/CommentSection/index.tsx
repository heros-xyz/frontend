import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { If, Then } from "react-if";
import CommentItem from "@/components/ui/Comment/Item";
import { useComments } from "@/hooks/useComments";
import LoadMoreSkeleton from "@/components/ui/AthletePost/LoadMoreSkeleton";
import { useDevice } from "@/hooks/useDevice";
import { useUser } from "@/hooks/useUser";
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
  const { isAdmin } = useUser();
  const { view: postId, id: authorId, focus } = router.query;

  const {
    isFocusOnInput,
    isLoading,
    listMergedComments,
    replyingTo,
    isShowLoadMore,
    totalComments,
    isLoadFirstComment,
    isLoadAllComment,
    scrollRef,
    handleRefetchTotalComment,
    handleSendMessage,
    replyComment,
    setReplyingTo,
    setIsFocusOnInput,
    onLoadMore,
    onLoadPrevious,
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

  return (
    <Flex flexDirection="column" position="relative">
      <Flex flexDirection="column">
        <SocialInteraction
          liked={liked}
          postId={postId as string}
          isAdmin={isAdmin}
          isInDetailPage
          reactionCount={reactionCount}
          commentsCount={totalComments ?? 0}
          handleComment={() => handleFocusOnInput(true)}
        />
        <Flex
          py={4}
          overflowY="auto"
          flexDirection="column"
          maxH={{ lg: "60vh", xl: "65vh" }}
          minH={{ lg: "60vh", xl: "65vh" }}
          gap={{ base: 4, lg: 8 }}
          ref={scrollRef}
          className="postComment"
        >
          <If condition={!isLoadFirstComment}>
            <Then>
              <Text
                color="primary"
                fontSize={{ base: "sm", lg: "md" }}
                textDecoration="underline"
                onClick={onLoadPrevious}
                pb={1}
                cursor="pointer"
                fontWeight={500}
              >
                View more comments
              </Text>
            </Then>
          </If>
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
                item={
                  {
                    avatar,
                    name: firstName + " " + lastName,
                    likeCount: reactedCommentsCount,
                    text: content,
                    isLiked: liked,
                    parentComment,
                    createdAt,
                    nickName,
                  } as any
                }
                refetchTotalComment={handleRefetchTotalComment}
                isAdmin={isAdmin}
              />
            )
          )}

          <LoadMoreSkeleton
            isShowLoadMore={Boolean(
              isShowLoadMore && !isLoadAllComment && !isMobile
            )}
            setOffset={onLoadMore}
          />
        </Flex>

        <LoadMoreSkeleton
          isShowLoadMore={Boolean(
            isShowLoadMore && !isLoadAllComment && isMobile
          )}
          setOffset={onLoadMore}
        />
      </Flex>

      <If condition={!isAdmin}>
        <Then>
          <CommentField
            isLoading={isLoading}
            isReplying={replyingTo}
            disabled={isAdmin}
            isFocused={isFocusOnInput}
            onCancelReply={handleCancelReply}
            onSubmitComment={handleSubmitComment}
            isUnfocused={() => handleFocusOnInput(false)}
          />
        </Then>
      </If>
    </Flex>
  );
};

export default CommentSection;
