import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { Else, If, Then } from "react-if";
import { OutlineArrowIcon } from "@/components/svg/OutlineArrowIcon";
import { ITimeLineInfo } from "..";

interface IProps {
  item: ITimeLineInfo;
  canEdit?: boolean;
  setItemEdit?: (item: ITimeLineInfo) => void;
  isCurrent: boolean;
}

const nth = (date: string) => {
  const last = +date.slice(-2);
  if (last > 3 && last < 21) return "th";
  switch (last % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const getDay = (date: string) => {
  return dayjs(date).format("D");
};

const JourneyCard: React.FC<IProps> = ({
  item,
  canEdit,
  setItemEdit,
  isCurrent,
}) => {
  return (
    <Flex
      p={{ base: 2.5, lg: 4 }}
      pr={0}
      w={{ base: "80%", xl: "540px" }}
      color="primary"
      justifyContent="space-between"
      alignItems="center"
      // bg={isCurrent ? "accent.3" : "accent.1"}
      bg="grey.0"
      rounded="md"
      cursor={canEdit ? "pointer" : ""}
      onClick={() => setItemEdit && setItemEdit(item)}
    >
      <Box pr={2} w={{ base: "170px", sm: "75%" }}>
        <Heading fontSize={{ base: "xs", lg: "lg" }} mb={1}>
          {item.title}
        </Heading>
        <Text fontSize={{ base: "xxs", lg: "md" }}>{item.description}</Text>
      </Box>
      <Flex w={{ lg: "145px" }}>
        <Box w="1px" h={{ base: "51px", xl: "74px" }} bg="grey.300" />
        <If condition={item?.endDate}>
          <Then>
            <Box
              textAlign="center"
              fontSize="xxs"
              w={20}
              fontWeight="medium"
              flex={1}
            >
              <Box fontSize={{ base: "xxs", lg: "md" }}>
                <Text as="span">{getDay(item?.startDate)}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.startDate))}
                </Text>
                <Text as="span">
                  {dayjs(item?.startDate).format(" MMM YYYY")}
                </Text>
              </Box>
              <OutlineArrowIcon color="primary" />
              <Box fontSize={{ base: "xxs", lg: "md" }}>
                <Text as="span">{getDay(item?.endDate || "")}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.endDate || ""))}
                </Text>
                <Text as="span">
                  {dayjs(item?.endDate).format(" MMM YYYY")}
                </Text>
              </Box>
            </Box>
          </Then>
          <Else>
            <Box
              textAlign="center"
              pt={1}
              w={20}
              flex={1}
              fontSize={{ base: "xs", lg: "md" }}
            >
              <Box mb={1} fontWeight={500}>
                <Text as="span">{getDay(item?.startDate)}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.startDate))}
                </Text>
                <Text as="span">{dayjs(item?.startDate).format(" MMM")}</Text>
              </Box>
              <Text
                as="b"
                fontFamily="heading"
                fontSize={{ base: "md", xl: "xl" }}
              >
                {dayjs(item?.startDate).format("YYYY")}
              </Text>
            </Box>
          </Else>
        </If>
      </Flex>
    </Flex>
  );
};

export default JourneyCard;
