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
import Head from "next/head";
import PaymentForm from "@/components/payment/PaymentForm";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import OrderSummary from "@/components/ui/OrderSumary";
import { formatMoney } from "@/utils/functions";
import { AlertIcon } from "@/components/svg";
import DeleteSubscription from "@/components/modal/DeleteSubscription";
import { IHerosError } from "@/types/globals/types";
import { useMembershipsFromAthlete } from "@/libs/dtl/membershipTiers";
import { useGetAthleteProfileByUid } from "@/libs/dtl/athleteProfile";
import { Payment, usePaymentMethods } from "@/libs/dtl/payment";
import { useSubscribeToAthlete } from "@/libs/dtl/subscription";

const PaymentDetails = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [errorCard, setErrorCard] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<unknown>(null);
  const { data: athleteProfile, loading: loadingAthleteProfile } =
    useGetAthleteProfileByUid(router?.query?.id as string);
  const {
    data: paymentInfoListTotal,
    dataStatus: { loading: loadingPaymentMethods },
  } = usePaymentMethods();
  const { data: tierMembershipList } = useMembershipsFromAthlete(
    router.query.id as string
  );

  const paymentInfoList = paymentInfoListTotal?.filter(
    (paymentData) => !paymentData?.error
  );

  const {
    create: submitSubscribe,
    loading: loadingSubscribe,
    success: successSubscribe,
    error: errorSubscribe,
  } = useSubscribeToAthlete();

  const {
    create: addPayment,
    data: dataSuccess,
    dataStatus: { loading: loadingAdd, error: errorPayment },
  } = usePaymentMethods();

  const [newPaymentId, setNewPaymentId] = useState<string | null>(null);
  const newPayment = dataSuccess?.find?.((payment) =>
    payment.id === newPaymentId ? payment : null
  );

  const { formik, isValid, submitCount, handleSubmit, values } =
    usePaymentForm();

  const onSubmit = async () => {
    if (
      router.query.membershipTierId &&
      paymentInfoList?.length &&
      tierMembershipList?.length
    ) {
      await submitSubscribe({
        membershipTier: router.query.membershipTierId as string,
        paymentMethod: paymentInfoList?.[0]?.id ?? "",
      });
      return;
    }
    if (!paymentInfoList?.length) {
      const docRef = await addPayment({
        cardName: values.nameOnCard,
        cardNumber: values.cardNumber,
        cardExpMonth: +values.expiredDate.split("/")[0],
        cardExpYear: +values.expiredDate.split("/")[1],
        cardCvc: values.cvv,
        expiredDate: values?.expiredDate,
      } as Payment);

      if (docRef?.id) {
        setNewPaymentId(docRef?.id);
      }
    }
  };

  const loadingPaymentAfterSubmit =
    newPayment?.id !== null &&
    newPaymentId !== null &&
    !newPayment?.stripePayment &&
    !newPayment?.error;
  const newPaymentHasError =
    !!newPayment?.id && !newPayment?.stripePayment && !!newPayment?.error;

  useEffect(() => {
    if (newPaymentHasError) {
      onOpen();
    }
  }, [loadingPaymentAfterSubmit, newPaymentHasError]);

  const tierSelected = useMemo(() => {
    if (tierMembershipList?.length) {
      return tierMembershipList?.find(
        (item) => item?.id === router?.query?.membershipTierId
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

  useUpdateEffect(() => {
    if (errorData) {
      if ((errorData as unknown as IHerosError).data.statusCode === 3002) {
        setErrorCard(true);
        setTimeout(() => {
          setErrorCard(false);
        }, 5000);
      }
      if ((errorData as unknown as IHerosError).data.statusCode === 3000) {
        setIsError(true);
        setErrorCode(3000);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
      if ((errorData as unknown as IHerosError).data.statusCode === 4001) {
        setIsError(true);
        setErrorCode(4001);
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

  console.log({ paymentInfoList, errorData });

  if (loadingAthleteProfile || loadingPaymentMethods) {
    return <></>;
  }

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
            <GridItem area={"detail"} color="black.primary">
              <If
                condition={
                  !loadingPaymentAfterSubmit &&
                  paymentInfoList &&
                  paymentInfoList?.length > 0
                }
              >
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
                        <Text as="span" textTransform="capitalize">
                          {paymentInfoList?.[0]?.stripePayment?.card?.brand?.toLocaleLowerCase?.() ??
                            ""}
                        </Text>{" "}
                        ****
                        {paymentInfoList
                          ? paymentInfoList?.[0]?.stripePayment?.card?.last4
                          : ""}
                        ,{" "}
                        {paymentInfoList
                          ? `${paymentInfoList?.[0]?.stripePayment?.card?.exp_month}/${paymentInfoList[0]?.stripePayment?.card?.exp_year}`
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
                  isLoading={
                    loadingSubscribe || loadingAdd || loadingPaymentAfterSubmit
                  }
                >
                  Subscribe Now
                </Button>
              </Box>
              <If
                condition={
                  errorCard && (errorCode === 4001 || errorCode === 3000)
                }
              >
                <Then>
                  <Flex
                    flexDirection={{ base: "column", xl: "row" }}
                    color="error.dark"
                    mt={{ base: 4, xl: 5 }}
                    justifyContent={{ xl: "end" }}
                    alignItems={{ base: "center", xl: "normal" }}
                    fontSize="xs"
                  >
                    <Text>
                      {errorCode === 4001
                        ? "Payment pending"
                        : "Connection failed"}
                    </Text>
                    <Text ml={{ xl: 1 }}>
                      {errorCode === 4001
                        ? "We are now processing your payment. Almost done"
                        : "Activation of network connection failed"}
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
                avatar={athleteProfile?.avatar ?? ""}
                userName={athleteProfile?.nickName ?? ""}
                dateRenew={dayjs(new Date())
                  .add(1, "month")
                  .format("DD MMM YYYY")}
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
