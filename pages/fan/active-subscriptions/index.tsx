import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Else, If, Then } from "react-if";
import { useUpdateEffect } from "react-use";
import Head from "next/head";
import FanDashboardLayout from "@/layouts/FanDashboard";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import {
  useDeleteSubscriptionsMutation,
  useGetActiveSubscriptionsQuery,
} from "@/api/fan";
import ClockMiniIcon from "@/components/svg/ClockMiniIcon";
import { GetActiveSubscription } from "@/types/fan/types";
import DeleteSubscription from "@/components/ui/DeleteSubscription";
import { getImageLink } from "@/utils/link";

const PaymentInfo = () => {
  const router = useRouter();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();

  const [dataCancel, setDataCancel] = useState<GetActiveSubscription>();
  const [dataRender, setDataRender] = useState<GetActiveSubscription[]>();
  const { data: dataSub, refetch } = useGetActiveSubscriptionsQuery("");
  const [deleteSub, { isSuccess: successDeleted, isLoading }] =
    useDeleteSubscriptionsMutation();

  const handleBack = () => {
    router.push("/fan/my-profile");
  };
  const handleConfirm = (id: string | undefined) => {
    if (id !== undefined) {
      deleteSub(id);
    }
  };

  useEffect(() => {
    if (dataSub) {
      setDataRender(dataSub?.data?.filter((el) => el?.status === "ACTIVE"));
    }
  }, [dataSub]);

  useUpdateEffect(() => {
    onCloseConfirm();
    onOpenSuccess();
    refetch();
  }, [successDeleted]);

  useEffect(() => {
    onCloseConfirm();
    onCloseSuccess();
  }, []);

  return (
    <Box bg="primary" minH="100vh" position="relative">
      <Head>
        <title>Fan | Active Subscriptions</title>
      </Head>
      <Center>
        <Box
          w={{ base: "full", xl: "500px" }}
          fontSize={{ base: "xs", xl: "md" }}
          pb={{ base: "60px", xl: 0 }}
        >
          <Box
            w="full"
            fontWeight="bold"
            px={{ base: 5, xl: 0 }}
            pt={{ base: 5, xl: "3.75rem" }}
            mb={{ base: 5, xl: "30px" }}
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
              color="white"
              fontSize={{ base: "xl", xl: "2xl" }}
            >
              Active Subscriptions
            </Text>
          </Box>
          {dataRender?.map((el) => (
            <Box
              key={el?.id}
              w="full"
              color="white"
              borderTop="1px"
              borderBottom={
                el == dataRender[dataRender.length - 1] ? "1px" : ""
              }
              borderColor="grey.100"
            >
              <Flex px={{ base: "5", xl: 0 }}>
                <Center w={{ base: "15%", xl: "16%" }}>
                  <Image
                    src={getImageLink(el?.avatar)}
                    alt=""
                    borderRadius="50%"
                    boxSize={{ base: "50px", xl: "80px" }}
                    loading="lazy"
                    zIndex={1}
                    fallbackSrc="https://via.placeholder.com/50"
                    cursor="pointer"
                    onClick={() =>
                      router.push(`/fan/athlete-profile/${el?.athleteId}`)
                    }
                  />
                </Center>
                <Box
                  p={{ base: "2.5", xl: "5" }}
                  py={{ xl: "4" }}
                  w={
                    el?.autoRenew
                      ? { base: "55%", xl: "64%" }
                      : { base: "85%", xl: "84%" }
                  }
                  fontWeight="medium"
                  cursor="pointer"
                  onClick={() =>
                    router.push(`/fan/athlete-profile/${el?.athleteId}`)
                  }
                >
                  <Text fontWeight="bold" fontSize={{ xl: "xl" }}>
                    {el?.nickName ?? el?.fullName}
                  </Text>
                  <Text color="secondary">
                    Monthly price: ${el?.monthlyPrice} per month
                  </Text>
                  <Flex mt={1}>
                    <ClockMiniIcon
                      w={{ base: "14px", xl: "18px" }}
                      h={{ base: "14px", xl: "18px" }}
                      mt={0.5}
                    />
                    <Box ml={{ base: 2, xl: 3 }} color="acccent.4">
                      <If condition={el?.autoRenew}>
                        <Then>
                          <Text>Next Payment Due:</Text>
                          <Text>
                            {dayjs(el?.expiredDate).format("DD MMMM YYYY")}
                          </Text>
                        </Then>
                        <Else>
                          <Text>Your Access Will Cease After:</Text>
                          <Text>
                            {dayjs(el?.expiredDate).format("DD MMMM YYYY")}
                          </Text>
                        </Else>
                      </If>
                    </Box>
                  </Flex>
                </Box>
                <If condition={el?.autoRenew}>
                  <Then>
                    <Center w={{ base: "30%", xl: "20%" }} color="secondary">
                      <Button
                        variant="outline"
                        h="auto"
                        px="4"
                        py="3"
                        border="2px"
                        borderColor="secondary"
                        borderRadius="10px"
                        onClick={() => {
                          onOpenConfirm();
                          setDataCancel(el);
                        }}
                        _hover={{}}
                      >
                        Cancel
                      </Button>
                    </Center>
                  </Then>
                </If>
              </Flex>
            </Box>
          ))}
        </Box>
      </Center>
      <Modal isCentered isOpen={isOpenConfirm} onClose={onCloseConfirm}>
        <ModalOverlay />
        <ModalContent
          pt="5"
          px="4"
          pb={{ base: "4", lg: "7" }}
          maxW="unset"
          w={{ base: "95%", lg: "740px" }}
        >
          <DeleteSubscription
            alert="Are you sure you want to continue?"
            name={dataCancel?.nickName ?? dataCancel?.fullName}
            message={` will lose all your valuable support, and you will lose access to ${
              dataCancel?.totalAccessibleInteraction !== 0
                ? dataCancel?.totalAccessibleInteraction
                : "all"
            } exclusive interactions at the end of this billing period on ${dayjs(
              dataCancel?.expiredDate
            ).format("DD MMMM YYYY")}`}
            confirm="cancel subscription"
            cancel="back"
            onCancel={onCloseConfirm}
            onSubmit={() => handleConfirm(dataCancel?.id)}
            isLoading={isLoading}
          />
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isOpenSuccess} onClose={onCloseSuccess}>
        <ModalOverlay />
        <ModalContent
          pt="5"
          px="4"
          pb={{ base: "4", lg: "7" }}
          maxW="unset"
          w={{ base: "95%", lg: "740px" }}
        >
          <DeleteSubscription
            message="Subscription cancelled successfully"
            confirm="back to active subscriptions"
            onSubmit={() => {
              onCloseSuccess();
              router.push("/fan/active-subscriptions");
            }}
            success
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default PaymentInfo;

PaymentInfo.getLayout = function getLayout(page: ReactElement) {
  return <FanDashboardLayout>{page}</FanDashboardLayout>;
};
