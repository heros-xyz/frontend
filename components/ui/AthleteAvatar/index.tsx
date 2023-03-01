import { Image, Box, Text, Center } from "@chakra-ui/react";
import { FC } from "react";

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
        <Image
          width="100%"
          src={imageUrl}
          alt={name}
          borderRadius="full"
          fallbackSrc="https://via.placeholder.com/150"
        />
        {isRecommend && (
          <Center
            bg="acccent.1"
            position="absolute"
            bottom={0}
            left="50%"
            css={{ transform: "translate(-50%)" }}
            borderRadius={28}
            w={{ base: "79px", lg: "124px" }}
            h={{ base: "15px", lg: "30px" }}
            fontSize={{ base: "2xs", lg: "md" }}
            fontFamily="heading"
            color="acccent.2"
            fontWeight={700}
          >
            RECOMMEND
          </Center>
        )}
      </Box>
      <Text fontSize={{ base: "sm", lg: "18px" }} color="white">
        {name}
      </Text>
    </Box>
  );
};

export default AthleteAvatar;
