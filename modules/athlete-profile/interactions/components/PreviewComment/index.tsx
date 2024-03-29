import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { IMeta, IResponseComment } from "@/types/athlete/types";
import CommentItem from "@/components/ui/Comment/Item";

import { Comment } from "@/libs/dtl/types";
import { useAuthContext } from "@/context/AuthContext";

interface IPreviewCommentProps {
  navigateToPostDetail?: () => void;
  items?: Comment[];
}

export const PreviewComment: FC<IPreviewCommentProps> = ({
  items,
  navigateToPostDetail,
}) => {
  return (
    <Box className="preview-comment">
      {items && items.map((item) => (
        <Box key={item.id} className="preview-comment__item" py={2}>
          <CommentItem
            actions={false}
            key={item.id}
            comment={item}
          />
        </Box>
      ))}
    </Box>
  );
};
