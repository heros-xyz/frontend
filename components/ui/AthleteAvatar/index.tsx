import { Box, Text, Center, AspectRatio } from "@chakra-ui/react";
import { FC } from "react";
import { getImageLink } from "@/utils/link";
import HerosImage from "@/components/common/HerosImage";

interface AthleteAvatarProps {
  imageUrl: string;
  isRecommend?: boolean;
  name?: string;
}
const AthleteAvatar: FC<AthleteAvatarProps> = ({
  imageUrl,
  isRecommend = false,
  name,
}) => {
  return (
    <Box textAlign="center">
      <Box position="relative" marginBottom={2}>
        <AspectRatio ratio={1}>
          <HerosImage
            src={getImageLink(imageUrl)}
            widthSize={400}
            heightSize={400}
            width={"100%"}
            height={"100%"}
          />
        </AspectRatio>
        {isRecommend && (
          <Center
            bg="secondary"
            position="absolute"
            bottom={0}
            left="50%"
            css={{ transform: "translate(-50%)" }}
            borderRadius={28}
            w="fit-content"
            h={{ base: "20px", lg: "30px" }}
            fontSize={{ base: "sm", lg: "md" }}
            fontFamily="heading"
            color="primary"
            fontWeight={700}
            px={{ base: 3, lg: 6 }}
            pt={{ base: 0.5, lg: 0 }}
            textTransform="uppercase"
          >
            Subscribe
          </Center>
        )}
      </Box>
      <Text
        fontSize={{ base: "sm", lg: "18px" }}
        fontWeight={500}
        color="primary"
      >
        {name}
      </Text>
    </Box>
  );
};

export default AthleteAvatar;
