import { Box, Hide, Show } from "@chakra-ui/react";
import React, { FC, useEffect, useMemo } from "react";
import { Else, If, Then } from "react-if";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CommentField from "@/modules/athlete-profile/interactions/components/CommentField";
import { useComments } from "@/hooks/useComment";
import { useDevice } from "@/hooks/useDevice";
import Comments from "../../Comment/List";
import LoadMoreSkeleton from "../LoadMoreSkeleton";
import CommentItem from "../../Comment/Item";
interface IAthleteInteractionCommentsProps {
  id: string;
  isPreview?: boolean;
  focusComment?: boolean;
  scrollToWhenCommented?: boolean;
  onUnFocusComment?: (value: boolean) => void;
  setTotalComments?: (value: number) => void;
}
const AthleteInteractionComments: FC<IAthleteInteractionCommentsProps> = ({
  id,
  isPreview,
  focusComment = false,
  onUnFocusComment,
  setTotalComments,
}) => {
  const { data: session } = useSession();
  const { isMobile } = useDevice();
  const router = useRouter();
  const {
    isFocusOnInput,
    isLoading,
    listMergedComments,
    replyingTo,
    isShowLoadMore,
    totalComments,
    scrollRef,
    take,
    handleSendMessage,
    replyComment,
    setOffset,
    setTake,
    setReplyingTo,
    setIsFocusOnInput,
  } = useComments({
    authorId: session?.user.id ?? "",
    isPreview,
    interactionId: id,
    isAthlete: true,
  });

  useEffect(() => {
    setIsFocusOnInput(focusComment);
  }, [focusComment]);

  useEffect(() => {
    if (totalComments && setTotalComments) {
      setTotalComments(totalComments);
    }
  }, [totalComments]);

  const onSendMessage = (content: string) => {
    if (replyingTo) {
      const { id: commentId } = replyingTo;
      replyComment({
        interactionId: id,
        content,
        commentId,
      });

      return;
    }
    handleSendMessage({
      interactionId: id as string,
      content,
    });
  };

  const formatDataComment = useMemo(() => {
    return (
      listMergedComments.map(
        ({
          id,
          user,
          content,
          reactedCommentsCount,
          parentComment,
          createdAt,
          liked,
          isAuthorComment,
        }) => ({
          id,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          text: content,
          avatar: user.avatar,
          likeCount: reactedCommentsCount,
          isLiked: liked,
          parentComment,
          createdAt: createdAt,
          isAuthorComment,
          nickName: user.nickName,
        })
      ) || []
    );
  }, [listMergedComments]);

  return (
    <Box className="comment-box">
      <If condition={isPreview}>
        <Then>
          {listMergedComments.map((item, index) => (
            <Box
              className="comment-box__preview"
              key={`${"key" + index}`}
              py={2}
            >
              <CommentItem
                showAcions={false}
                commentId={item.id}
                isReply={!!item.parentComment}
                isAuthorComment={item.isAuthorComment}
                item={{
                  id,
                  name: `${item.user.firstName} ${item.user.lastName}`,
                  firstName: item.user.firstName,
                  lastName: item.user.lastName,
                  text: item.content,
                  avatar: item.user.avatar,
                  likeCount: item.reactedCommentsCount,
                  isLiked: item.liked,
                  parentComment: item.parentComment,
                  createdAt: item.createdAt,
                  isAuthorComment: item.isAuthorComment,
                  nickName: item.user.nickName,
                }}
                onClickComment={() => {
                  router.push(`/athlete/interactions/${id}?focus=true`);
                }}
              />
            </Box>
          ))}
        </Then>
        <Else>
          <Box
            ref={scrollRef}
            position="relative"
            className="comment-box__detail"
          >
            <Box pt={{ base: 2, lg: 5 }} pb={{ base: 4, lg: "15px" }}>
              <Comments
                comments={formatDataComment}
                isLoading={isLoading}
                onReply={(value) => {
                  setReplyingTo(value);
                  setIsFocusOnInput(true);
                }}
              >
                <If condition={!isMobile}>
                  <Then>
                    <LoadMoreSkeleton
                      pt={8}
                      isShowLoadMore={isShowLoadMore}
                      setOffset={() => {
                        setTake(20);
                        setOffset((offset) => offset + take);
                      }}
                    />
                  </Then>
                </If>
              </Comments>
              <If condition={isMobile}>
                <Then>
                  <LoadMoreSkeleton
                    pt={8}
                    isShowLoadMore={isShowLoadMore}
                    setOffset={() => {
                      setTake(20);
                      setOffset((offset) => offset + take);
                    }}
                  />
                </Then>
              </If>
            </Box>
            <Box
              position="sticky"
              bottom={0}
              bg="white"
              alignItems="center"
              gap={4}
              py={{ base: 5, lg: 0 }}
              zIndex={10}
            >
              <CommentField
                isReplying={replyingTo}
                isLoading={isLoading}
                onSubmitComment={onSendMessage}
                isUnfocused={() => {
                  setIsFocusOnInput(false);
                  onUnFocusComment && onUnFocusComment(false);
                }}
                isFocused={isFocusOnInput}
                onCancelReply={() => setReplyingTo(undefined)}
              />
            </Box>
          </Box>
        </Else>
      </If>
    </Box>
  );
};

export default AthleteInteractionComments;
