import { Box, Button, CloseButton, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Else, If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
import { useUnmount } from "react-use";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { useGetAthleteListInteractionQuery } from "@/api/fan";
import InteractionSection from "./components/InteractionSection";
import { SocialInteraction } from "./components/SocialInteraction/SocialInteraction";
import SubscribeContent from "./components/SubscribeContent";
import { IAthleteInteraction } from "./constants";

interface IInteractionsProps {
  onSubscribe: () => void;
  onGoToTag: () => void;
  validateIsFan: boolean;
  athleteNickname: string;
}

const Interactions: FC<IInteractionsProps> = ({
  onSubscribe,
  onGoToTag,
  validateIsFan,
  athleteNickname,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const tagSectionRef = useRef<HTMLDivElement>(null);

  const [interactionsList, setInteractionList] = useState<
    IAthleteInteraction[]
  >([]);

  const {
    data: interactionData,
    isFetching,
    isLoading,
  } = useGetAthleteListInteractionQuery({
    athleteId: id,
    params: {
      page,
      take: 10,
      order: "DESC",
      tag,
    },
  });

  useEffect(() => {
    console.log(interactionsList);
  }, [interactionsList]);

  const handleFilterPostsByTag = (tagName: string) => {
    if (tag !== tagName) {
      setPage(1);
      setInteractionList([]);
      setTag(tagName);
    } else {
      onGoToTag();
    }
  };

  const navigateToPostDetail = useCallback((view: string) => {
    router.push({
      pathname: "[id]/interaction",
      query: { id, view, focus: true },
    });
  }, []);

  const onLoadMore = () => {
    if (interactionData?.meta?.hasNextPage && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    if (tag) {
      onGoToTag();
    }
  }, [tag]);

  useEffect(() => {
    if (interactionData?.data) {
      setInteractionList((prevArray) => [
        ...prevArray,
        ...interactionData?.data,
      ]);
    }
  }, [interactionData?.data]);

  useUnmount(() => {
    setInteractionList([]);
  });

  return (
    <Box ref={tagSectionRef} className="view-athlete-interactions">
      <If condition={!!tag}>
        <Then>
          <Box my="30px">
            <Text mb="10px" fontSize={{ base: "12px", lg: "16px" }}>
              You are viewing the interactions with the tag:
            </Text>
            <TagButton
              onClose={() => {
                handleFilterPostsByTag("");
              }}
            >
              {tag}
            </TagButton>
          </Box>
          <Divider mb={!validateIsFan ? "30px" : "unset"} />
        </Then>
      </If>

      {!validateIsFan && (
        <SubscribeContent athleteName={athleteNickname} onClick={onSubscribe} />
      )}
      <If condition={interactionsList.length}>
        <Then>
          {interactionsList?.map(
            (interactionPost: IAthleteInteraction, idx: number) => (
              <Fragment key={interactionPost.id}>
                {idx !== 0 && <Divider borderColor="#ADADAD" />}
                <Box py={{ base: 6, lg: 8 }}>
                  <InteractionSection
                    validateIsFan={validateIsFan}
                    navigateToPostsByTag={handleFilterPostsByTag}
                    navigateToPostDetail={() =>
                      navigateToPostDetail(interactionPost.id)
                    }
                    {...interactionPost}
                  />
                  <If condition={interactionPost.isAccessRight}>
                    <Then>
                      <SocialInteraction
                        postId={interactionPost.id}
                        handleComment={() =>
                          navigateToPostDetail(interactionPost.id)
                        }
                        reactionCount={interactionPost.reactionCount}
                        liked={interactionPost.liked}
                      />
                    </Then>
                  </If>
                </Box>
              </Fragment>
            )
          )}
        </Then>
        <Else>
          <Box
            my={6}
            fontSize={{ base: "xs", lg: "md" }}
            fontWeight={400}
            color="primary"
          >
            <Text as="span" fontWeight={"bold"}>
              {athleteNickname}
            </Text>{" "}
            {` hasn't created any interactions yet!`}
          </Box>
        </Else>
      </If>

      {interactionData?.meta?.hasNextPage && (
        <Waypoint onEnter={onLoadMore}>
          <Box
            className="post-load-more"
            display="flex"
            justifyContent="center"
            mt={5}
            w="full"
          >
            <PostSkeleton hasImage={false} w="full" />
          </Box>
        </Waypoint>
      )}
      {isLoading && (
        <Box mt={validateIsFan ? 0 : 12}>
          <PostSkeleton pb={12} />
          <PostSkeleton pb={12} />
          <PostSkeleton pb={12} />
        </Box>
      )}
    </Box>
  );
};

const TagButton = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <Button
      display="flex"
      size={{ base: "xs", lg: "sm" }}
      variant="unstyled"
      bg="accent.2"
      pl="15px"
      py="4px"
      mr="12px"
      rounded="full"
      fontSize={{ base: "14px" }}
      textTransform="initial"
      fontWeight={500}
    >
      <Text> #{children}</Text>
      <CloseButton size={{ base: "sm", lg: "md" }} onClick={onClose} />
    </Button>
  );
};

export default Interactions;
