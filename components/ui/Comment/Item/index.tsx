import { Box, CloseButton, Flex, Text, WrapItem } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import { Heart } from "@/components/svg/CommentHeart";
import { CommentIcon } from "@/components/svg/CommentIcon";
import { Dots } from "@/components/svg/Dots";
import { ReplyIcon } from "@/components/svg/Reply";
import { getDateFromNow } from "@/utils/time";
import HerosImage from "@/components/common/HerosImage";
import { useComment, useCommentReply } from "@/libs/dtl/comment";
import { usePost } from "@/libs/dtl/post";
import { CollectionPath, Comment } from "@/libs/dtl/types";
import { useReactions } from "@/libs/dtl/reaction";

interface CommentProps {
  comment: Comment;
  actions?: boolean;
  handleReply?: () => void;
}

const CommentItem: React.FC<CommentProps> = ({ comment, actions = true }) => {
  const commentReply = useCommentReply();
  const router = useRouter();
  const post = usePost(comment.post);
  const isReply = useMemo(() => comment.parent !== undefined, [comment.parent]);
  const parentComment = useComment(comment.parent);
  const isAuthorComment = useMemo(
    () => post.data && post.data.uid && post.data.uid === comment.author,
    [post, comment]
  );
  const reaction = useReactions(comment.id, CollectionPath.COMMENTS);
  const isAdmin = useMemo(() => false, []);
  const [showActions, setShowActions] = useState(false);

  return (
    <Box className="comment-item">
      <Flex
        alignItems="end"
        justifyContent={isReply ? "flex-end" : "flex-start"}
      >
        <WrapItem pr="2" order={isReply ? 2 : 1}>
          <HerosImage
            src={comment?.authorProfile.avatar}
            width={{ base: "32px", lg: "48px" }}
            height={{ base: "32px", lg: "48px" }}
          />
        </WrapItem>
        <Box
          zIndex="1"
          flex={1}
          justifyContent={isReply ? "flex-end" : "initial"}
          display={"flex"}
          order={isReply ? 1 : 2}
        >
          <Box
            w="fit-content"
            px="3"
            borderRadius="12"
            py="2"
            bg={isAuthorComment ? "accent.1" : "grey.0"}
            position="relative"
            className="reply-comment"
            order={isReply ? 2 : 1}
            mr={isReply ? 3 : 0}
            cursor={!actions ? "pointer" : ""}
            onClick={() =>
              router.push(`/athlete/interactions/${post?.data?.id}?focus=true`)
            }
            color="primary"
          >
            {parentComment.data && (
              <Box
                fontSize={["xs", "md"]}
                borderLeft="2px"
                borderColor="accent.2"
                px="1.5"
                my="1.5"
              >
                <Text color="accent.2" fontWeight="extrabold" className="name">
                  {parentComment.data.authorProfile.nickName}
                </Text>
                <Text color="grey.300" wordBreak="break-word">
                  {parentComment.data.content}
                </Text>
              </Box>
            )}
            <Flex justifyContent="space-between" alignItems="end">
              <Box color="primary" fontSize={["xs", "md"]} pr="3">
                <Text fontWeight="extrabold">
                  {comment.authorProfile?.nickName ?? ""}
                </Text>
                <Text wordBreak="break-word">{comment.content}</Text>
              </Box>
              <Text
                as="span"
                color={"grey.300"}
                fontSize={["8px", "xs"]}
                whiteSpace="nowrap"
              >
                {getDateFromNow(comment.createdAt.toDate())}
              </Text>
            </Flex>
            <If condition={isReply}>
              <Then>
                <Box
                  position="absolute"
                  bottom="-5px"
                  right="-2"
                  zIndex="-1"
                  transform={"rotate(-110deg);"}
                >
                  <CommentIcon
                    width="17"
                    height="10"
                    color={isAuthorComment ? "accent.1" : "grey.0"}
                  />
                </Box>
              </Then>
              <Else>
                <Box position="absolute" bottom="0" left="-2.5" zIndex="-1">
                  <CommentIcon
                    width="17"
                    height="10"
                    color={isAuthorComment ? "accent.1" : "grey.0"}
                  />
                </Box>
              </Else>
            </If>
            {comment.reactionsCount != 0 && (
              <Box bg="accent.5" borderRadius="9" position="absolute" right="0">
                <Flex color="white" px="1.5" gap="0.5" pt="0.5" pb="0">
                  <Text fontSize="xs" fontWeight="bold">
                    {comment.reactionsCount}
                  </Text>
                  <Heart w={3.5} fill="currentcolor" />
                </Flex>
              </Box>
            )}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    bg="primary"
                    borderRadius={["32", "xl"]}
                    position="absolute"
                    right={isReply ? "initial" : "-8"}
                    left={isReply ? "-8" : "initial"}
                    top="-2.5"
                    className="comment-reactions"
                  >
                    <Flex px="3.5" py="2.5" justifyContent="center">
                      <ReplyIcon
                        role="button"
                        mr="1.5"
                        color="white"
                        onClick={() => {
                          setShowActions((a) => !a);
                          commentReply.set(comment);
                        }}
                      />
                      <Text
                        as={"span"}
                        borderLeft="1px"
                        borderColor={"white"}
                      />
                      <Heart
                        role="button"
                        mx="1.5"
                        onClick={(ev) => {
                          ev.preventDefault();
                          setShowActions((a) => !a);
                          reaction.toggle();
                        }}
                        color="white"
                        fill={reaction.iLikeIt ? "white" : "none"}
                      />
                    </Flex>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
          <If condition={actions}>
            <Then>
              <Dots
                order={isReply ? 1 : 2}
                role="button"
                alignSelf="center"
                ml="1.5"
                mr={isReply ? 1.5 : 0}
                color="grey.100"
                onClick={() => setShowActions((a) => !a)}
              />
            </Then>
          </If>
          <If condition={isAdmin}>
            <Then>
              <CloseButton
                order={isReply ? 1 : 2}
                role="button"
                alignSelf="center"
                ml="2"
                mr={isReply ? 2 : 0}
                color="grey.100"
                size="sm"
                fontWeight="bold"
                bg="accent.2"
              />
            </Then>
          </If>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommentItem;
