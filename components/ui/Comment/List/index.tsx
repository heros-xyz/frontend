import { Flex } from "@chakra-ui/react";
import React from "react";
import { Else, If, Then } from "react-if";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
import { useDevice } from "@/hooks/useDevice";
import { Comment } from "../List/index.stories";
import CommentItem from "../Item";
import SkeletonComments from "../SkeletonComments";

interface CommentsProps {
  comments: Comment[];
  isLoading?: boolean;
  onReply?: (value: IReplyingTo) => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  isLoading,
  onReply,
}) => {
  const { isMobile } = useDevice();
  return (
    <If condition={!isLoading}>
      <Then>
        <Flex
          maxH={{ lg: "580px" }}
          minH={{ lg: "550px" }}
          overflowY={{ lg: "auto" }}
          flexDirection="column"
          gap={{ base: 4, lg: 8 }}
          pt={2.5}
          className={isMobile ? "" : "postComment"}
        >
          {comments.map((item, index) => (
            <CommentItem
              key={`${"key" + index}`}
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
                  nickName: item.nickName,
                })
              }
              item={item}
            />
          ))}
        </Flex>
      </Then>
      <Else>
        <SkeletonComments />
      </Else>
    </If>
  );
};

export default Comments;
