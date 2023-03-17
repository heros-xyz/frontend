import { Image, Box, Flex, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CommentField from "@/modules/athlete-profile/interactions/components/CommentField";
import { getImageLink } from "@/utils/link";
import { IResponseComment } from "@/types/athlete/types";
import { useComments } from "@/hooks/useComment";
import Comments from "../../Comment/List";
import LoadMoreSkeleton from "../LoadMoreSkeleton";
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
  const {
    isFocusOnInput,
    isLoading,
    listComment,
    listMergedComments,
    replyingTo,
    isShowLoadMore,
    totalComments,
    scrollRef,
    handleSendMessage,
    replyComment,
    setOffset,
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

  const getUserName = (item: IResponseComment) => {
    return item.user.nickName ?? `${item.user.firstName} ${item.user.lastName}`;
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
            <Box key={"key" + `${index}`} className="comment-box__preview">
              <Box
                color="grey.100"
                fontSize={{ base: "xs", lg: "md" }}
                my={{ base: 2, lg: 4 }}
              >
                <Flex alignItems="flex-start" gap={4}>
                  <Flex alignItems="center" gap={2.5}>
                    <Image
                      src={getImageLink(item.user.avatar)}
                      w={{ base: 5, lg: 8 }}
                      h={{ base: 5, lg: 8 }}
                      alt={item.user.avatar}
                      rounded="full"
                      fallbackSrc="https://via.placeholder.com/30"
                    />
                    <Text as="b">{getUserName(item)}</Text>
                  </Flex>
                  <Text wordBreak="break-word" flex={1} mt="1px">
                    {item.content}
                  </Text>
                </Flex>
              </Box>
            </Box>
          ))}
          <If
            condition={
              listComment?.meta?.itemCount && listComment?.meta?.itemCount > 2
            }
          >
            <Then>
              <Link href={`/athlete/interactions/${id}`}>
                <Text
                  color="secondary"
                  textDecoration="underline"
                  fontSize={{ base: "xs", lg: "lg" }}
                >
                  View all comments
                </Text>
              </Link>
            </Then>
          </If>
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
              />
              <LoadMoreSkeleton
                pt={8}
                isShowLoadMore={isShowLoadMore}
                setOffset={() => setOffset((offset) => offset + 10)}
              />
            </Box>
            <Box
              position="sticky"
              bottom={0}
              bg="primary"
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
