import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { If, Then } from "react-if";
import CommentItem from "@/components/ui/Comment/Item";
import LoadMoreSkeleton from "@/components/ui/AthletePost/LoadMoreSkeleton";
import { useDevice } from "@/hooks/useDevice";
import { useUser } from "@/hooks/useUser";
import { Comment } from "@/libs/dtl";
import { useComments } from "@/libs/dtl/comment";
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

  const comments = useComments(post.id);
  const reactions = useReactions(post.id)

  return (
    <Flex flexDirection="column" position="relative">
      <Flex flexDirection="column">
        <SocialInteraction
          liked={reactions.iLikeIt}
          postId={post.id}
          isAdmin={isAdmin}
          isInDetailPage
          reactionCount={post.reactionsCount}
          commentsCount={comments.data.length ?? 0}
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
          {([] as Comment[]).map(
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

      <If condition={!isAdmin}>
        <Then>
          <CommentField
            isLoading={comments.loading}
            disabled={isAdmin}
          />
        </Then>
      </If>
    </Flex>
  );
};

export default CommentSection;
