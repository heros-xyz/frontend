import {
  Box,
  Button,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorMessage from "@/components/common/ErrorMessage";
import { getAuthErrorCode } from "@/utils/constants";
import { isEmptyObject } from "@/utils/functions";
import useCountdown from "../../../hooks/useCountdown";

interface OtpProps {
  title: string;
  description: string;
  validTime: number;
  textButton: string;
  errorMessage?: string | number;
  isLoading?: boolean;
  otpValue: string;
  onSubmit: (otp: string) => void;
  resendOtp?: () => void;
}

const OtpFill: React.FC<OtpProps> = ({
  title,
  description,
  validTime,
  textButton,
  errorMessage,
  isLoading,
  otpValue,
  onSubmit,
  resendOtp,
}) => {
  const [verifyOtpError, setVerifyOtpError] = useState<
    string | undefined | number
  >("");
  const { minutes, seconds, reset } = useCountdown(validTime);

  const formik = useFormik({
    initialValues: {
      otp: otpValue,
    },
    validationSchema: yup.object().shape({
      otp: yup
        .string()
        .test(
          "otp-length",
          "OTP must contain 6 characters, please recheck!",
          (val) => {
            return val?.length === 6;
          }
        ),
    }),
    onSubmit: (values) => {
      onSubmit(values.otp);
    },
  });

  const onResend = () => {
    reset();
    resendOtp && resendOtp();
  };

  useEffect(() => {
    formik.setFieldValue("otp", otpValue);
  }, [otpValue]);

  // useEffect(() => {
  //   isEmptyObject(formik.errors) && formik.handleSubmit();
  // }, [formik.errors]);

  useEffect(() => {
    setVerifyOtpError(errorMessage);
  }, [errorMessage]);

  return (
    <Box
      bg="primary"
      minH="100vh"
      display="flex"
      justifyContent="center"
      color="white"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          w={"full"}
          display="flex"
          flexDirection="column"
          maxWidth="500px"
          pt={{ base: "70px", xl: "120px" }}
          paddingX={{ base: "20px", xl: "0px" }}
        >
          <Box textAlign="center" mb={{ base: "40px", xl: "50px" }}>
            <Box
              fontWeight="extrabold"
              fontSize={{ base: "2rem", xl: "5xl" }}
              textTransform="capitalize"
              lineHeight="140%"
              mb={{ base: "10px", xl: "15px" }}
            >
              {title}
            </Box>
            <Box
              fontWeight="normal"
              fontSize={{ base: "md", xl: "xl" }}
              lineHeight="140%"
            >
              {description}
            </Box>
          </Box>

          <HStack
            mb={{ base: 2, xl: 3 }}
            w="full"
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            justifyContent="space-between"
            gap={{ base: "15px", xl: "20px" }}
          >
            <PinInput
              size="lg"
              variant="flushed"
              placeholder=""
              value={formik.values.otp}
              onChange={(value) => {
                setVerifyOtpError("");
                formik.setFieldValue("otp", value);
              }}
              autoFocus
            >
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
                autoFocus
              />
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
              />
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
              />
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
              />
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
              />
              <PinInputField
                fontSize="32px"
                pb="15px"
                w="full"
                ml="0px !important"
              />
            </PinInput>
          </HStack>

          <Box textAlign="left">
            <ErrorMessage
              condition={!!verifyOtpError}
              errorMessage={getAuthErrorCode(verifyOtpError)}
            />
          </Box>
          <Box
            mb="50px"
            textAlign="center"
            fontSize={{ base: "md", xl: "xl" }}
            mt={{ base: "40px", xl: "50px" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              fontWeight="normal"
              lineHeight="140%"
              mb={3}
            >
              <Text>Valid for: &nbsp;</Text>
              <Box color="secondary" lineHeight="140%">
                <Text> {`${minutes}:${seconds}`}</Text>
              </Box>
            </Box>
            <Link
              color="accent.1"
              textDecorationLine="underline"
              fontWeight="medium"
              onClick={onResend}
            >
              Resend OTP
            </Link>
          </Box>
          <Box
            w={{ base: "full", lg: "100%" }}
            display="flex"
            justifyContent="center"
          >
            <Button
              fontSize={{ base: "md", xl: "xl" }}
              variant="secondary"
              fontWeight="bold"
              lineHeight="140%"
              w={{ base: "full", lg: "fit-content" }}
              opacity={isEmptyObject(formik.errors) ? 1 : 0.5}
              type="submit"
              isLoading={isLoading}
              // cursor="not-allowed"
            >
              {textButton}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default OtpFill;
