import React from "react";
import { Flex, Text, Heading, BoxProps, Box } from "@chakra-ui/react";
import Link from "next/link";
import { Else, If, Then } from "react-if";
import { IFanInfo } from "@/types/athlete/types";
import YourAthleteCard from "../Card";

interface YourAthletesProps extends BoxProps {
  athleteList: IFanInfo[];
  hasFanText?: boolean;
  role: "ATHLETE" | "FAN";
  dateFormat?: string;
  onSelectedItem?: (item: IFanInfo) => void;
  isSearching?: boolean;
}
const YourAthletesList: React.FC<YourAthletesProps> = ({
  athleteList,
  hasFanText = true,
  dateFormat = "MMM YYYY",
  role,
  onSelectedItem,
  isSearching,
  ...props
}) => {
  return (
    <Box {...props}>
      {hasFanText && (
        <Heading
          color="white"
          pb={{ base: "15px", lg: "15px" }}
          pt={{ base: "32px", lg: "40px" }}
          fontSize={{ base: "12px", lg: "16px" }}
          fontWeight="normal"
        >
          {athleteList?.length
            ? (isSearching ? `Showing` : `You are having`) +
              ` ${
                athleteList?.length > 1
                  ? `${athleteList?.length} fans`
                  : `${athleteList?.length} fan`
              }`
            : "No results."}
        </Heading>
      )}
      <If condition={athleteList?.length}>
        <Then>
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <Text
                as="span"
                w="100%"
                borderTopWidth="thin"
                borderColor="grey.100"
              />
              {athleteList?.map((item, index) => (
                <If condition={role === "FAN"} key={`${"key" + index}`}>
                  <Then>
                    <Link href={`/fan/athlete-profile/${item.id}`}>
                      <YourAthleteCard item={item} dateFormat={dateFormat} />
                    </Link>
                  </Then>
                  <Else>
                    <YourAthleteCard
                      item={item}
                      dateFormat={dateFormat}
                      onClickItem={onSelectedItem}
                    />
                  </Else>
                </If>
              ))}
            </Flex>
          </Flex>
        </Then>
      </If>
    </Box>
  );
};

export default YourAthletesList;
