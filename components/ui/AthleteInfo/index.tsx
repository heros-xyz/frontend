import React from "react";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

export interface AthleteInfoProps {
  imagePath: string;
  athleteName: string;
  publishDate: string | Date;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({
  imagePath,
  athleteName,
  publishDate,
}) => {
  return (
    <Flex alignItems="center">
      <Avatar w={10} h={10} name="Dan Abrahmov" src={imagePath} />
      <Box ml={3}>
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
