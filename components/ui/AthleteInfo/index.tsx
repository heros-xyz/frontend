import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { getImageLink } from "@/utils/link";

export interface AthleteInfoProps {
  imagePath: string;
  athleteName: string;
  publishDate: string | Date;
  id?: string;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({
  imagePath,
  athleteName,
  publishDate,
}) => {
  return (
    <Flex alignItems="center">
      <Image
        w={10}
        h={10}
        src={getImageLink(imagePath)}
        alt="user-avatar"
        rounded="full"
        fallbackSrc="https://via.placeholder.com/50"
        objectFit="cover"
      />
      <Box ml={3} flex={1}>
        <Text
          fontSize={{ base: "md", lg: "xl" }}
          fontWeight={{ base: "bold", lg: "medium" }}
          fontFamily="heading"
          color="white"
        >
          {athleteName}
        </Text>
        <Flex alignItems="center" fontSize={{ base: "12px", lg: "16px" }}>
          <Text color="grey.100" fontWeight="500">
            {dayjs(publishDate).format("DD/MM/YY | HH:mm")}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AthleteInfo;
