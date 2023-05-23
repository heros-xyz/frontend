import {
  Box,
  Flex,
  Heading,
  Text,
  WrapItem,
  BoxProps,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { IAthleteSubscribed } from "@/types/athlete/types";
import { Clock } from "@/components/svg/Clock";
import HerosImage from "@/components/common/HerosImage";
interface YourAthleteCardProps extends BoxProps {
  item: IAthleteSubscribed;
}

const CardRecommend: React.FC<YourAthleteCardProps> = ({ item, ...props }) => {
  const joinedDate = dayjs(item?.joinedDate ?? item?.createdAt).format(
    "DD/MM/YYYY"
  );
  return (
    <Box
      borderBottomWidth="thin"
      borderColor="grey.100"
      bg="white"
      py="4"
      cursor="pointer"
      _hover={{}}
      {...props}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <WrapItem>
            <HerosImage
              src={item?.avatar}
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
              {item?.sportName}
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

        <Link href={`/fan/athlete-profile/${item.athleteId}?current=3`}>
          <Button
            px={2}
            fontSize={{ base: "sm", xl: "md" }}
            bg="white"
            border="2px"
            borderColor="primary"
            color="primary"
          >
            Subscribe
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default CardRecommend;
