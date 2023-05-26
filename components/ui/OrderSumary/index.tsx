import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { getWebsiteLink } from "@/utils/link";
import { CorporateWebsiteLink } from "@/utils/enums";
interface OrderSummaryProps extends BoxProps {
  avatar: string;
  userName: string;
  tier: string;
  price: string;
  dateRenew: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  avatar,
  tier,
  userName,
  dateRenew,
  price,
  ...props
}) => {
  return (
    <Box bg="white" color="primary" {...props}>
      <Heading fontSize={{ base: "md", lg: "xl" }}>Order Summary</Heading>
      <Flex py={5} gap={2.5} color="black.primary">
        <Image
          w={{ base: "40px", lg: "60px" }}
          h={{ base: "40px", lg: "60px" }}
          src={avatar}
          alt="image"
          rounded="full"
          objectFit="cover"
          fallbackSrc="/images/DefaultAvaCircle.png"
        />
        <Box px={2.5}>
          <Heading as="span" fontSize="md" fontWeight={500}>
            {userName}
          </Heading>
          <Text fontFamily="heading" fontSize="sm">
            {tier}
          </Text>
        </Box>
        <Spacer />
        <Text
          fontWeight={{ base: 500, lg: 700 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          {price}
        </Text>
      </Flex>
      <Flex
        py={{ base: 2.5, lg: 3 }}
        gap={2.5}
        borderTopWidth={1}
        borderColor="grey.100"
        fontSize="md"
        color="black.primary"
      >
        <Text fontSize={{ base: "sm", lg: "lg" }} fontWeight={500}>
          Monthly payment
        </Text>
        <Spacer />
        <Text
          textAlign="end"
          fontWeight={{ base: 500, lg: 700 }}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          {price}
        </Text>
      </Flex>
      <Flex
        py={2.5}
        gap={2.5}
        borderTopWidth={1}
        borderColor="grey.100"
        fontSize={{ base: "sm", lg: "lg" }}
        fontWeight={700}
      >
        <Text>Due Today</Text>
        <Spacer />
        <Text fontSize={{ base: "sm", lg: "lg" }}>{price}</Text>
      </Flex>
      <Text py={2.5} gap={2.5} fontSize="sm" fontWeight={500}>
        Next payment due on {dateRenew}
      </Text>
      <Box
        mb={8}
        fontSize={{ base: "xs", lg: "md" }}
        fontWeight={500}
        color="grey.300"
      >
        <Text as="span">By clicking subscribe now, you agree to our </Text>
        <Link
          href={getWebsiteLink(CorporateWebsiteLink.TERM_AND_CONDITION)}
          target="_blank"
        >
          <Text as="span" textDecoration="underline">
            Terms of User
          </Text>
        </Link>
        <Text as="span"> and </Text>
        <Link
          href={getWebsiteLink(CorporateWebsiteLink.PRIVACY_POLICY)}
          target="_blank"
        >
          <Text as="span" textDecoration="underline">
            Privacy Policy
          </Text>
        </Link>
        <Text as="span">
          , and that this subscription automatically renews monthly. You&apos;ll
          be notified in advance if the monthly mount increases. Cancel anytime
          in your{" "}
        </Text>
        <Link href="/fan/active-subscriptions" target="_blank">
          <Text as="span" textDecoration="underline">
            membership settings
          </Text>
        </Link>
        {"."}
      </Box>
    </Box>
  );
};

export default OrderSummary;
