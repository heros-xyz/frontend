import { Box, Button, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

interface IWalletProps {
  title: string;
  tier?: number;
  isMembership: boolean;
  buttonContent?: string;
  onClickManage: () => void;
  onAddTier?: () => void;
  isLoading: boolean;
}

const Membership: React.FC<IWalletProps> = ({
  title,
  tier,
  isMembership,
  buttonContent,
  onClickManage,
  onAddTier,
  isLoading,
}) => {
  return (
    <Box
      bg="acccent.1"
      borderRadius={{ base: "lg", xl: "xl" }}
      px={{ base: 5, xl: 7 }}
      py={{ base: 3, xl: 5 }}
    >
      <Flex mb="1.5" justify="space-between" align="center">
        <Heading
          color="primary"
          fontSize={{ base: "md", xl: "xl" }}
          fontWeight="extrabold"
          textTransform="capitalize"
          lineHeight="140%"
        >
          {title}
        </Heading>
        {isMembership && (
          <Text
            cursor="pointer"
            fontSize={{ base: "xs", xl: "lg" }}
            fontWeight="medium"
            color="acccent.2"
            lineHeight="140%"
            onClick={onClickManage}
          >
            Manage
          </Text>
        )}
      </Flex>
      <Text
        fontSize={{ base: "xs", xl: "md" }}
        fontWeight="normal"
        color="primary"
      >
        {isMembership
          ? "You are currently offering."
          : "You are not offering any membership."}
      </Text>
      {isMembership ? (
        <Text
          mt={{ base: 3.5, xl: 7 }}
          fontSize={{ base: "md", xl: "xl" }}
          fontWeight="medium"
          color="primary"
          lineHeight="140%"
        >
          <Skeleton isLoaded={!isLoading} as="span">
            {tier}
          </Skeleton>{" "}
          Tier
        </Text>
      ) : (
        <Flex justify={{ base: "center", xl: "flex-end" }}>
          <Button
            variant="primary"
            width={{ base: "100%", xl: "auto" }}
            fontSize={{ base: "md", xl: "xl" }}
            h="48px"
            mt={{ base: 5, xl: 3.5 }}
            onClick={onAddTier}
          >
            {buttonContent}
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Membership;
