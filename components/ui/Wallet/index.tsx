import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  SkeletonCircle,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Else, If, Then } from "react-if";
import { formatMoney } from "@/utils/functions";

interface WalletProps {
  title: string;
  currentMoney: number;
  feePrice: number;
  timeReceive: string;
  havePaymentMethod: boolean;
  buttonContent?: string;
  onWithDrawMoney?: () => void;
  isLoading: boolean;
}

const Wallet: React.FC<WalletProps> = ({
  title,
  currentMoney,
  feePrice,
  buttonContent,
  onWithDrawMoney,
  isLoading,
}) => {
  return (
    <If condition={!isLoading}>
      <Then>
        <Box
          bg="accent.1"
          borderRadius={{ base: "lg", xl: "xl" }}
          px={{ base: 5, xl: 7 }}
          py={{ base: 3, xl: 5 }}
        >
          <Heading
            mb="1.5"
            color="primary"
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="extrabold"
            textTransform="capitalize"
            lineHeight="140%"
          >
            {title}
          </Heading>
          <Text
            mb="1.5"
            fontSize={{ base: "xs", xl: "md" }}
            fontWeight="normal"
            color="primary"
          >
            You currently have{" "}
            <SkeletonCircle as="b" isLoaded={!isLoading}>
              {formatMoney(currentMoney)}
            </SkeletonCircle>{" "}
            in your wallet.
            {currentMoney != 0 && (
              <>
                <br />({feePrice}% fee deducted)
              </>
            )}
          </Text>
          <Text
            fontSize={{ base: "xs", xl: "md" }}
            fontWeight="normal"
            color="primary"
          >
            {currentMoney != 0 &&
              `This can be transferred to your bank account.`}
          </Text>
          <Flex justify={{ base: "center", xl: "flex-end" }}>
            <Button
              variant="primary"
              width={{ base: "100%", xl: "auto" }}
              fontSize={{ base: "md", xl: "xl" }}
              h="48px"
              mt={{ base: 5, xl: 3.5 }}
              isDisabled={currentMoney == 0}
              onClick={onWithDrawMoney}
            >
              {buttonContent}
            </Button>
          </Flex>
        </Box>
      </Then>
      <Else>
        <Box
          bg="accent.1"
          borderRadius={{ base: "lg", xl: "xl" }}
          px={{ base: 5, xl: 7 }}
          py={{ base: 3, xl: 5 }}
        >
          <Heading
            mb="1.5"
            color="primary"
            fontSize={{ base: "md", xl: "xl" }}
            fontWeight="extrabold"
            textTransform="capitalize"
            lineHeight="140%"
          >
            {title}
          </Heading>
          <Stack>
            <Skeleton height="24px" w="60%" />
          </Stack>
          <Flex justifyContent="end" textAlign="right" mt={3}>
            <Skeleton
              height="48px"
              w={{ base: "100%", lg: "225px" }}
              rounded="8px"
            />
          </Flex>
        </Box>
      </Else>
    </If>
  );
};

export default Wallet;
