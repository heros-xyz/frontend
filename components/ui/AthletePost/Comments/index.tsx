import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import Link from "next/link";
import {
  useAddCommentInteractionMutation,
  useGetListCommentInteractionQuery,
} from "@/api/athlete";
import ReplyingComment from "@/modules/athlete-profile/interactions/components/ReplyingComment";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
import { useReplyCommentMutation } from "@/api/fan";
import Comments from "../../Comment/List";
interface IAthleteInteractionCommentsProps {
  id: string;
  isPreview?: boolean;
}
const AthleteInteractionComments: FC<IAthleteInteractionCommentsProps> = ({
  id,
  isPreview,
}) => {
  const scrollRef = useRef<any>();
  const [totalView, setTotalView] = useState<number>(4);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | undefined>(
    undefined
  );
  const [handleSendMessage, { data: sendMessageRespone }] =
    useAddCommentInteractionMutation();
  const [replyComment, { data: replyCommentResponse }] =
    useReplyCommentMutation();

  const {
    data: listComment,
    refetch,
    isLoading,
  } = useGetListCommentInteractionQuery(
    {
      interactionId: id,
      pageInfo: {
        take: isPreview ? 2 : totalView,
        ...(isPreview && { take: 2 }),
        order: "DESC",
      },
    },
    {
      skip: typeof id !== "string",
    }
  );

  useEffect(() => {
    if (sendMessageRespone || sendMessageRespone) {
      refetch();
      setReplyingTo(undefined);
      setIsFocusOnInput(false);
      window.scrollTo({
        top: scrollRef?.current?.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }, [sendMessageRespone, replyCommentResponse]);

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

  const handleFocusOnInput = (value: boolean) => {
    setIsFocusOnInput(value);
  };

  const formatDataComment = useMemo(() => {
    return (
      listComment?.data.map(
        ({
          id,
          user,
          content,
          reactedCommentsCount,
          parentComment,
          createdAt,
          liked,
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
        })
      ) || []
    );
  }, [listComment]);

  return (
    <Box>
      <If condition={isPreview}>
        <Then>
          {listComment?.data.map((item, index) => (
            <Box key={"key" + `${index}`}>
              <Box
                color="grey.100"
                fontSize={{ base: "xs", lg: "md" }}
                my={{ base: 2, lg: 4 }}
              >
                <Flex alignItems="center" gap={4}>
                  <Flex alignItems="center" gap={2.5}>
                    <Avatar
                      src={item.user.avatar}
                      name={item.user.avatar}
                      w={{ base: 5, lg: 8 }}
                      h={{ base: 5, lg: 8 }}
                    />
                    <Text as="b">{`${item.user.firstName} ${item.user.lastName}`}</Text>
                  </Flex>
                  <Text>{item.content}</Text>
                </Flex>
              </Box>
            </Box>
          ))}
          <If condition={listComment?.data.length}>
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
          <Box ref={scrollRef} position="relative">
            <Box pt={{ base: 2, lg: 5 }} pb={{ base: 4, lg: "30px" }}>
              <Comments
                comments={formatDataComment}
                isLoading={isLoading}
                onReply={(value) => {
                  setReplyingTo(value);
                  setIsFocusOnInput(true);
                }}
              />
              <If
                condition={
                  listComment?.totalComments &&
                  listComment?.totalComments > totalView
                }
              >
                <Then>
                  <Text
                    role="button"
                    color="secondary"
                    textDecoration="underline"
                    fontSize={{ base: "xs", lg: "lg" }}
                    mt={{ base: 5, lg: 8 }}
                    onClick={() => setTotalView(totalView + 4)}
                  >
                    View more comments
                  </Text>
                </Then>
              </If>
            </Box>
            <Box
              position="sticky"
              bottom={0}
              bg="primary"
              alignItems="center"
              gap={4}
              py={5}
              zIndex={10}
            >
              <ReplyingComment
                isReplying={replyingTo}
                isLoading={isLoading}
                onSubmitComment={onSendMessage}
                isUnfocused={() => handleFocusOnInput(false)}
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
