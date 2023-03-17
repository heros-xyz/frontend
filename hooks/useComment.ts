import { useRouter } from "next/router";
import { useMemo, useEffect, useRef, useState } from "react";
import {
  useAddCommentInteractionMutation,
  useGetListCommentInteractionQuery,
  useGetTotalCommentsQuery,
} from "@/api/athlete";
import { IResponseComment } from "@/types/athlete/types";
import { useReplyCommentMutation } from "@/api/fan";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";

interface IAthleteCommentProps {
  isPreview?: boolean;
  interactionId: string;
  authorId: string;
  isAthlete: boolean;
}

export const useComments = ({
  isPreview,
  interactionId,
  authorId,
  isAthlete,
}: IAthleteCommentProps) => {
  const router = useRouter();
  const { commentId } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [offset, setOffset] = useState(0);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | undefined>(
    undefined
  );
  const [listMergedComments, setListComments] = useState<IResponseComment[]>(
    []
  );
  const [handleSendMessage, { data: sendMessageResponse }] =
    useAddCommentInteractionMutation();
  const [replyComment, { data: replyCommentResponse }] =
    useReplyCommentMutation();

  const { data: totalComments, refetch } = useGetTotalCommentsQuery(
    { interactionId, pageInfo: { take: 1 } },
    {
      skip: typeof interactionId !== "string",
    }
  );

  const {
    data: listComment,
    isLoading,
    isFetching,
  } = useGetListCommentInteractionQuery(
    {
      interactionId,
      authorId,
      pageInfo: {
        take: isPreview ? 2 : 10,
        order: "DESC",
        offset,
        getReply: !isPreview,
        ...(isPreview && { take: 2 }),
        ...(commentId && { commentIdFocus: commentId as string }),
      },
    },
    {
      skip: typeof interactionId !== "string" || !authorId,
    }
  );

  const isShowLoadMore = useMemo(() => {
    if (!listComment) return false;

    return listComment.meta.offset + 10 < listComment.meta.itemCount;
  }, [listComment]);

  useEffect(() => {
    if (listComment) {
      setListComments((prevComments) => [...prevComments, ...listComment.data]);
    }
  }, [listComment]);

  useEffect(() => {
    if (sendMessageResponse || replyCommentResponse) {
      setReplyingTo(undefined);
      setIsFocusOnInput(false);

      if (isAthlete) {
        window.scrollTo({
          top: Number(scrollRef?.current?.offsetTop) - 60,
          behavior: "smooth",
        });
      }
    }
  }, [sendMessageResponse, replyCommentResponse]);

  useEffect(() => {
    if (sendMessageResponse) {
      setListComments((prevComments) => [sendMessageResponse, ...prevComments]);
      refetch();
    }
  }, [sendMessageResponse]);

  useEffect(() => {
    if (replyCommentResponse) {
      setListComments((prevComments) => [
        replyCommentResponse,
        ...prevComments,
      ]);
      refetch();
    }
  }, [replyCommentResponse]);

  return {
    listMergedComments,
    isLoading,
    isFocusOnInput,
    replyingTo,
    listComment,
    isShowLoadMore,
    totalComments,
    isFetching,
    scrollRef,
    setOffset,
    setListComments,
    handleSendMessage,
    replyComment,
    setIsFocusOnInput,
    setReplyingTo,
  };
};
