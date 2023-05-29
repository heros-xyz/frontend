import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect } from "react";
import { If, Then } from "react-if";
import CommentItem from "@/components/ui/Comment/Item";
import LoadMoreSkeleton from "@/components/ui/AthletePost/LoadMoreSkeleton";
import { useDevice } from "@/hooks/useDevice";
import { useUser } from "@/hooks/useUser";
import { Comment } from "@/libs/dtl";
import { useCommentReply, useComments } from "@/libs/dtl/comment";
import { useReactions } from "@/libs/dtl/reaction";
import { Post } from "@/libs/dtl/post";
import { SocialInteraction } from "../../components/SocialInteraction/SocialInteraction";
import CommentField from "../../components/CommentField";

interface Props {
  post: Post
}
const CommentSection: FC<Props> = ({ post }) => {
  const router = useRouter();
  const { isMobile } = useDevice();
  const { isAdmin } = useUser();
  const commentReply = useCommentReply();

  const comments = useComments(post.id);

  const createComment = useCallback(
    (content: string) => {
      return comments.create({
        post: post.id,
        content,
        parent: commentReply.comment?.id,
      });
    },
    [post.id, commentReply.comment]
  );

  return (
    <Flex flexDirection="column" position="relative">
      <Flex flexDirection="column">
        <SocialInteraction
          postId={post.id}
          isInDetailPage
        />
        <Flex
          py={4}
          overflowY="auto"
          flexDirection="column"
          maxH={{ lg: "60vh", xl: "65vh" }}
          minH={{ lg: "60vh", xl: "65vh" }}
          gap={{ base: 4, lg: 8 }}
          className="postComment"
        >
          {comments.data.map(
            (comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
              />
            )
          )}

          <LoadMoreSkeleton
            isShowLoadMore={comments.loading}
          />
        </Flex>

        <LoadMoreSkeleton
          isShowLoadMore={comments.loading}
        />
      </Flex>


      <CommentField
        isLoading={comments.loading}
        onSubmitComment={createComment}
        disabled={isAdmin}
      />
    </Flex>
  );
};

export default CommentSection;
