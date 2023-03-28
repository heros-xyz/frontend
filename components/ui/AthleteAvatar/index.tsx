import { Image, Box, Text, Center, AspectRatio } from "@chakra-ui/react";
import { FC } from "react";
import { getImageLink } from "@/utils/link";

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
          <Image
            width="100%"
            src={getImageLink(imageUrl)}
            alt={name}
            borderRadius="full"
            objectFit="cover"
          />
        </AspectRatio>
        {isRecommend && (
          <Center
            bg="accent.1"
            position="absolute"
            bottom={0}
            left="50%"
            css={{ transform: "translate(-50%)" }}
            borderRadius={28}
            w="fit-content"
            h={{ base: "15px", lg: "30px" }}
            fontSize={{ base: "2xs", lg: "md" }}
            fontFamily="heading"
            color="accent.2"
            fontWeight={700}
            px={{ base: 1.5, lg: 2 }}
            pt={{ base: 0.5, lg: 0 }}
            textTransform="uppercase"
          >
            recommended
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
