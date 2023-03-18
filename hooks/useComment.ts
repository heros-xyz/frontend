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
}: IAthleteCommentProps) => {
  const router = useRouter();
  const { commentId } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [offset, setOffset] = useState(0);
  const [take, setTake] = useState(10);
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
        take: isPreview ? 3 : take,
        order: "ASC",
        offset,
        getReply: !isPreview,
        ...(isPreview && { take: 3 }),
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
      setTimeout(() => {
        window.scroll({
          top: document.body.clientHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [sendMessageResponse, replyCommentResponse]);

  useEffect(() => {
    if (sendMessageResponse) {
      setListComments((prevComments) => [...prevComments, sendMessageResponse]);
      refetch();
    }
  }, [sendMessageResponse]);

  useEffect(() => {
    if (replyCommentResponse) {
      setListComments((prevComments) => [
        ...prevComments,
        replyCommentResponse,
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
    take,
    setOffset,
    setTake,
    setListComments,
    handleSendMessage,
    replyComment,
    setIsFocusOnInput,
    setReplyingTo,
  };
};
