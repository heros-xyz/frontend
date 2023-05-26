import { Box, Flex, Heading, Text, WrapItem, BoxProps } from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import { Clock } from "@/components/svg/Clock";
import { IFanInfo } from "@/types/athlete/types";
import HerosImage from "@/components/common/HerosImage";
interface YourAthleteCardProps extends BoxProps {
  item?: IFanInfo;
  isAdmin?: boolean;
  dateFormat: string;
  onClickItem?: (item: IFanInfo) => void;
}

const YourAthleteCard: React.FC<YourAthleteCardProps> = ({
  item,
  dateFormat = "MMM YYYY",
  isAdmin,
  onClickItem,
  ...props
}) => {
  const joinedDate = dayjs(item?.joinedDate ?? item?.createdAt).format(
    dateFormat
  );
  return (
    <Box
      borderBottomWidth="thin"
      borderColor="grey.100"
      bg="white"
      py="4"
      cursor="pointer"
      onClick={() => onClickItem && item && onClickItem(item)}
      {...props}
    >
      <Flex alignItems="center">
        <WrapItem>
          <HerosImage
            src={item?.avatar ?? ""}
            width={{ base: "50px", lg: "80px" }}
            height={{ base: "50px", lg: "80px" }}
          />
        </WrapItem>
        <Box pl={4}>
          <Heading fontSize={{ base: "12px", lg: "18px" }} color="primary">
            {item?.nickName ?? item?.fullName}
          </Heading>
          <Text
            as="span"
            color="secondary"
            fontSize={["xs", "md"]}
            fontWeight={["medium", "normal"]}
          >
            {isAdmin ? item?.sportName : "Bronze Tier"}
          </Text>
          <Flex
            fontSize={["xs", "md"]}
            alignItems="center"
            alignSelf="center"
            pt={["2", "1"]}
          >
            <Clock
              color="primary"
              width={["15px", "18px"]}
              height={["15px", "18px"]}
            />
            <Text color="primary" fontWeight="medium" pl={["2", "2.5"]}>
              Joined Date: {joinedDate}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default YourAthleteCard;
