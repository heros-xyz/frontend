import { Box, BoxProps, Flex, Input, Text } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useFormikContext } from "formik";
import ErrorMessage from "@/components/common/ErrorMessage";
import { IPaymentForm } from "@/hooks/usePaymentForm";

interface IProp extends BoxProps {
  initialValues?: IPaymentForm;
}

const PaymentForm: React.FC<IProp> = ({ ...props }) => {
  const { setFieldValue, values, errors, touched, handleChange, handleSubmit } =
    useFormikContext<IPaymentForm>();

  return (
    <Box color="white" {...props}>
      <Box w="full" fontSize={{ base: "sm", xl: "md" }}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Box fontWeight="medium">
              Payment Method
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Box
              fontWeight="medium"
              w="50%"
              border={{ base: "1px", xl: "2px" }}
              borderColor="acccent.3"
              color="acccent.3"
              borderRadius={4}
              h={{ base: 8, xl: 12 }}
              pl={4}
              display="flex"
              alignItems="center"
              mt="2"
            >
              Card
            </Box>
          </Box>
          <Box mt={{ base: 5, xl: 8 }}>
            <Box fontWeight="medium">
              Name on Card
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Input
              autoComplete="off"
              placeholder="Name on Card"
              variant="flushed"
              w="full"
              id="nameOnCard"
              name="nameOnCard"
              onChange={(e) => {
                const regex = new RegExp(`[A-Za-z]`);
                const lastChar = e.target.value.slice(-1);
                if (lastChar === " " || regex.test(lastChar)) {
                  handleChange(e);
                } else {
                  setFieldValue("nameOnCard", e.target.value.slice(0, -1));
                }
              }}
              value={values.nameOnCard}
              isInvalid={Boolean(errors.nameOnCard && touched.nameOnCard)}
              fontSize={{ base: "sm", xl: "lg" }}
            />
            <ErrorMessage
              fontSize={{ xl: "sm" }}
              mt={0.5}
              condition={errors.nameOnCard && touched.nameOnCard}
              errorMessage={errors.nameOnCard}
            />
          </Box>
          <Box mt={{ base: 5, xl: 8 }}>
            <Box fontWeight="medium">
              Card Number
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Input
              as={InputMask}
              mask="9999 9999 9999 9999"
              maskChar={null}
              placeholder="Card Number"
              variant="flushed"
              w="full"
              id="cardNumber"
              name="cardNumber"
              onChange={handleChange}
              value={values.cardNumber}
              isInvalid={Boolean(errors.cardNumber && touched.cardNumber)}
              fontSize={{ base: "sm", xl: "lg" }}
            />
            <ErrorMessage
              mt={0.5}
              condition={errors.cardNumber && touched.cardNumber}
              errorMessage={errors.cardNumber}
            />
          </Box>
          <Flex mt={{ base: 5, xl: 8 }} gap={2.5}>
            <Box w={"50%"}>
              <Box fontWeight="medium">
                Expiration
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Input
                as={InputMask}
                mask="99/99"
                maskChar={null}
                placeholder="MM/YY"
                variant="flushed"
                w="full"
                id="expiredDate"
                name="expiredDate"
                onChange={handleChange}
                value={values.expiredDate}
                isInvalid={Boolean(errors.expiredDate && touched.expiredDate)}
                fontSize={{ base: "sm", xl: "lg" }}
              />
              <ErrorMessage
                mt={0.5}
                condition={errors.expiredDate && touched.expiredDate}
                errorMessage={errors.expiredDate}
              />
            </Box>
            <Box w={"50%"}>
              <Box fontWeight="medium">
                CVV
                <Text as="span" color="error.dark">
                  {" "}
                  *
                </Text>
              </Box>
              <Input
                as={InputMask}
                mask="999"
                maskChar={null}
                placeholder="CVV"
                variant="flushed"
                w="full"
                id="cvv"
                name="cvv"
                onChange={handleChange}
                value={values.cvv}
                isInvalid={Boolean(errors.cvv && touched.cvv)}
                fontSize={{ base: "sm", xl: "lg" }}
              />
              <ErrorMessage
                mt={0.5}
                condition={errors.cvv && touched.cvv}
                errorMessage={errors.cvv}
              />
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default PaymentForm;
