import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { IMeta, IResponseComment } from "@/types/athlete/types";
import CommentItem from "@/components/ui/Comment/Item";

interface IPreviewCommentProps {
  navigateToPostDetail?: () => void;
  item?: {
    data: IResponseComment[];
    meta: IMeta;
  };
}

export const PreviewComment: FC<IPreviewCommentProps> = ({
  item,
  navigateToPostDetail,
}) => {
  return (
    <Box className="preview-comment">
      {(item?.data || []).map((item) => (
        <Box key={item.id} className="preview-comment__item" py={2}>
          <CommentItem
            showAcions={false}
            key={item.id}
            isAuthorComment={item.isAuthorComment}
            isReply={!!item.parentComment}
            commentId={item.id}
            item={{
              id: item.id,
              name: `${item.user.firstName} ${item.user.lastName}`,
              firstName: item.user.firstName,
              lastName: item.user.lastName,
              text: item.content,
              avatar: item.user.avatar,
              likeCount: item.reactedCommentsCount,
              isLiked: item.liked,
              parentComment: item.parentComment,
              createdAt: item.createdAt,
              isAuthorComment: item.isAuthorComment,
              nickName: item.user.nickName,
            }}
            onClickComment={navigateToPostDetail}
          />
        </Box>
      ))}
    </Box>
  );
};
