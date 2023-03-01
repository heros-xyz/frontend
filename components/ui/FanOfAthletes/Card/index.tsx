import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  WrapItem,
  BoxProps,
} from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import { Clock } from "@/components/svg/Clock";
import { IFanInfo } from "@/types/athlete/types";
interface YourAthleteCardProps extends BoxProps {
  item?: IFanInfo;
  dateFormat: string;
  onClickItem?: (item: IFanInfo) => void;
}

const YourAthleteCard: React.FC<YourAthleteCardProps> = ({
  item,
  dateFormat = "MMM YYYY",
  onClickItem,
  ...props
}) => {
  const joinedDate = dayjs(item?.createdAt).format(dateFormat);
  return (
    <Box
      borderBottomWidth="thin"
      borderColor="grey.100"
      bg="primary"
      py="4"
      cursor="pointer"
      _hover={{
        bg: "grey.dark",
      }}
      onClick={() => onClickItem && item && onClickItem(item)}
      {...props}
    >
      <Flex alignItems="center">
        <WrapItem>
          <Avatar
            w={{ base: "50px", lg: "80px" }}
            h={{ base: "50px", lg: "80px" }}
            src={item?.avatar}
          />
        </WrapItem>
        <Box pl={4}>
          <Heading fontSize={{ base: "12px", lg: "18px" }} color="white">
            {item?.fullName}
          </Heading>
          <Text
            as="span"
            color="secondary"
            fontSize={["xs", "md"]}
            fontWeight={["medium", "normal"]}
          >
            {item?.description || "Bronze Tier Subscribed"}
          </Text>
          <Flex
            fontSize={["xs", "md"]}
            alignItems="center"
            alignSelf="center"
            pt={["2", "1"]}
          >
            <Clock
              color="acccent.4"
              width={["15px", "18px"]}
              height={["15px", "18px"]}
            />
            <Text color="acccent.4" fontWeight="medium" pl={["2", "2.5"]}>
              Joined: {joinedDate}
            </Text>
          </Flex>
        </Box>
      </Flex>
      {/* <If condition={enableClickItem}>
        <Then>
          <FanOfAthleteProfile
            fanInfo={item}
            isOpen={isOpenFanProfile}
            onClose={() => setIsOpenFanProfile(false)}
          />
        </Then>
      </If> */}
    </Box>
  );
};

export default YourAthleteCard;
