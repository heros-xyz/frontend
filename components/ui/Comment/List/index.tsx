import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
import { useDevice } from "@/hooks/useDevice";
import { Comment } from "@/libs/dtl/types";
import CommentItem from "../Item";
import SkeletonComments from "../SkeletonComments";

interface CommentsProps {
  comments?: Comment[];
  children?: ReactNode;
  onReply?: (value: IReplyingTo) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  children,
  onReply,
}) => {
  const { isMobile } = useDevice();
  if (!comments)
    return <SkeletonComments />
  return <Flex
          maxH={{ lg: "60vh", xl: "65vh" }}
          minH={{ lg: "60vh", xl: "65vh" }}
          overflowY={{ lg: "auto" }}
          flexDirection="column"
          gap={{ base: 4, lg: 8 }}
          pt={2.5}
          pr={{ lg: 2 }}
          className={isMobile ? "" : "postComment"}
        >
      {comments.map((item) => (
        <CommentItem
          key={item.id}
          comment={item}
        />
      ))}
      <Box>{children}</Box>
    </Flex>
};

export default Comments;
