import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import React from "react";
import { If, Then, Else } from "react-if";
import NextLink from "next/link";
import {
  IconCheck,
  IconPage,
  IconBasic,
  IconSport,
  IconCarrer,
} from "@/components/svg/Checklist";

export interface ChecklistProps {
  title: string;
  description: string;
  checked: boolean;
  type: "page" | "basic" | "sport" | "career";
  responseType:
    | "hasBasicInformation"
    | "hasPageInformation"
    | "hasSportProfile"
    | "hasCareerJourney";
  link?:
    | "basic-information"
    | "career-journey"
    | "page-information"
    | "sport-profile";
}

const Checklist: React.FC<ChecklistProps> = ({
  title,
  description,
  checked,
  type,
  link,
}) => {
  const Icon = () => {
    switch (type) {
      case "page":
        return (
          <IconPage
            color={checked ? "primary" : "white"}
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
          />
        );
      case "basic":
        return (
          <IconBasic
            color={checked ? "primary" : "white"}
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
          />
        );
      case "sport":
        return (
          <IconSport
            color={checked ? "primary" : "white"}
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
          />
        );
      case "career":
        return (
          <IconCarrer
            color={checked ? "primary" : "white"}
            w={{ base: "32px", lg: "48px" }}
            h={{ base: "32px", lg: "48px" }}
          />
        );
      default:
        break;
    }
  };
  return (
    <Box
      bg={checked ? "secondary" : "primary"}
      p={{ base: "14px", lg: "30px" }}
      borderRadius="md"
      border={checked ? "2px" : ""}
      borderStyle={checked ? "solid" : ""}
      borderColor={checked ? "primary" : ""}
      h={checked ? { lg: "228px" } : { lg: "312px" }}
      position={{ lg: "relative" }}
    >
      <Flex
        gap={3}
        direction={{ base: "row", lg: "column" }}
        justify="space-between"
        align={{ base: "center", lg: "flex-start" }}
      >
        <Box>{Icon()}</Box>
        <Box flex={1}>
          <Heading
            color={checked ? "primary" : "white"}
            fontSize={{ base: "sm", lg: "xl" }}
            fontWeight="bold"
            lineHeight={{ base: "20px", lg: "28px" }}
            textTransform="capitalize"
            marginBottom={0.5}
          >
            {title}
          </Heading>
          <Text
            as="p"
            color={checked ? "primary" : "white"}
            fontSize={{ base: "10px", lg: "16px" }}
            letterSpacing={{ base: "small", lg: "normal" }}
          >
            {description}
          </Text>
        </Box>
        <If condition={checked}>
          <Then>
            <Box
              position={{ lg: "absolute" }}
              top={{ lg: "30px" }}
              right={{ lg: "30px" }}
            >
              <IconCheck
                w={{ base: "32px", lg: "48px" }}
                h={{ base: "32px", lg: "48px" }}
              />
            </Box>
          </Then>
          <Else>
            <Link
              as={NextLink}
              href={`/athlete/onboarding/${link}`}
              w={{ lg: "100%" }}
            >
              <Box
                pt={{ base: "8px", lg: "10px" }}
                pb={{ base: "8px", lg: "10px" }}
                pr={{ base: "16px", lg: "20px" }}
                pl={{ base: "16px", lg: "20px" }}
                bg="secondary"
                borderRadius={3}
                w={{ base: "48px", lg: "full" }}
                h={{ base: "28px", lg: "48px" }}
                marginTop={{ lg: "30px" }}
              >
                <Text
                  fontSize={{ base: "xxs", lg: "lg" }}
                  fontWeight="bold"
                  lineHeight={{ base: "12px", lg: "28px" }}
                  display="flex"
                  alignItems="center"
                  textAlign={{ base: "center", lg: "center" }}
                  justifyContent={{ lg: "center" }}
                >
                  GO
                </Text>
              </Box>
            </Link>
          </Else>
        </If>
      </Flex>
    </Box>
  );
};

export default Checklist;
