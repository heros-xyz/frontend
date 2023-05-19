import { Box, Flex } from "@chakra-ui/react";
import React, { LegacyRef, ReactNode } from "react";
import { Else, If, Then } from "react-if";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
import { useDevice } from "@/hooks/useDevice";
import { Comment } from "../List/index.stories";
import CommentItem from "../Item";
import SkeletonComments from "../SkeletonComments";

interface CommentsProps {
  comments: Partial<Comment>[];
  isLoading?: boolean;
  children?: ReactNode;
  ViewMoreComment?: ReactNode;
  scrollRef?: LegacyRef<HTMLDivElement>;
  onReply?: (value: IReplyingTo) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  isLoading,
  children,
  ViewMoreComment,
  scrollRef,
  onReply,
}) => {
  const { isMobile } = useDevice();
  return (
    <If condition={!isLoading}>
      <Then>
        <Flex
          maxH={{ lg: "60vh", xl: "65vh" }}
          minH={{ lg: "60vh", xl: "65vh" }}
          overflowY={{ lg: "auto" }}
          flexDirection="column"
          gap={{ base: 4, lg: 8 }}
          pt={2.5}
          pr={{ lg: 2 }}
          className={isMobile ? "" : "postComment"}
          ref={scrollRef}
        >
          {ViewMoreComment}
          {comments.map((item) => (
            <CommentItem
              key={item.id}
              commentId={item.id}
              isReply={!!item.parentComment}
              isAuthorComment={item.isAuthorComment}
              handleReply={() =>
                onReply &&
                onReply({
                  firstName: item.firstName || "",
                  lastName: item.lastName || "",
                  content: item.text || "",
                  id: item.id || "",
                  nickName: item?.nickName ?? "",
                })
              }
              item={item}
            />
          ))}
          <Box>{children}</Box>
        </Flex>
      </Then>
      <Else>
        <SkeletonComments />
      </Else>
    </If>
  );
};

export default Comments;
