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
import { If, Then } from "react-if";
import PostSkeleton from "@/components/ui/AthletePost/PostSkeleton";
import { Post, usePostsAsTaker } from "@/libs/dtl/post";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { LockIcon } from "@/components/svg/LockIcon";
import AthleteInteractionComments from "@/components/ui/AthletePost/Comments";
import { AthleteProfilesuscription } from "@/libs/dtl";
import { useUser } from "@/hooks/useUser";
import InteractionSection from "./components/InteractionSection";
import { SocialInteraction } from "./components/SocialInteraction/SocialInteraction";
import SubscribeContent from "./components/SubscribeContent";

interface IInteractionsProps {
  onSubscribe: () => void;
  onGoToTag: () => void;
  athleteProfileSuscription: AthleteProfilesuscription;
}

const Interactions: FC<IInteractionsProps> = ({
  onSubscribe,
  onGoToTag,
  athleteProfileSuscription,
}) => {
  const router = useRouter();
  const { isAdmin } = useUser();
  const { id, filter: filteredTag } = router.query;
  const [tag, setTag] = useState("");
  const tagSectionRef = useRef<HTMLDivElement>(null);
  const [interactionData, setInteractionData] = useState<Post[]>([]);
  const posts = usePostsAsTaker({
    maker: athleteProfileSuscription.data?.id,
  });

  useEffect(() => {
    if (posts?.data && !posts.loading && tag === "") {
      setInteractionData(posts.data);
    }
  }, [posts, tag]);

  const handleFilterPostsByTag = (tagName: string) => {
    if (tagName === "") {
      setInteractionData(posts?.data ?? []);
      setTag("");
      return;
    }
    if (tag !== tagName && tagName !== "") {
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

  if (athleteProfileSuscription.loading) {
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
          <Divider
            mb={!athleteProfileSuscription.isMyAthlete ? "30px" : "unset"}
          />
        </Then>
      </If>

      <If condition={!athleteProfileSuscription.isMyAthlete && !isAdmin}>
        <Then>
          <SubscribeContent
            athleteName={athleteProfileSuscription.data?.nickName as string}
            onClick={onSubscribe}
          />
        </Then>
      </If>

      <If condition={interactionData?.length}>
        <Then>
          {interactionData?.map((post, idx: number) => (
            <Fragment key={post?.id}>
              {idx !== 0 && <Divider borderColor="#ADADAD" />}
              <Box py={{ base: 6, lg: 8 }}>
                <InteractionSection
                  navigateToPostsByTag={handleFilterPostsByTag}
                  post={post}
                />

                <If condition={athleteProfileSuscription.isMyAthlete}>
                  <Then>
                    <SocialInteraction
                      postId={post.id}
                      isAdmin={isAdmin}
                      handleComment={(focus) => {
                        navigateToPostDetail(post?.id, focus);
                      }}
                    />
                    <Box mt={{ base: 1, lg: 3 }}>
                      <AthleteInteractionComments id={post?.id} isPreview />
                    </Box>
                  </Then>
                </If>
              </Box>
            </Fragment>
          ))}
        </Then>
        {!!athleteProfileSuscription.data?.postsDates?.length && (
          <Box
            my={6}
            fontSize={{ base: "xs", lg: "md" }}
            fontWeight={400}
            color="primary"
          >
            <Text as="span" fontWeight={"bold"}>
              {athleteProfileSuscription.data?.nickName}
            </Text>{" "}
            {` hasn't created any interactions yet!`}
          </Box>
        )}
      </If>
      <If
        condition={
          !!athleteProfileSuscription.data?.postsDates?.length &&
          !posts.data.length
        }
      >
        <Then>
          <Box py={{ base: 6, lg: 8 }}>
            {athleteProfileSuscription.data?.postsDates?.map?.((item) => (
              <Box key={item?.id} py="5" h="100%">
                <Flex justifyContent="space-between" mb="20px">
                  <AthleteInfo
                    athleteName={athleteProfileSuscription.data?.nickName ?? ""}
                    publishDate={item?.date}
                    imagePath={athleteProfileSuscription.data?.avatar ?? ""}
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
        {!athleteProfileSuscription.data?.postsDates?.length && (
          <Box
            my={6}
            fontSize={{ base: "xs", lg: "md" }}
            fontWeight={400}
            color="primary"
          >
            <Text as="span" fontWeight={"bold"}>
              {athleteProfileSuscription.data?.nickName}
            </Text>{" "}
            {` hasn't created any interactions yet!`}
          </Box>
        )}
      </If>

      {(athleteProfileSuscription.loading || posts.loading) && (
        <Box mt={athleteProfileSuscription.isMyAthlete ? 0 : 12}>
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
