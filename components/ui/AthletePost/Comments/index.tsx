import { Box } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { Else, If, Then } from "react-if";
import CommentField from "@/modules/athlete-profile/interactions/components/CommentField";
import { useCommentReply, useComments } from "@/libs/dtl/comment";
import Comments from "../../Comment/List";
import LoadMoreSkeleton from "../LoadMoreSkeleton";
import CommentItem from "../../Comment/Item";
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
}) => {
  const comments = useComments(id);
  const commentReply = useCommentReply();

  const createComment = useCallback(
    (content: string) => {
      return comments.create({
        post: id,
        content,
        parent: commentReply.comment?.id,
      });
    },
    [id, commentReply.comment]
  );

  const previewComments =
    comments.data.filter((comment) => !comment?.parent).slice(0, 3) ?? [];

  return (
    <Box className="comment-box">
      <If condition={isPreview}>
        <Then>
          {!!previewComments.length &&
            previewComments?.map?.((comment) => (
              <Box className="comment-box__preview" key={comment.id} py={2}>
                <CommentItem
                  actions={false}
                  comment={comment}
                  key={`comment_${comment.id}`}
                />
              </Box>
            ))}
        </Then>
        <Else>
          <Box position="relative" className="comment-box__detail">
            <Box pt={2} pb={{ base: 4, lg: "15px" }}>
              <Comments comments={comments.data}>
                <LoadMoreSkeleton pt={8} isShowLoadMore={comments.loading} />
              </Comments>

              <LoadMoreSkeleton pt={8} isShowLoadMore={comments.loading} />
            </Box>
            <Box bottom={0} py={{ base: 2, lg: 0 }}>
              <CommentField
                isLoading={comments.loading}
                onSubmitComment={createComment}
              />
            </Box>
          </Box>
        </Else>
      </If>
    </Box>
  );
};

export default AthleteInteractionComments;
