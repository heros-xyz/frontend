import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
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
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { useUser } from "@/hooks/useUser";
import { Post, usePostsAsTaker } from "@/libs/dtl/post";
import { useGetAthleteProfileByUid } from "@/libs/dtl/athleteProfile";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { LockIcon } from "@/components/svg/LockIcon";
import InteractionSection from "./components/InteractionSection";
import { SocialInteraction } from "./components/SocialInteraction/SocialInteraction";
import SubscribeContent from "./components/SubscribeContent";
import { IInteractionMedia } from "./constants";

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
  const { isAdmin } = useUser();
  const { id, filter: filteredTag } = router.query;
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const tagSectionRef = useRef<HTMLDivElement>(null);
  const [interactionData, setInteractionData] = useState<Post[]>([]);
  const { data: athleteProfile, loading: loadingAthleteProfile } =
    useGetAthleteProfileByUid(id as string);
  const {
    data,
    loading: isLoading,
    postsDates,
  } = usePostsAsTaker({
    maker: id as string,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setInteractionData(data);
    }
  }, [data]);

  const interactionsList = interactionData.map((post) => ({
    ...post,
    user: {
      ...athleteProfile,
      id: athleteProfile?.id ?? "",
      goal: athleteProfile?.goal ?? "",
      currentTeam: athleteProfile?.currentTeam ?? "",
      totalSubCount: athleteProfile?.totalSubCount ?? 0,
      firstName: athleteProfile?.firstName ?? "",
      lastName: athleteProfile?.lastName ?? "",
      middleName: athleteProfile?.middleName ?? "",
      fullName: athleteProfile?.fullName ?? "",
      nickName: athleteProfile?.nickName ?? "",
      avatar: athleteProfile?.avatar ?? "",
      story: athleteProfile?.story ?? "",
      gender: athleteProfile?.gender ?? "0",
      sport: athleteProfile?.sport ?? { label: "", key: "" },
      tagline: athleteProfile?.tagline ?? "",
      tags: athleteProfile?.tags ?? [],
    },
    liked: post?.liked ?? false,
    publicDate: post?.publicDate ?? null,
    reactionCount: post?.reactionsCount ?? 0,
    commentCount: post?.commentsCount ?? 0,
    tags: post?.tags.map((tag) => ({ id: tag, name: tag })),
    isAccessRight: validateIsFan, // TODO: check this
  }));

  const handleFilterPostsByTag = (tagName: string) => {
    if (tagName === "") {
      setInteractionData(data ?? []);
      setTag("");
      return;
    }
    if (tag !== tagName && tagName !== "") {
      setPage(1);
      setInteractionData(
        (current) =>
          current?.filter((post) => post?.tags?.includes(tagName)) ?? current
      );
      setTag(tagName);
      setTimeout(onGoToTag, 100);
    } else {
      onGoToTag();
    }
  };

  const navigateToPostDetail = useCallback((view: string, focus?: boolean) => {
    router.push({
      pathname: "[id]/interaction",
      query: { id, view, ...(focus && { focus }) },
    });
  }, []);

  useEffect(() => {
    filteredTag && setTag(filteredTag as string);
  }, []);

  useEffect(() => {
    if (tag) {
      onGoToTag();
    }
  }, [tag]);

  if (isLoading || loadingAthleteProfile) {
    return <PostSkeleton />;
  }

  return (
    <Box ref={tagSectionRef} className="view-athlete-interactions">
      <If condition={!!tag}>
        <Then>
          <Box my="30px">
            <Text
              mb="10px"
              fontSize={{ base: "12px", lg: "16px" }}
              color="primary"
            >
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

      <If condition={!validateIsFan && !isAdmin}>
        <Then>
          <SubscribeContent
            athleteName={athleteNickname}
            onClick={onSubscribe}
          />
        </Then>
      </If>

      <If condition={interactionsList?.length}>
        <Then>
          {interactionsList?.map((interactionPost, idx: number) => (
            <Fragment key={interactionPost?.id}>
              {idx !== 0 && <Divider borderColor="#ADADAD" />}
              <Box py={{ base: 6, lg: 8 }}>
                <InteractionSection
                  validateIsFan={validateIsFan}
                  navigateToPostsByTag={handleFilterPostsByTag}
                  navigateToPostDetail={() => {
                    navigateToPostDetail("");
                  }}
                  interactionMedia={
                    interactionPost?.media as IInteractionMedia[]
                  }
                  {...interactionPost}
                  user={interactionPost?.user as any}
                />
                <If condition={interactionPost.isAccessRight}>
                  <Then>
                    <SocialInteraction
                      postId={interactionPost.id}
                      isAdmin={isAdmin}
                      handleComment={(focus) => {
                        navigateToPostDetail(interactionPost?.id, focus);
                      }}
                      reactionCount={interactionPost?.reactionCount ?? 0}
                      liked={interactionPost?.liked ?? false}
                    />
                  </Then>
                </If>
              </Box>
            </Fragment>
          ))}
        </Then>
        {!!postsDates?.length && (
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
        )}
      </If>
      <If condition={!!postsDates?.length && !interactionsList.length}>
        <Then>
          <Box py={{ base: 6, lg: 8 }}>
            {postsDates?.map?.((item) => (
              <Box key={item?.id} py="5" h="100%">
                <Flex justifyContent="space-between" mb="20px">
                  <AthleteInfo
                    athleteName={athleteProfile?.nickName ?? ""}
                    publishDate={item?.date}
                    imagePath={athleteProfile?.avatar ?? ""}
                  />
                </Flex>
                <Button
                  size="lg"
                  onClick={() => {
                    router.push(`/fan/athlete-profile/${id}?current=3`);
                  }}
                  bg="accent.1"
                  gap="10px"
                  color="accent.2"
                  w="full"
                >
                  <Flex>
                    <Text pr={3}>Subscribe</Text>
                    <LockIcon />
                  </Flex>
                </Button>
              </Box>
            ))}
          </Box>
        </Then>
        {!postsDates?.length && (
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
        )}
      </If>

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
