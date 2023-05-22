import {
  Box,
  Button,
  Center,
  Flex,
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
import { Waypoint } from "react-waypoint";
import FanDashboardLayout from "@/layouts/FanDashboard";
import ClockMiniIcon from "@/components/svg/ClockMiniIcon";
import { GetActiveSubscription } from "@/types/fan/types";
import DeleteSubscription from "@/components/modal/DeleteSubscription";
import NotiSkeleton from "@/components/ui/Notification/Skeleton";
import { useUser } from "@/hooks/useUser";
import { AlertIcon } from "@/components/svg";
import BackButton from "@/components/ui/BackButton";
import HerosImage from "@/components/common/HerosImage";
import {
  useDeleteSubscription,
  useGetMySubscriptions,
} from "@/libs/dtl/subscription";

const PaymentInfo = () => {
  const router = useRouter();
  const { isAdmin, isFan } = useUser();
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const { data: dataSub, loading: isLoading } = useGetMySubscriptions();
  const {
    deleteSub,
    success: successDeleted,
    error: isError,
    loading: loadingDelete,
  } = useDeleteSubscription();

  const handleConfirm = async (id: string | undefined) => {
    if (id !== undefined) {
      try {
        await deleteSub(id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isFetching = false;
  const currentData = dataSub?.map((e: any) => ({
    id: e.id,
    nickName: e?.makerData.nickName,
    athleteId: e?.maker,
    status: e?.status,
    expiredDate: new Date(e?.expiredDate * 1000),
    monthlyPrice: e?.monthlyPrice,
    avatar: e.makerData.avatar,
    fullName: e.makerData.fullName,
    autoRenew: e?.autoRenew,
    totalAccessibleInteraction: e?.totalAccessibleInteraction as unknown as any, // TODO,
  })) as unknown as GetActiveSubscription[];

  /*
  useEffect(() => {
    if (dataSub && !(isFetching || isLoading)) {
      setCurrentData(c);
      setHasNextPage(false); // TODO 
    }
  }, [dataSub, isAdmin]);
  */

  useUpdateEffect(() => {
    onCloseConfirm();
    onOpenSuccess();
  }, [successDeleted]);

  useEffect(() => {
    onCloseConfirm();
    onCloseSuccess();
    setCurrentPage(1);
  }, []);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (isError) {
      setIsShowError(true);
    }
  }, [isError]);

  useEffect(() => {
    if (!isOpenConfirm && isShowError) {
      setIsShowError(false);
    }
  }, [isOpenConfirm]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Box bg="white" minH="100vh" position="relative">
      <Head>
        <title>{`${isAdmin ? "Admin" : "Fan"} | Active Subscriptions`}</title>
      </Head>
      <Center position="relative">
        <If condition={isShowError && isOpenConfirm}>
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
              zIndex={1401}
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
                  Error
                </Text>
                <Text fontSize={{ base: "xs", xl: "md" }}>
                  Something went wrong
                </Text>
              </Box>
            </Flex>
          </Then>
        </If>

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
            <BackButton href="/fan/my-profile" title="Active Subscriptions" />
          </Box>
          {currentData?.map((el) => (
            <Box
              key={el.athleteId}
              py={isAdmin ? 3 : 0}
              w="full"
              color="primary"
              borderTop="1px"
              borderBottom={
                el == currentData[currentData.length - 1] ? "1px" : ""
              }
              borderColor="grey.100"
            >
              <Flex px={{ base: "5", xl: 0 }}>
                <Center
                  w={{ base: "15%", xl: "16%" }}
                  onClick={() =>
                    router.push(`/fan/athlete-profile/${el?.athleteId}`)
                  }
                  cursor="pointer"
                >
                  <HerosImage
                    src={el?.avatar}
                    width={{ base: "50px", lg: "80px" }}
                    height={{ base: "50px", lg: "80px" }}
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
                  <If condition={el?.monthlyPrice}>
                    <Then>
                      <Text color="secondary">
                        Monthly price: {`$${el?.monthlyPrice} per month`}
                      </Text>
                    </Then>
                  </If>
                  <Flex mt={1}>
                    <If condition={isFan}>
                      <Then>
                        <ClockMiniIcon
                          w={{ base: "14px", xl: "18px" }}
                          h={{ base: "14px", xl: "18px" }}
                          mt={0.5}
                        />
                        <Box ml={{ base: 2, xl: 3 }}>
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
                      </Then>
                    </If>
                  </Flex>
                </Box>
                <If condition={el?.autoRenew && !isAdmin}>
                  <Then>
                    <Center w={{ base: "30%", xl: "20%" }} color="grey.200">
                      <Button
                        variant="outline"
                        h="auto"
                        px="4"
                        py="3"
                        border="2px"
                        borderColor="grey.200"
                        borderRadius="10px"
                        isDisabled={isAdmin}
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
          {hasNextPage && (
            <Waypoint onEnter={onLoadMore}>
              <Box>
                <NotiSkeleton />
              </Box>
            </Waypoint>
          )}
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
              dataCancel?.totalAccessibleInteraction ?? 0 !== 0
                ? dataCancel?.totalAccessibleInteraction
                : "all"
            } exclusive interactions at the end of this billing period on ${dayjs(
              dataCancel?.expiredDate
            ).format("DD MMMM YYYY")}`}
            confirm="cancel subscription"
            cancel="back"
            onCancel={onCloseConfirm}
            onSubmit={() => handleConfirm(dataCancel?.id)}
            isLoading={loadingDelete}
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
              router.reload();
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
