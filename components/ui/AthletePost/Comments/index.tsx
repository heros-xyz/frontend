import { Box, Text } from "@chakra-ui/react";

import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Else, If, Then } from "react-if";
import { useRouter } from "next/router";
import CommentField from "@/modules/athlete-profile/interactions/components/CommentField";
import { useDevice } from "@/hooks/useDevice";
import { useComments } from "@/libs/dtl/comment";
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
  focusComment = false,
  onUnFocusComment,
  setTotalComments,
}) => {
  const { isMobile } = useDevice();
  const router = useRouter();
  const comments = useComments(id)

  const createComment = useCallback((content: string, replyingTo?: string) => {
    if (replyingTo) {
      return comments.create({
        post: id,
        content,
        parent: replyingTo,
      });
    }else {
      return comments.create({
        post: id as string,
        content,
      });
    }
  }, [id]);

  return (
    <Box className="comment-box">
      <If condition={isPreview}>
        <Then>
          {comments.data.map((comment) => (
            <Box className="comment-box__preview" key={comment.id} py={2}>
              <CommentItem
                showActions={false}
                commentId={comment.id}
                isReply={!!comment.parent}
                isAuthorComment={comment.isAuthorComment}
                item={comment}
                onClickComment={() => {
                  router.push(`/athlete/interactions/${id}?focus=true`);
                }}
              />
            </Box>
          ))}
        </Then>
        <Else>
          <Box position="relative" className="comment-box__detail">
            <Box pt={2} pb={{ base: 4, lg: "15px" }}>
              <Comments
                comments={comments.data}
              >
                <LoadMoreSkeleton
                  pt={8}
                  isShowLoadMore={comments.loading}
                />
              </Comments>

              <LoadMoreSkeleton
                pt={8}
                isShowLoadMore={comments.loading}
              />
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
