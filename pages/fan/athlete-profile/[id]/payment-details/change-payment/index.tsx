import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { If, Then } from "react-if";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ChangePayment from "@/modules/fan-dashboard/components/ChangePayment";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { useGetPaymentInfoQuery } from "@/api/fan";
import { AlertIcon } from "@/components/svg";
import { wrapper } from "@/store";

import { IGuards } from "@/types/globals/types";
import { setTokenToStore } from "@/utils/auth";

const PaymentInfo = () => {
  const router = useRouter();
  const { data } = useGetPaymentInfoQuery("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const handleBack = () => {
    router.push({
      pathname: "/fan/athlete-profile/[id]/payment-details/",
      query: {
        id: router.query.id,
        membershipTierId: router.query.membershipTierId,
      },
    });
  };
  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Fan | Update Payment Information</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "500px"]} position="relative">
        <Box w={{ xl: "500px" }}>
          <Box
            w="full"
            fontWeight="bold"
            pt={{ base: 5, xl: "3.75rem" }}
            mb={{ base: 5, lg: 8 }}
          >
            <ArrowLeft
              verticalAlign=""
              w={{ base: "14px", xl: "18px" }}
              h={{ base: "14px", xl: "18px" }}
              cursor="pointer"
              onClick={handleBack}
            />
            <Text
              as="span"
              ml="6"
              color="primary"
              fontSize={{ base: "xl", xl: "2xl" }}
            >
              Update Payment Information
            </Text>
          </Box>
          <ChangePayment
            idUpdate={Array.isArray(data) && data[0]?.id ? data[0].id : ""}
            isError={isError}
            setIsError={setIsError}
            idAthleteSubmit={router.query.id as string}
            idAthleteTier={router.query.membershipTierId as string}
            setErrorCode={setErrorCode}
          />
        </Box>
        <If condition={isError && (errorCode === 4001 || errorCode === 3000)}>
          <Then>
            <Flex
              position="absolute"
              bg="white"
              top="6"
              w={{ base: "355px", xl: "395px" }}
              px="4"
              py="6"
              borderRadius="8px"
              boxShadow="0px 0px 15px rgba(0, 0, 0, 0.2)"
            >
              <Center
                bg="#FEE2E2"
                w={{ base: "40px", xl: "50px" }}
                h={{ base: "40px", xl: "50px" }}
                borderRadius="full"
              >
                <AlertIcon w="16px" h="16px" />
              </Center>
              <Box ml="4">
                <Text fontSize={{ base: "sm", xl: "md" }} fontWeight="bold">
                  {errorCode === 4001 ? "Payment pending" : "Connection failed"}
                </Text>
                <Text fontSize={{ base: "xs", xl: "md" }}>
                  {errorCode === 4001
                    ? "We are now processing your payment. Almost done"
                    : "Activation of network connection failed"}
                </Text>
              </Box>
            </Flex>
          </Then>
        </If>
      </Container>
    </Box>
  );
};
export default PaymentInfo;

PaymentInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
