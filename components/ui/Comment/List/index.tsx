import { Flex } from "@chakra-ui/react";
import React from "react";
import { Else, If, Then } from "react-if";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
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
  return (
    <If condition={!isLoading}>
      <Then>
        <Flex
          maxH={{ lg: "550px" }}
          overflowY="auto"
          flexDirection="column"
          gap={{ base: 4, lg: 8 }}
          pt={2.5}
        >
          {comments.map((item, index) => (
            <CommentItem
              key={`${"key" + index}`}
              commentId={item.id}
              handleReply={() =>
                onReply &&
                onReply({
                  firstName: item.firstName || "",
                  lastName: item.lastName || "",
                  content: item.text || "",
                  id: item.id || "",
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
