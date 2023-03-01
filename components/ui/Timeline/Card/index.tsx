import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Else, If, Then } from "react-if";
import dayjs from "dayjs";
import { OutlineArrowIcon } from "@/components/svg/OutlineArrowIcon";
import { ITimeLineInfo } from "..";
interface IProps {
  item: ITimeLineInfo;
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

const JourneyCard: React.FC<IProps> = ({ item }) => {
  return (
    <Flex
      p={{ base: 2.5, lg: 4 }}
      pr={0}
      w={{ base: "80%", sm: "100%" }}
      color="primary"
      justifyContent="space-between"
      alignItems="center"
      bg={item.isCurrent ? "acccent.4" : "acccent.1"}
      rounded="md"
    >
      <Box pr={2} w={{ base: "170px", sm: "75%" }}>
        <Heading fontSize={{ base: "xs", lg: "lg" }} mb={1}>
          {item.title}
        </Heading>
        <Text fontSize={{ base: "xxs", lg: "md" }}>{item.description}</Text>
      </Box>
      <Flex w={{ lg: "145px" }}>
        <Box w="1px" h={51} bg={item.isCurrent ? "primary" : "white"} />
        <If condition={item?.to}>
          <Then>
            <Box
              textAlign="center"
              fontSize="xxs"
              w={20}
              fontWeight="medium"
              flex={1}
            >
              <Box fontSize={{ base: "xxs", lg: "md" }}>
                <Text as="span">{getDay(item?.from)}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.from))}
                </Text>
                <Text as="span">{dayjs(item?.from).format(" MMM YYYY")}</Text>
              </Box>
              <OutlineArrowIcon />
              <Box fontSize={{ base: "xxs", lg: "md" }}>
                <Text as="span">{getDay(item?.to || "")}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.to || ""))}
                </Text>
                <Text as="span">{dayjs(item?.to).format(" MMM YYYY")}</Text>
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
                <Text as="span">{getDay(item?.from)}</Text>
                <Text as="sup" fontSize={{ base: "8px", lg: "xxs" }}>
                  {nth(getDay(item?.from))}
                </Text>
                <Text as="span">{dayjs(item?.from).format(" MMM")}</Text>
              </Box>
              <Text as="b" fontFamily="heading">
                {dayjs(item?.from).format("YYYY")}
              </Text>
            </Box>
          </Else>
        </If>
      </Flex>
    </Flex>
  );
};

export default JourneyCard;
