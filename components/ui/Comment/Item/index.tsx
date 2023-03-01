import {
  Avatar,
  Box,
  Flex,
  Text,
  useOutsideClick,
  WrapItem,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useReactionCommentMutation } from "@/api/fan";
import { Heart } from "@/components/svg/CommentHeart";
import { CommentIcon } from "@/components/svg/CommentIcon";
import { Dots } from "@/components/svg/Dots";
import { ReplyIcon } from "@/components/svg/Reply";
import { getDateFromNow } from "@/utils/functions";
import { Comment } from "../List/index.stories";

interface CommentProps {
  item: Comment;
  commentId?: string;
  handleReply?: () => void;
}

const CommentItem: React.FC<CommentProps> = ({
  item,
  handleReply,
  commentId,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number | undefined>(0);
  const [reactToComment, { isSuccess, data }] = useReactionCommentMutation();

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

  return (
    <Box bg="primary">
      <Flex alignItems="end">
        <WrapItem pr="2">
          <Avatar size={["sm", "md"]} name="Ryan Florence" src={item.avatar} />
        </WrapItem>
        <Box
          bg={item?.parentComment?.content ? "acccent.1" : "acccent.4"}
          px="3"
          py="2"
          borderRadius="12"
          position="relative"
          zIndex="1"
        >
          {item.parentComment && (
            <Box
              fontSize={["xs", "md"]}
              borderLeft="2px"
              borderColor="acccent.2"
              px="1.5"
              my="1.5"
            >
              <Text color="acccent.2" fontWeight="extrabold">
                {item.parentComment.user.firstName +
                  " " +
                  item.parentComment.user.lastName}
              </Text>
              <Text color="grey.300">{item.parentComment.content}</Text>
            </Box>
          )}
          <Flex justifyContent="space-between" alignItems="end">
            <Box fontSize={["xs", "md"]} pr="3">
              <Text fontWeight="extrabold">{item.name}</Text>
              <Text>{item.text}</Text>
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
          <Box position="absolute" bottom="0" left="-2.5" zIndex="-1">
            <CommentIcon
              width="17"
              height="10"
              color={item?.parentComment?.content ? "acccent.1" : "acccent.4"}
            />
          </Box>
          {totalLikes != 0 && (
            <Box bg="error.dark" borderRadius="9" position="absolute" right="0">
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
                  bg="secondary"
                  borderRadius={["32", "xl"]}
                  position="absolute"
                  right="-8"
                  top="-2.5"
                >
                  <Flex px="3.5" py="2.5" justifyContent="center">
                    <ReplyIcon
                      role="button"
                      mr="1.5"
                      onClick={() => {
                        handleReply && handleReply();
                        setIsVisible(false);
                      }}
                    />
                    <Text
                      as={"span"}
                      borderLeft="1px"
                      borderColor={"primary"}
                    />
                    <Heart
                      role="button"
                      ml="1.5"
                      color="primary"
                      onClick={handleReactToComment}
                      fill={isLiked ? "primary" : "secondary"}
                    />
                  </Flex>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <Dots
          role="button"
          alignSelf="center"
          ml="1.5"
          onClick={handleOpenReactions}
        />
      </Flex>
    </Box>
  );
};

export default CommentItem;
