import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Modal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUpdateEffect } from "react-use";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  initialWithdrawMoney,
  initialValues,
  validationWithdrawMoney,
} from "@/hooks/useWithdrawMoney";
import { WarningIcon } from "@/components/svg/WarningIcon";
import { CheckIcon } from "@/components/svg/CheckIcon";
import BackButton from "@/components/ui/BackButton";
import { useWithdrawal, WithdrawParamsInformation } from "@/libs/dtl/withdraw";
interface IProp {
  onSubmit: (values: initialWithdrawMoney) => void;
  initialValues?: initialWithdrawMoney;
}

const WithdrawMoney: React.FC<IProp> = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    create: createWithdrawalRequest,
    isSuccess: successUpdated,
    loading: isLoading,
  } = useWithdrawal();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationWithdrawMoney,
    onSubmit: async (values) => {
      const params: WithdrawParamsInformation = values;
      await createWithdrawalRequest(params);
    },
  });

  useUpdateEffect(() => {
    onOpen();
  }, [successUpdated]);
  useEffect(() => {
    onClose();
  }, []);

  return (
    <>
      <Center
        color="primary"
        flexDirection="column"
        p={{ base: "5", xl: "19rem" }}
        pt={{ xl: "3.75rem" }}
      >
        <Box w={{ base: "full", xl: "30rem" }}>
          <Box w="full" fontWeight="bold">
            <BackButton href="/athlete" title="Withdraw Money" />
          </Box>
          <Box w="full" fontSize={{ base: "sm", xl: "md" }} color="black">
            <form onSubmit={formik.handleSubmit}>
              <Box mt={{ base: 5, xl: 8 }}>
                <Box fontWeight="medium">
                  Bank Name
                  <Text as="span" color="error.dark">
                    {" "}
                    *
                  </Text>
                </Box>
                <Input
                  autoComplete="off"
                  placeholder="Bank Name"
                  variant="flushed"
                  w="full"
                  id="bankName"
                  name="bankName"
                  borderColor="grey.dark"
                  onChange={(e) => {
                    const regex = new RegExp(`[A-Za-z]`);
                    const lastChar = e.target.value.slice(-1);
                    if (lastChar === " " || regex.test(lastChar)) {
                      formik.handleChange(e);
                    } else {
                      formik.setFieldValue(
                        "bankName",
                        e.target.value.slice(0, -1)
                      );
                    }
                  }}
                  value={formik.values.bankName}
                  isInvalid={Boolean(
                    formik.errors.bankName && formik.touched.bankName
                  )}
                  fontSize={{ base: "sm", xl: "lg" }}
                />
                <ErrorMessage
                  fontSize={{ xl: "sm" }}
                  mt={0.5}
                  condition={formik.errors.bankName && formik.touched.bankName}
                  errorMessage={formik.errors.bankName}
                />
              </Box>
              <Box mt={{ base: 5, xl: 8 }}>
                <Box fontWeight="medium">
                  Swift/Bic Code
                  <Text as="span" color="error.dark">
                    {" "}
                    *
                  </Text>
                </Box>
                <Input
                  autoComplete="off"
                  placeholder="Swift/Bic Code"
                  variant="flushed"
                  w="full"
                  id="swiftCode"
                  name="swiftCode"
                  borderColor="grey.dark"
                  onChange={formik.handleChange}
                  value={formik.values.swiftCode}
                  isInvalid={Boolean(
                    formik.errors.swiftCode && formik.touched.swiftCode
                  )}
                  fontSize={{ base: "sm", xl: "lg" }}
                />
                <ErrorMessage
                  fontSize={{ xl: "sm" }}
                  mt={0.5}
                  condition={
                    formik.errors.swiftCode && formik.touched.swiftCode
                  }
                  errorMessage={formik.errors.swiftCode}
                />
              </Box>
              <Box mt={{ base: 5, xl: 8 }}>
                <Box fontWeight="medium">
                  Account Number
                  <Text as="span" color="error.dark">
                    {" "}
                    *
                  </Text>
                </Box>
                <Input
                  autoComplete="off"
                  placeholder="Account Number"
                  variant="flushed"
                  w="full"
                  id="cardNumber"
                  name="cardNumber"
                  borderColor="grey.dark"
                  onChange={formik.handleChange}
                  value={formik.values.cardNumber}
                  isInvalid={Boolean(
                    formik.errors.cardNumber && formik.touched.cardNumber
                  )}
                  fontSize={{ base: "sm", xl: "lg" }}
                />
                <ErrorMessage
                  fontSize={{ xl: "sm" }}
                  mt={0.5}
                  condition={
                    formik.errors.cardNumber && formik.touched.cardNumber
                  }
                  errorMessage={formik.errors.cardNumber}
                />
              </Box>
              <Flex
                mt={{ base: "7", xl: "3.125rem" }}
                color="error.dark"
                alignItems="center"
              >
                <WarningIcon w="18px" h="16px" />
                <Text ml="2" mt="1">
                  Disclaimer
                </Text>
              </Flex>
              <Text mt={{ base: "1", xl: "2.5" }} color="grey.dark">
                Whilst Herosxyz Pte Ltd does not charge fees for withdrawals,
                banks may do so. <br />
                You will be withdrawing all money in the wallet.
                <br />
                Minimum withdrawal amount is $100.
              </Text>
              <Button
                bg="primary"
                color="secondary"
                w={{ base: "100%", xl: "auto" }}
                mt={"12"}
                fontWeight={"bold"}
                type="submit"
                fontSize={{ xl: "xl" }}
                float={{ xl: "right" }}
                isLoading={isLoading}
              >
                send Withdrawal request
              </Button>
            </form>
          </Box>
        </Box>
      </Center>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Center
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="100dvh"
          bg="rgba(0, 0, 0, 0.7)"
        >
          <Box
            bg="white"
            w={{ base: "full", xl: "740px" }}
            minH={50}
            mx={4}
            py={5}
            borderRadius={8}
            zIndex="1"
          >
            <Center mb={{ base: 3, xl: 5 }}>
              <Center
                bg="#D1FAE5"
                w={{ base: "12", xl: "20" }}
                h={{ base: "12", xl: "20" }}
                borderRadius="full"
              >
                <CheckIcon
                  color="#65D169"
                  w={{ base: "20px", xl: "30px" }}
                  h={{ base: "18px", xl: "26px" }}
                />
              </Center>
            </Center>
            <Box
              mb={1}
              mx={{ base: 4, xl: 6 }}
              fontWeight="semibold"
              textAlign="center"
              color="grey.500"
              fontSize={{ base: "lg", xl: "xl" }}
            >
              Your withdrawal request has been sent.
            </Box>
            <Box
              mx={5}
              textAlign="center"
              color={"black.ish"}
              fontSize={{ base: "lg", xl: "xl" }}
            >
              Your request will be processed within 7 business days.
            </Box>
            <Box
              mx={5}
              textAlign="center"
              color={"black.ish"}
              fontSize={{ base: "lg", xl: "xl" }}
            >
              Please check your email for further information.
            </Box>
            <Center>
              <Button
                variant="primary"
                mt={5}
                mx={{ base: 5, xl: 6 }}
                textTransform="uppercase"
                fontSize={{ base: "md", xl: "xl" }}
                fontWeight="bold"
                w={{ base: "100%", xl: "auto" }}
                h="auto"
                py={3}
                onClick={() => {
                  router.push("/athlete");
                }}
              >
                back to homepage
              </Button>
            </Center>
          </Box>
        </Center>
      </Modal>
    </>
  );
};

export default WithdrawMoney;
