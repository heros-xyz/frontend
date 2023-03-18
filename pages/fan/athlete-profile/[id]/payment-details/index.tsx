import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormikContext } from "formik";
import { Else, If, Then } from "react-if";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useUpdateEffect } from "react-use";
import { useSession } from "next-auth/react";
import Head from "next/head";
import {
  useAddPaymentInfoMutation,
  useGetAthleteTierMembershipQuery,
  useGetPaymentInfoQuery,
  useSubscribeAthleteMutation,
} from "@/api/fan";
import PaymentForm from "@/components/payment/PaymentForm";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import OrderSummary from "@/components/ui/OrderSumary";
import { formatMoney } from "@/utils/functions";
import { AlertIcon } from "@/components/svg";
import DeleteSubscription from "@/components/ui/DeleteSubscription";
import { useGetBasicInformationQuery } from "@/api/athlete";

const PaymentDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorCard, setErrorCard] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<
    | {
        data: { message: string; statusCode: number };
        status: number;
      }
    | {}
  >();
  const { data: dataAthlete } = useGetBasicInformationQuery(
    router.query.id as string,
    {
      skip: typeof router.query.id !== "string",
    }
  );
  const { data: paymentInfoList, isLoading: isGetPaymentLoading } =
    useGetPaymentInfoQuery("");
  const { data: tierMembershipList } = useGetAthleteTierMembershipQuery(
    {
      page: 1,
      take: 10,
      userId: router.query.id as string,
    },
    {
      skip: typeof router.query.id !== "string",
    }
  );

  const [
    submitSubscribe,
    {
      isLoading: loadingSubscribe,
      isSuccess: successSubscribe,
      isError: errorSubscribe,
    },
  ] = useSubscribeAthleteMutation();
  const [
    addPayment,
    { data: dataSuccess, isLoading: loadingAdd, error: errorAdd },
  ] = useAddPaymentInfoMutation();
  const { formik, isValid, submitCount, handleSubmit, values } =
    usePaymentForm();

  const onSubmit = () => {
    if (
      router.query.membershipTierId &&
      paymentInfoList?.length &&
      tierMembershipList?.data?.length
    ) {
      submitSubscribe({
        targetUserId: router.query.id as string,
        membershipTierId: router.query.membershipTierId as string,
        paymentInformationId: paymentInfoList[0]?.id ?? "",
      });
    }
    if (!paymentInfoList?.length) {
      addPayment(values);
    }
  };

  //Handle Add Card Success
  useUpdateEffect(() => {
    if (dataSuccess) {
      submitSubscribe({
        targetUserId: router.query.id as string,
        membershipTierId: router.query.membershipTierId as string,
        paymentInformationId: dataSuccess?.id ?? "",
      });
    }
  }, [dataSuccess]);

  const tierSelected = useMemo(() => {
    if (tierMembershipList?.data?.length) {
      return tierMembershipList.data.find(
        (item) => item.id === router.query.membershipTierId
      );
    }
  }, [tierMembershipList]);

  useEffect(() => {
    if (submitCount && (paymentInfoList?.length || isValid)) {
      onSubmit();
    }
  }, [submitCount]);

  //Handle Subscribe Success
  useUpdateEffect(() => {
    if (successSubscribe)
      router.push(
        `/fan/athlete-profile/${router.query.id as string}/member-confirmed`
      );
  }, [successSubscribe]);

  //Handle Add Card Error
  useUpdateEffect(() => {
    if (!!errorAdd) {
      setErrorData(errorAdd);
    }
  }, [errorAdd]);
  useUpdateEffect(() => {
    if (errorData && "data" in errorData) {
      if (errorData.data.statusCode === 3002) {
        setErrorCard(true);
        setTimeout(() => {
          setErrorCard(false);
        }, 5000);
      }
      if (errorData.data.statusCode === 3000) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    }
  }, [errorData]);

  //Handle Add Subscribe Error
  useUpdateEffect(() => {
    if (errorSubscribe) {
      onOpen();
    }
  }, [errorSubscribe]);

  return (
    <Box
      bg="white"
      minH="100vh"
      color="primary"
      py={{ base: 5, xl: 12 }}
      pb={10}
      position="relative"
    >
      <Head>
        <title>Fan | Payment Details</title>
      </Head>
      <Container size={["base", "sm", "md", "lg", "xl"]}>
        <FormikContext.Provider value={formik}>
          <Grid
            templateAreas={{
              base: `"header"
                  "detail"
                  "summary"
                  "button"`,
              xl: `"header summary"
                 "detail summary"
                 "button summary"`,
            }}
            gridTemplateColumns={{ xl: "500px 660px" }}
            alignItems="center"
          >
            <GridItem area={"header"}>
              <Heading fontSize={{ base: "xl", lg: "2xl" }} mb={7}>
                Payment Details
              </Heading>
            </GridItem>
            <GridItem area={"detail"} color="black">
              <If condition={paymentInfoList && paymentInfoList?.length > 0}>
                <Then>
                  <Box>
                    <Box
                      fontWeight="medium"
                      fontSize={{ base: "sm", xl: "lg" }}
                    >
                      Payment Method{" "}
                      <Text as="span" color="error.dark">
                        *
                      </Text>
                    </Box>
                    <Flex
                      justifyContent="space-between"
                      mt={5}
                      fontSize={{ base: "md", xl: "xl" }}
                    >
                      <Text>
                        Visa ****
                        {paymentInfoList
                          ? paymentInfoList[0]?.cardNumber.slice(-4)
                          : ""}
                        ,{" "}
                        {paymentInfoList
                          ? paymentInfoList[0]?.expiredDate?.replace("/", "/20")
                          : ""}
                      </Text>
                      <Text
                        as="ins"
                        cursor="pointer"
                        color="secondary"
                        onClick={() => {
                          router.push({
                            pathname: "payment-details/change-payment",
                            query: {
                              id: router.query.id,
                              membershipTierId: router.query.membershipTierId,
                            },
                          });
                        }}
                      >
                        Change
                      </Text>
                    </Flex>
                  </Box>
                </Then>
                <Else>
                  <PaymentForm />
                </Else>
              </If>
            </GridItem>
            <GridItem area={"button"}>
              <Box textAlign={"right"} mt={{ base: 5, xl: "50px" }}>
                <Button
                  variant="secondary"
                  w={{ base: "full", lg: "fit-content" }}
                  size="lg"
                  onClick={() => {
                    handleSubmit();
                  }}
                  isLoading={loadingSubscribe || loadingAdd}
                >
                  Subscribe Now
                </Button>
              </Box>
              <If condition={errorCard}>
                <Then>
                  <Flex
                    flexDirection={{ base: "column", xl: "row" }}
                    color="error.dark"
                    mt={{ base: 4, xl: 5 }}
                    justifyContent={{ xl: "end" }}
                    alignItems={{ base: "center", xl: "normal" }}
                    fontSize="xs"
                  >
                    <Text>Your credit card was declined.</Text>
                    <Text ml={{ xl: 1 }}>
                      Try paying with another credit card.
                    </Text>
                  </Flex>
                </Then>
              </If>
            </GridItem>
            <GridItem
              area={"summary"}
              ml={{ xl: "80px" }}
              borderLeft={{ xl: "1px" }}
              borderColor={{ xl: "grey.300" }}
              pl={{ xl: "80px" }}
            >
              <OrderSummary
                mt={8}
                avatar={session?.user.avatar ?? ""}
                userName={dataAthlete?.nickName ?? ""}
                dateRenew={dayjs(new Date()).format("DD MMM YYYY")}
                price={formatMoney(tierSelected?.monthlyPrice as number, true)}
                tier={tierSelected?.name ?? ""}
              />
            </GridItem>
          </Grid>
        </FormikContext.Provider>
      </Container>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          pt="5"
          px="4"
          maxW="unset"
          w={{ base: "95%", lg: "740px" }}
        >
          <DeleteSubscription
            name=" "
            message="Your payment method was declined. Please update!"
            confirm="Update payment"
            cancel="Not right now"
            onCancel={onClose}
            onSubmit={() => router.push("/fan/payment/update")}
          />
        </ModalContent>
      </Modal>
      <If condition={isError}>
        <Then>
          <Center>
            <Flex
              position="absolute"
              bg="white"
              top="6"
              w={{ base: "355px", xl: "395px" }}
              px="4"
              py="6"
              borderRadius="8px"
            >
              <Center
                bg="#FEE2E2"
                w={{ base: "40px", xl: "50px" }}
                h={{ base: "40px", xl: "50px" }}
                borderRadius="full"
              >
                <AlertIcon w="16px" h="16px" />
              </Center>
              <Box ml="4" color="primary">
                <Text fontSize={{ base: "sm", xl: "md" }} fontWeight="bold">
                  Connection failed
                </Text>
                <Text fontSize={{ base: "xs", xl: "md" }}>
                  Activation of network connection failed
                </Text>
              </Box>
            </Flex>
          </Center>
        </Then>
      </If>
    </Box>
  );
};

export default PaymentDetails;
