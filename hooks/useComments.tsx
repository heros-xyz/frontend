import { useRouter } from "next/router";
import { useMemo, useEffect, useRef, useState } from "react";
import { useBus } from "react-bus";
import {
  useAddCommentInteractionMutation,
  useGetListCommentInteractionQuery,
  useGetTotalCommentsQuery,
  useGetFocusCommentQuery,
} from "@/api/athlete";
import { IResponseComment } from "@/types/athlete/types";
import { useReplyCommentMutation } from "@/api/fan";
import { IReplyingTo } from "@/modules/athlete-profile/interactions/post-detail/CommentSection";
import { useDevice } from "./useDevice";

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
  const bus = useBus();
  const { isDesktop } = useDevice();
  const { commentId } = router.query;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFocusOnInput, setIsFocusOnInput] = useState(false);
  const [offset, setOffset] = useState(0);
  const [take, setTake] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [prevOffset, setPrevOffset] = useState(offset);
  const [nextOffset, setNextOffset] = useState(offset);
  const [isLoadAllComment, setIsLoadAllComment] = useState(false);
  const [isLoadFirstComment, setIsLoadFirstComment] = useState(false);
  const [commentedIdList, setCommentedIdList] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<IReplyingTo | undefined>(
    undefined
  );
  const [listMergedComments, setListComments] = useState<IResponseComment[]>(
    []
  );
  const { data: commentFocused } = useGetFocusCommentQuery(
    commentId as string,
    {
      skip: typeof commentId !== "string",
    }
  );

  const [handleSendMessage, { data: sendMessageResponse }] =
    useAddCommentInteractionMutation();
  const [replyComment, { data: replyCommentResponse }] =
    useReplyCommentMutation();

  const { data: totalComments, refetch: refetchTotalComment } =
    useGetTotalCommentsQuery(
      { interactionId, pageInfo: { take: 1 } },
      {
        skip: typeof interactionId !== "string",
      }
    );

  const commentFocusedIndex = useMemo(() => {
    if (commentFocused) {
      return commentFocused.totalComment - commentFocused.commentIndex;
    }
  }, [commentFocused]);

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
      },
    },
    {
      skip: typeof interactionId !== "string" || !authorId,
    }
  );

  const onLoadMore = () => {
    setTake(10);
    setOffset(nextOffset + 10);
    // setTake(20);
    // setOffset(nextOffset + (take < 10 ? 10 : take));
  };

  const onLoadPrevious = () => {
    setTake(prevOffset - take <= 0 ? prevOffset : take);
    setOffset(prevOffset - take <= 0 ? 0 : prevOffset - take);
  };

  const handleRefetchTotalComment = async () => {
    await refetchTotalComment().unwrap();
    setNextOffset((offset) => offset - 1);
  };

  const onScrollAfterComment = () => {
    setTimeout(() => {
      if (isDesktop) {
        scrollRef.current?.scrollTo({
          top: scrollRef.current?.scrollHeight,
          behavior: "smooth",
        });
      } else {
        window.scroll({
          top: document.body.clientHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const isShowLoadMore = useMemo(() => {
    if (!listComment) return false;

    return listComment.meta.offset + 10 < listComment.meta.itemCount;
  }, [listComment]);

  useEffect(() => {
    if (commentFocused && commentFocusedIndex !== undefined) {
      const offsetDef =
        commentFocusedIndex - take <= 0 ? 0 : commentFocusedIndex - take;
      setPrevOffset(offsetDef);
      setNextOffset(offsetDef);
      if (offsetDef < 0) {
        setOffset(commentFocusedIndex);
      } else {
        setOffset(offsetDef);
      }
    }
  }, [commentFocused, commentFocusedIndex]);

  useEffect(() => {
    if (listComment && !isFetching) {
      // Case load more at bottom
      if (listComment.meta.offset > currentOffset) {
        const listCommentFilter = listComment.data.filter(
          (comment) => !commentedIdList.includes(comment.id)
        );
        setListComments((prevComments) => [
          ...prevComments,
          ...listCommentFilter,
        ]);
        setCurrentOffset(listComment.meta.offset);
        setNextOffset(listComment.meta.offset);
      } else {
        // Case load prev at top
        setListComments((prevComments) => [
          ...listComment.data,
          ...prevComments,
        ]);
        setCurrentOffset(listComment.meta.offset);
        setPrevOffset(listComment.meta.offset);
      }

      if (listComment.meta.offset + take >= listComment.meta.itemCount) {
        setIsLoadAllComment(true);
      }

      if (listComment.meta.offset <= 0) {
        setIsLoadFirstComment(true);
      }
    }
  }, [listComment]);

  useEffect(() => {
    if (sendMessageResponse || replyCommentResponse) {
      setReplyingTo(undefined);
      setIsFocusOnInput(false);
      const comment = sendMessageResponse || replyCommentResponse;
      setCommentedIdList((prev) => [...prev, comment?.id ?? ""]);
      onScrollAfterComment();
      bus && bus.emit("onSubmittedComment");
    }
  }, [sendMessageResponse, replyCommentResponse]);

  useEffect(() => {
    if (sendMessageResponse) {
      setListComments((prevComments) => [...prevComments, sendMessageResponse]);
      refetchTotalComment();
    }
  }, [sendMessageResponse]);

  useEffect(() => {
    if (replyCommentResponse) {
      setListComments((prevComments) => [
        ...prevComments,
        replyCommentResponse,
      ]);
      refetchTotalComment();
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
    isLoadAllComment,
    isLoadFirstComment,
    offset,
    handleRefetchTotalComment,
    setOffset,
    setTake,
    setListComments,
    handleSendMessage,
    replyComment,
    setIsFocusOnInput,
    setReplyingTo,
    onLoadMore,
    onLoadPrevious,
  };
};
