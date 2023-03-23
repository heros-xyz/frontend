import React, { useMemo } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { getImageLink } from "@/utils/link";
export interface AthleteInfoProps {
  imagePath: string;
  athleteName: string;
  publishDate: string | Date | null | undefined;
  id?: string;
  isSchedule?: boolean;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({
  imagePath,
  athleteName,
  publishDate,
  isSchedule,
}) => {
  const showScheduleIcon = useMemo(() => {
    return publishDate && dayjs(new Date().toJSON()).isBefore(publishDate);
  }, [publishDate, new Date()]);

  return (
    <Flex alignItems="center" className="athlete-info">
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
          color="primary"
        >
          {athleteName}
        </Text>
        <Flex alignItems="self-start" fontSize={{ base: "12px", lg: "16px" }}>
          <Text color="grey.100" fontWeight="500">
            {dayjs(publishDate).format("DD/MM/YY | HH:mm")}
          </Text>
          {showScheduleIcon ? (
            <Image
              ml={{ base: 2, lg: 3 }}
              src="/images/Schedule.svg"
              w={{ base: 4, lg: 6 }}
              h={{ base: 4, lg: 6 }}
              alt=""
              fill="currentColor"
              color={"white"}
            />
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default AthleteInfo;
