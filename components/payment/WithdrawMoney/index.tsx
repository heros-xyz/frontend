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
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUpdateEffect } from "react-use";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  initialWithdrawMoney,
  initialValues,
  validationWithdrawMoney,
} from "@/hooks/useWithdrawMoney";
import { WarningIcon } from "@/components/svg/WarningIcon";
import { CheckIcon } from "@/components/svg/CheckIcon";
import { useUpdateWithdrawMoneyMutation } from "@/api/athlete";
interface IProp {
  onSubmit: (values: initialWithdrawMoney) => void;
  initialValues?: initialWithdrawMoney;
}

const WithdrawMoney: React.FC<IProp> = ({ onSubmit }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateWithdraw, { isSuccess: successUpdated, isLoading }] =
    useUpdateWithdrawMoneyMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationWithdrawMoney,
    onSubmit: (values) => {
      updateWithdraw(values);
      onSubmit(values);
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
        color="white"
        flexDirection="column"
        p={{ base: "5", xl: "19rem" }}
        pt={{ xl: "3.75rem" }}
      >
        <Box w={{ base: "full", xl: "30rem" }}>
          <Box w="full" fontWeight="bold">
            <Link href="/athlete">
              <ArrowLeft
                verticalAlign=""
                w={{ base: "14px", xl: "18px" }}
                h={{ base: "14px", xl: "18px" }}
                onClick={() => {
                  console.log("Back");
                }}
                cursor="pointer"
              />
            </Link>
            <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
              Withdraw Money
            </Text>
          </Box>
          <Box w="full" fontSize={{ base: "sm", xl: "md" }}>
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
                  onChange={formik.handleChange}
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
              <Text mt={{ base: "1", xl: "2.5" }} color="secondary">
                Whilst Herosxyz Pte Ltd does not charge fees for withdrawals,
                banks may do so. <br />
                You will be withdrawing all money in the wallet.
                <br />
                Minimum withdrawal amount is $100.
              </Text>
              <Button
                bg="secondary"
                color="primary"
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
