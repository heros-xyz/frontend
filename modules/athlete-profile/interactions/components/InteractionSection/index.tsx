import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { If, Then } from "react-if";
import { useRouter } from "next/router";
import HerosSwiper from "@/components/ui/Swiper";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { LockIcon } from "@/components/svg/LockIcon";
import { IAthleteInteraction } from "../../constants";

interface InteractionSectionProps extends IAthleteInteraction {
  isDetailView?: boolean;
  validateIsFan: boolean;
  navigateToPostDetail?: () => void;
  navigateToPostsByTag: (value: string) => void;
}

const MAX_CONTENT_LENGTH = 200;

const InteractionSection: FC<InteractionSectionProps> = ({
  content = "",
  publicDate,
  user,
  interactionMedia,
  navigateToPostDetail,
  navigateToPostsByTag,
  isAccessRight,
  isDetailView,
  tags,
}) => {
  const { query } = useRouter();
  const router = useRouter();
  const onClick = () => {
    router.push(`/fan/athlete-profile/${query.athleteId}?current=3`);
  };
  const { avatar, nickName } = user;
  const isAbleToReadMore = isDetailView
    ? false
    : content.length > MAX_CONTENT_LENGTH;

  const handleNavigateToPostsByTag = (value: string) => {
    navigateToPostsByTag(value);
  };

  if (!isAccessRight) {
    return (
      <Box h="100%">
        <Flex justifyContent="space-between" mb="20px">
          <AthleteInfo
            athleteName={nickName}
            publishDate={publicDate}
            imagePath={avatar}
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
          athleteName={nickName}
          publishDate={publicDate}
          imagePath={avatar}
        />
      </Flex>
      <If condition={interactionMedia && interactionMedia.length}>
        <Then>
          <Box mt={{ base: 4, lg: 5 }}>
            <HerosSwiper slideData={interactionMedia} />
          </Box>
        </Then>
      </If>

      <Box>
        {content ? (
          <Text
            fontWeight="medium"
            fontSize={{ base: "sm", lg: "xl" }}
            color="primary"
            lineHeight={{ base: "21px", lg: "28px" }}
            whiteSpace="break-spaces"
            mt={4}
          >
            {isAbleToReadMore
              ? `${content.slice(0, MAX_CONTENT_LENGTH)}...`
              : content}
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
          {tags?.length > 0 &&
            tags.map(({ id, name }) => (
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
                key={id}
                onClick={() => handleNavigateToPostsByTag(name)}
              >
                #{name}
              </Button>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InteractionSection;
