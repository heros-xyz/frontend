import React from "react";
import { Flex, Text, Heading, BoxProps, Box } from "@chakra-ui/react";
import Link from "next/link";
import { Else, If, Then } from "react-if";
import { Waypoint } from "react-waypoint";
import { ADMIN_ROLE, ATHLETE_ROLE, FAN_ROLE } from "@/utils/constants";
import { IAthleteSubscribed, IFanInfo } from "@/types/athlete/types";
import YourAthleteCard from "../Card";
import SearchResultSkeleton from "../../SearchResult/Skeleton";
import CardRecommend from "../CardRecommend";

interface YourAthletesProps extends BoxProps {
  athleteList: IFanInfo[];
  athleteRecommendList?: IAthleteSubscribed[];
  hasFanText?: boolean;
  role: "ATHLETE" | "FAN" | "ADMIN";
  dateFormat?: string;
  isSearching?: boolean;
  hasNextPage: boolean;
  hasNextRecommendPage?: boolean;
  total: number;
  isAdmin?: boolean;
  onLoadMoreRecommend?: () => void;
  onLoadMore: () => void;
  onSelectedItem?: (item: IFanInfo) => void;
}
const YourAthletesList: React.FC<YourAthletesProps> = ({
  athleteList,
  athleteRecommendList,
  hasFanText = true,
  dateFormat = "MMM YYYY",
  role,
  isSearching,
  hasNextPage,
  total,
  hasNextRecommendPage,
  isAdmin,
  onLoadMore,
  onSelectedItem,
  onLoadMoreRecommend,
  ...props
}) => {
  return (
    <Box {...props}>
      {hasFanText && (
        <Heading
          color="primary"
          pb={{ base: "15px", lg: "15px" }}
          pt={{ base: "32px", lg: "40px" }}
          fontSize={{ base: "12px", lg: "16px" }}
          fontWeight="normal"
        >
          {total
            ? (isSearching ? `Showing` : `You are having`) +
              ` ${total > 1 ? `${total} fans` : `${total} fan`}`
            : role === ATHLETE_ROLE && !isSearching
            ? "You currently have no fan yet."
            : "No results."}
        </Heading>
      )}
      <If condition={!!athleteList}>
        <Then>
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <Text
                as="span"
                w="100%"
                borderTopWidth="thin"
                borderColor="grey.100"
              />
              {athleteList?.map((item) => (
                <If condition={role === FAN_ROLE} key={item.athleteId}>
                  <Then>
                    <Link href={`/fan/athlete-profile/${item.athleteId}`}>
                      <YourAthleteCard
                        isAdmin={isAdmin}
                        item={item}
                        dateFormat={dateFormat}
                      />
                    </Link>
                  </Then>
                  <Else>
                    <YourAthleteCard
                      isAdmin={isAdmin}
                      item={item}
                      dateFormat={dateFormat}
                      onClickItem={onSelectedItem}
                    />
                  </Else>
                </If>
              ))}
              {hasNextPage && (
                <Waypoint onEnter={onLoadMore}>
                  <Box>
                    <SearchResultSkeleton />
                  </Box>
                </Waypoint>
              )}
              <If condition={role === "FAN" && !!athleteRecommendList}>
                <Then>
                  {athleteRecommendList?.map((item, index) => (
                    <Link
                      href={`/fan/athlete-profile/${item.athleteId}`}
                      key={`${"key" + index}`}
                    >
                      <CardRecommend item={item} />
                    </Link>
                  ))}
                  {hasNextRecommendPage && (
                    <Waypoint onEnter={onLoadMoreRecommend}>
                      <Box>
                        <SearchResultSkeleton />
                      </Box>
                    </Waypoint>
                  )}
                </Then>
              </If>
            </Flex>
          </Flex>
        </Then>
      </If>
    </Box>
  );
};

export default YourAthletesList;
