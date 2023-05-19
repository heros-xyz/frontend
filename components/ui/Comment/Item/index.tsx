import {
  Box,
  BoxProps,
  Flex,
  Text,
  useOutsideClick,
  WrapItem,
  keyframes,
  usePrefersReducedMotion,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import { useReactionCommentMutation } from "@/api/fan";
import { Heart } from "@/components/svg/CommentHeart";
import { CommentIcon } from "@/components/svg/CommentIcon";
import { Dots } from "@/components/svg/Dots";
import { ReplyIcon } from "@/components/svg/Reply";
import { getDateFromNow } from "@/utils/time";
import { useDevice } from "@/hooks/useDevice";
import { useDeleteCommentMutation } from "@/api/admin";
import DeleteCommentModal from "@/components/modal/DeleteCommentModal";
import HerosImage from "@/components/common/HerosImage";
import { Comment, useComment } from "@/libs/dtl/comment";

const spin = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`;
interface CommentProps extends BoxProps {
  item: Partial<Comment>;
  commentId?: string;
  isReply: boolean;
  isAuthorComment?: boolean;
  showActions?: boolean;
  isAdmin?: boolean;
  handleReply?: () => void;
  onClickComment?: () => void;
  refetchTotalComment?: () => void;
}

const CommentItem: React.FC<CommentProps> = ({
  item,
  isAuthorComment,
  commentId,
  isReply,
  showActions = true,
  isAdmin,
  handleReply,
  onClickComment,
  ...props
}) => {
  const {
    query: { commentId: commentIdFocused },
    reload,
  } = useRouter();
  const { isMobile } = useDevice();
  const {
    isOpen: isOpenDeleteCommentModal,
    onOpen: onOpenDeleteCommentModal,
    onClose: onCloseDeleteCommentModal,
  } = useDisclosure();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showComment] = useState(true);
  const commentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimation, setAnimation] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(0);

  const [reactToComment, { isSuccess, data }] = useReactionCommentMutation();
  const [deleteComment, { data: deleteCommentData }] =
    useDeleteCommentMutation();

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

  const handleDeleteComment = () => {
    deleteComment(commentId as string);
  };

  useEffect(() => {
    setIsLiked(!!item.isLiked);
    setTotalLikes(item.likeCount || 0);
  }, [item]);

  useEffect(() => {
    if (deleteCommentData) {
      reload();
    }
  }, [deleteCommentData]);

  useEffect(() => {
    if (isSuccess) {
      setTotalLikes(data?.totalReaction);
      setIsLiked(data?.type === "like" ? true : false);
    }
  }, [data]);

  const { data: parentComment, loading: parentCommentLoading } = useComment(
    item.parent
  );

  useOutsideClick({
    ref: itemRef,
    handler: () => setIsVisible(false),
  });

  useEffect(() => {
    if (commentIdFocused && commentId && commentIdFocused === commentId) {
      setTimeout(() => {
        if (isMobile) {
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
  }, [commentId, commentIdFocused, isMobile]);

  if (!showComment) {
    return <></>;
  }

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
          <HerosImage
            src={item?.author?.avatar ?? ""}
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
            onClick={onClickComment}
            cursor={!showActions ? "pointer" : ""}
            color="primary"
          >
            {parentComment && !parentCommentLoading && (
              <Box
                fontSize={["xs", "md"]}
                borderLeft="2px"
                borderColor="accent.2"
                px="1.5"
                my="1.5"
              >
                <Text color="accent.2" fontWeight="extrabold" className="name">
                  {parentComment.author?.nickName}
                </Text>
                <Text color="grey.300" wordBreak="break-word">
                  {parentComment.content}
                </Text>
              </Box>
            )}
            <Flex justifyContent="space-between" alignItems="end">
              <Box color="primary" fontSize={["xs", "md"]} pr="3">
                <Text fontWeight="extrabold">
                  {item?.author?.nickName ?? ""}
                </Text>
                <Text wordBreak="break-word">{item.content}</Text>
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
                    className="comment-reactions"
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
                        mx="1.5"
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
          <If condition={showActions && !isAdmin}>
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
                onClick={onOpenDeleteCommentModal}
              />
            </Then>
          </If>
        </Box>
      </Flex>

      <DeleteCommentModal
        isOpen={isOpenDeleteCommentModal}
        onClose={onCloseDeleteCommentModal}
        handleDeleteComment={() => {
          handleDeleteComment();
          onCloseDeleteCommentModal();
        }}
      />
    </Box>
  );
};

export default CommentItem;
