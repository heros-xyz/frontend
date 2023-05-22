import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import { FlagIcon } from "@/components/svg/Flag";
import { IAthleteSearchProfile } from "@/types/athlete/types";
import { getImageLink } from "@/utils/link";
import { formatNumber } from "@/utils/functions";
import HerosImage from "@/components/common/HerosImage";
import SearchResultSkeleton from "./Skeleton";

interface SearchResultProps extends BoxProps {
  data: IAthleteSearchProfile[];
  title: string;
  searchValue: string;
  onLoadMore: () => void;
  hasNextPage: boolean;
}
const SearchResult: React.FC<SearchResultProps> = ({
  data,
  title,
  searchValue,
  onLoadMore,
  hasNextPage,
  ...props
}) => {
  return (
    <Box color="primary" w={{ base: "auto", xl: "31.25rem" }} {...props}>
      <Text as="b" fontSize={{ base: "xl", xl: "2xl" }}>
        {title}
      </Text>
      <Box mt={{ base: 3, xl: 7 }}>
        {data.length === 0 && (
          <Box color="grey.300">
            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              mb={{ base: 1, lg: 3 }}
              fontWeight="700"
            >
              No athletes found matching {`"${searchValue}"`}
            </Text>
            <Text fontSize={{ base: "sm", lg: "md" }}>
              Try searching for something else. Use athlete&apos;s first names,
              last names and nicknames, their clubs, their sports, their profile
              tags and their countries
            </Text>
          </Box>
        )}
        {data.map((el: IAthleteSearchProfile, index: number) => (
          <Link href={`/fan/athlete-profile/${el?.id}`} key={el?.id}>
            <Flex
              pt={{ base: 2, xl: 4 }}
              pb={{ base: 3, xl: 5 }}
              borderBottom={"1px"}
              borderTop={index === 0 ? "1px" : "0"}
              borderColor="grey.100"
              alignItems="center"
            >
              <HerosImage
                src={el?.avatar}
                width={{ base: "50px", lg: "80px" }}
                height={{ base: "50px", lg: "80px" }}
              />
              <Box
                ml={4}
                color="primary"
                fontSize={{ base: "xs", xl: "md" }}
                pt={1}
              >
                <Text
                  fontWeight={700}
                  mb={1}
                  fontSize={{ base: "xs", xl: "lg" }}
                >
                  {el?.nickName ?? el?.fullName}
                </Text>
                <Text
                  pb={1}
                  fontSize={{ base: "xs", xl: "md" }}
                  fontWeight="500"
                  color="secondary"
                >
                  {el?.isCurrentUserSubscribed
                    ? el?.membershipTier?.name
                    : el.sport?.label}
                </Text>
                <Flex
                  flexDirection={"row"}
                  fontWeight="500"
                  fontSize={{ base: "xs", xl: "base" }}
                >
                  <FlagIcon mr={2} w="12px" />
                  <Text
                    pr={2}
                    borderRight="1px"
                    border={el.fan ? "1px" : "none"}
                  >
                    {el?.totalInteractions
                      ? formatNumber(el?.totalInteractions)
                      : 0}{" "}
                    interactions
                  </Text>

                  <Text borderLeft={"1px"} pl={2}>
                    {el.totalFan ? formatNumber(el.totalFan) : 0}{" "}
                    {el.totalFan > 1 ? "fans" : "fan"}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Link>
        ))}
        {hasNextPage && (
          <Waypoint onEnter={onLoadMore}>
            <Box>
              <SearchResultSkeleton />
            </Box>
          </Waypoint>
        )}
      </Box>
    </Box>
  );
};

export default SearchResult;
