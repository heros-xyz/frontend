import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { If, Then } from "react-if";
import HerosSwiper from "@/components/ui/Swiper";
import AthleteInfo from "@/components/ui/AthleteInfo";
import { IAthleteInteraction } from "../../constants";
import FanOnlySection from "../FanOnlySection";

interface InteractionSectionProps extends IAthleteInteraction {
  isDetailView?: boolean;
  navigateToPostDetail?: () => void;
}

const MAX_CONTENT_LENGTH = 200;

const InteractionSection: FC<InteractionSectionProps> = ({
  content = "",
  createdAt,
  user,
  publicType,
  interactionMedia,
  navigateToPostDetail,
  isDetailView,
  tags,
}) => {
  const { avatar, firstName, lastName } = user;
  const renderAthleteName = `${firstName} ${lastName}`;

  const mediaResponse = useMemo(() => {
    if (!interactionMedia) return [];
    return (interactionMedia || []).map(({ url }) => {
      return url;
    });
  }, [interactionMedia]);

  const isAbleToReadMore = isDetailView
    ? false
    : content.length > MAX_CONTENT_LENGTH;

  if (publicType === "fanOnly") {
    return (
      <Box bg="primary" h="100%">
        <Flex justifyContent="space-between" mb="20px">
          <AthleteInfo
            athleteName={renderAthleteName}
            publishDate={createdAt}
            imagePath={avatar}
          />
        </Flex>
        <FanOnlySection />
      </Box>
    );
  }

  return (
    <Box bg="primary">
      <Flex justifyContent="space-between">
        <AthleteInfo
          athleteName={renderAthleteName}
          publishDate={createdAt}
          imagePath={avatar}
        />
      </Flex>
      <If condition={mediaResponse && mediaResponse.length > 1}>
        <Then>
          <Box mt={{ base: 4, lg: 5 }}>
            <HerosSwiper slideData={mediaResponse} />
          </Box>
        </Then>
      </If>
      <If condition={mediaResponse && mediaResponse.length === 1}>
        <Then>
          <Box my={4}>
            <Image
              w="full"
              mr="unset"
              src={mediaResponse[0]}
              fallbackSrc="https://via.placeholder.com/500x500"
              alt="Interaction post"
            />
          </Box>
        </Then>
      </If>

      <Box mt={mediaResponse && mediaResponse.length ? 0 : 4}>
        {content ? (
          <Text
            fontWeight="medium"
            fontSize={{ base: "sm", lg: "xl" }}
            color="white"
            lineHeight="19.6px"
          >
            {isAbleToReadMore
              ? `${content.slice(0, MAX_CONTENT_LENGTH)}...`
              : content}
            <Text
              as="a"
              cursor="pointer"
              color="secondary"
              textDecoration="underline"
              onClick={navigateToPostDetail}
            >
              {isAbleToReadMore ? "Read more" : ""}
            </Text>
          </Text>
        ) : null}
        {tags?.length > 0 &&
          tags.map((tag) => (
            <Text
              key={tag.id}
              as="span"
              bg="acccent.2"
              textColor="white"
              py="3px"
              px="12px"
              rounded="full"
              fontSize="14px"
              fontWeight={500}
              mr="12px"
              mb="6px"
            >
              #{tag.name}
            </Text>
          ))}
      </Box>
    </Box>
  );
};

export default InteractionSection;
