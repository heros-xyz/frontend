import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { If, Then } from "react-if";
import { useRouter } from "next/router";
import HerosSwiper from "@/components/ui/Swiper";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { LockIcon } from "@/components/svg/LockIcon";
import { Post } from "@/libs/dtl/post";
import { useAthleteProfile } from "@/libs/dtl/athleteProfile";

interface Props {
  isDetailView?: boolean;
  post?: Post;
  navigateToPostsByTag?: (value: string) => void;
}

const MAX_CONTENT_LENGTH = 200;

const InteractionSection: FC<Props> = ({
  navigateToPostsByTag,
  isDetailView,
  post,
}) => {
  const router = useRouter();
  const athlete = useAthleteProfile(post?.uid);
  const onClick = () => {
    router.push(`/fan/athlete-profile/${post?.uid}?current=3`);
  };
  const isAbleToReadMore = isDetailView
    ? false
    : (post?.content.length || 0) > MAX_CONTENT_LENGTH;

  const handleNavigateToPostsByTag = (value: string) => {
    navigateToPostsByTag?.(value);
  };
  const navigateToPostDetail = useCallback(() => {}, [post]);
  if (!athlete.data || !post) return <></>;

  if (!athlete.isMyAthlete) {
    return (
      <Box h="100%">
        <Flex justifyContent="space-between" mb="20px">
          <AthleteInfo
            athleteName={athlete.data?.nickName ?? ""}
            publishDate={post?.publicDate}
            imagePath={athlete?.data?.avatar}
          />
        </Flex>
        <Button
          size="lg"
          onClick={onClick}
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
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <AthleteInfo
          athleteName={athlete.data?.nickName}
          publishDate={post.publicDate}
          imagePath={athlete.data?.avatar}
        />
      </Flex>
      <If condition={post?.media?.length > 0}>
        <Then>
          <Box mt={{ base: 4, lg: 5 }}>
            <HerosSwiper slideData={post?.media ?? []} />
          </Box>
        </Then>
      </If>
      <Box>
        {post.content ? (
          <Text
            fontWeight="medium"
            fontSize={{ base: "sm", lg: "xl" }}
            color="primary"
            lineHeight={{ base: "21px", lg: "28px" }}
            whiteSpace="break-spaces"
            mt={4}
          >
            {isAbleToReadMore
              ? `${post.content.slice(0, MAX_CONTENT_LENGTH)}...`
              : post.content}
            <Text
              as="a"
              cursor="pointer"
              color="primary"
              onClick={navigateToPostDetail}
            >
              {isAbleToReadMore ? "Read more" : ""}
            </Text>
          </Text>
        ) : null}
        <Box mt="10px">
          {post.tags?.length > 0 &&
            post.tags.map((tag) => (
              <Button
                size="sm"
                variant="unstyled"
                bg="accent.2"
                px="15px"
                py="4px"
                mr="12px"
                color="white"
                rounded="full"
                textTransform="initial"
                fontSize={{ base: "14px" }}
                fontWeight={500}
                key={`tag_${tag}`}
                onClick={() => handleNavigateToPostsByTag(tag)}
              >
                #{tag}
              </Button>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InteractionSection;
