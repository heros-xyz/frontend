import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { If, Then } from "react-if";
import HerosSwiper from "@/components/ui/Swiper";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { IAthleteInteraction } from "../../constants";
import FanOnlySection from "../FanOnlySection";

interface InteractionSectionProps extends IAthleteInteraction {
  isDetailView?: boolean;
  validateIsFan: boolean;
  navigateToPostDetail?: () => void;
  navigateToPostsByTag?: (value: string) => void;
}

const MAX_CONTENT_LENGTH = 200;

const InteractionSection: FC<InteractionSectionProps> = ({
  content = "",
  createdAt,
  user,
  interactionMedia,
  navigateToPostDetail,
  navigateToPostsByTag,
  isAccessRight,
  isDetailView,
  tags,
}) => {
  const { avatar, nickName } = user;
  const isAbleToReadMore = isDetailView
    ? false
    : content.length > MAX_CONTENT_LENGTH;

  const handleNavigateToPostsByTag = (value: string) => {
    navigateToPostsByTag && navigateToPostsByTag(value);
  };

  if (!isAccessRight) {
    return (
      <Box h="100%">
        <Flex justifyContent="space-between" mb="20px">
          <AthleteInfo
            athleteName={nickName}
            publishDate={createdAt}
            imagePath={avatar}
          />
        </Flex>
        <FanOnlySection />
      </Box>
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <AthleteInfo
          athleteName={nickName}
          publishDate={createdAt}
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
            lineHeight="19.6px"
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
              textDecoration="underline"
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
