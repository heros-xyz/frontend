import { Box, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useGetAthleteListInteractionQuery } from "@/api/fan";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import InteractionSection from "./components/InteractionSection";
import { SocialInteraction } from "./components/SocialInteraction/SocialInteraction";
import SubscribeContent from "./components/SubscribeContent";
import { IAthleteInteraction } from "./constants";

interface IInteractionsProps {
  onSubscribe: () => void;
  validateIsFan: boolean;
}

const Interactions: FC<IInteractionsProps> = ({
  onSubscribe,
  validateIsFan,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { isBottom } = useScrollToBottom();
  const [page, setPage] = useState(1);
  const [interactionsList, setInteractionList] = useState<
    IAthleteInteraction[]
  >([]);

  const { data: interactionData, isFetching } =
    useGetAthleteListInteractionQuery({
      athleteId: id,
      params: {
        page,
        take: 10,
        order: "DESC",
      },
    });

  const navigateToPostDetail = useCallback((view: string) => {
    router.push({
      pathname: "[id]/interaction",
      query: { id, view },
    });
  }, []);

  useEffect(() => {
    if (interactionData?.data) {
      setInteractionList((prevArray) =>
        prevArray.concat(interactionData?.data)
      );
    }
  }, [interactionData?.data]);

  useEffect(() => {
    if (isBottom && interactionData?.meta?.hasNextPage && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [isBottom]);

  return (
    <Box>
      {!validateIsFan && <SubscribeContent onClick={onSubscribe} />}
      {interactionsList?.map(
        (interactionPost: IAthleteInteraction, idx: number) => (
          <Fragment key={interactionPost.id}>
            {idx !== 0 && <Divider />}
            <Box py={{ base: 6, lg: 8 }}>
              <InteractionSection
                navigateToPostDetail={() =>
                  navigateToPostDetail(interactionPost.id)
                }
                {...interactionPost}
              />
              {interactionPost.publicType === "all" && (
                <SocialInteraction
                  postId={interactionPost.id}
                  handleComment={() => navigateToPostDetail(interactionPost.id)}
                  reactionCount={interactionPost.reactionCount}
                  liked={interactionPost.liked}
                />
              )}
            </Box>
          </Fragment>
        )
      )}
      {isFetching && (
        <Box mt={validateIsFan ? 0 : 12}>
          <PostSkeleton pb={12} />
          <PostSkeleton pb={12} />
          <PostSkeleton pb={12} />
        </Box>
      )}
    </Box>
  );
};

export default Interactions;
