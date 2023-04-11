import {
  Box,
  BoxProps,
  Flex,
  Image,
  Text,
  useOutsideClick,
  WrapItem,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import { isMobileOnly } from "react-device-detect";
import { useReactionCommentMutation } from "@/api/fan";
import { Heart } from "@/components/svg/CommentHeart";
import { CommentIcon } from "@/components/svg/CommentIcon";
import { Dots } from "@/components/svg/Dots";
import { ReplyIcon } from "@/components/svg/Reply";
import { getDateFromNow } from "@/utils/functions";
import { getImageLink } from "@/utils/link";
import { Comment } from "../List/index.stories";

const spin = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`;
interface CommentProps extends BoxProps {
  item: Comment;
  commentId?: string;
  isReply: boolean;
  isAuthorComment?: boolean;
  showActions?: boolean;
  handleReply?: () => void;
  onClickComment?: () => void;
}

const CommentItem: React.FC<CommentProps> = ({
  item,
  isAuthorComment,
  commentId,
  isReply,
  showActions = true,
  handleReply,
  onClickComment,
  ...props
}) => {
  const {
    query: { commentId: commentIdFocused },
  } = useRouter();
  const commentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimation, setAnimation] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(0);
  const [reactToComment, { isSuccess, data }] = useReactionCommentMutation();
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${spin} 3s ease-in-out`;

  const handleOpenReactions = () => {
    setIsVisible((prev) => !prev);
  };

  const handleReactToComment = () => {
    setIsVisible(false);
    setIsLiked((prev) => !prev);
    reactToComment({
      commentId,
      reactionCommentType: 1,
    });
  };

  useEffect(() => {
    setIsLiked(!!item.isLiked);
    setTotalLikes(item.likeCount || 0);
  }, [item]);

  useEffect(() => {
    if (isSuccess) {
      setTotalLikes(data?.totalReaction);
      setIsLiked(data?.type === "like" ? true : false);
    }
  }, [data]);

  useOutsideClick({
    ref: itemRef,
    handler: () => setIsVisible(false),
  });

  useEffect(() => {
    if (commentIdFocused && commentId && commentIdFocused === commentId) {
      setTimeout(() => {
        if (isMobileOnly) {
          const commentInputBoxHeight = 75;
          const offsetParent = commentRef.current?.offsetParent as HTMLElement;
          const offsetTop =
            (commentRef.current?.offsetTop ?? 0) +
            (offsetParent?.offsetTop ?? 0);
          const commentBoxHeight =
            commentRef.current?.getBoundingClientRect()?.height ?? 0;

          const top =
            offsetTop -
            window.innerHeight +
            commentInputBoxHeight +
            commentBoxHeight;

          window.scrollTo({
            top,
            behavior: "smooth",
          });
        } else {
          commentRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }
        setAnimation(true);
      }, 200);
    }
  }, [commentId, commentIdFocused]);

  return (
    <Box
      {...props}
      className="comment-item"
      ref={commentRef}
      animation={showAnimation ? animation : undefined}
    >
      <Flex
        alignItems="end"
        justifyContent={isReply ? "flex-end" : "flex-start"}
      >
        <WrapItem pr="2" order={isReply ? 2 : 1}>
          <Image
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
            src={getImageLink(item.avatar)}
            alt="avatar"
            rounded="full"
            objectFit="cover"
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
            onClick={onClickComment}
            cursor={!showActions ? "pointer" : ""}
            color="primary"
          >
            {item.parentComment && (
              <Box
                fontSize={["xs", "md"]}
                borderLeft="2px"
                borderColor="accent.2"
                px="1.5"
                my="1.5"
              >
                <Text color="accent.2" fontWeight="extrabold" className="name">
                  {item?.parentComment?.user?.role === "ATHLETE"
                    ? item.parentComment?.user?.nickName
                    : `${item?.parentComment?.user?.firstName} ${item?.parentComment?.user?.lastName}`}{" "}
                </Text>
                <Text color="grey.300" wordBreak="break-word">
                  {item.parentComment.content}
                </Text>
              </Box>
            )}
            <Flex justifyContent="space-between" alignItems="end">
              <Box color="primary" fontSize={["xs", "md"]} pr="3">
                <Text fontWeight="extrabold">
                  {item.nickName ?? `${item?.name}`}
                </Text>
                <Text wordBreak="break-word">{item.text}</Text>
              </Box>
              <Text
                as="span"
                color={"grey.300"}
                fontSize={["8px", "xs"]}
                whiteSpace="nowrap"
              >
                {getDateFromNow(item.createdAt)}
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
            {totalLikes != 0 && (
              <Box bg="accent.5" borderRadius="9" position="absolute" right="0">
                <Flex color="white" px="1.5" gap="0.5" pt="0.5" pb="0">
                  <Text fontSize="xs" fontWeight="bold">
                    {totalLikes}
                  </Text>
                  <Heart w={3.5} fill="currentcolor" />
                </Flex>
              </Box>
            )}
            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    ref={itemRef}
                    bg="primary"
                    borderRadius={["32", "xl"]}
                    position="absolute"
                    right={isReply ? "initial" : "-8"}
                    left={isReply ? "-8" : "initial"}
                    top="-2.5"
                    className="reactions"
                  >
                    <Flex px="3.5" py="2.5" justifyContent="center">
                      <ReplyIcon
                        role="button"
                        mr="1.5"
                        color="white"
                        onClick={() => {
                          handleReply && handleReply();
                          setIsVisible(false);
                        }}
                      />
                      <Text
                        as={"span"}
                        borderLeft="1px"
                        borderColor={"white"}
                      />
                      <Heart
                        role="button"
                        ml="1.5"
                        onClick={handleReactToComment}
                        color="white"
                        fill={isLiked ? "white" : "none"}
                      />
                    </Flex>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
          <If condition={showActions}>
            <Then>
              <Dots
                order={isReply ? 1 : 2}
                role="button"
                alignSelf="center"
                ml="1.5"
                mr={isReply ? 1.5 : 0}
                color="grey.100"
                onClick={handleOpenReactions}
              />
            </Then>
          </If>
        </Box>
      </Flex>
    </Box>
  );
};

export default CommentItem;
