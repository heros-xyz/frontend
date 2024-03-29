import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { usePaymentMethods } from "@/libs/dtl/payment";

interface IProp {
  onSubmit: () => void;
  onBack: () => void;
}
const PaymentWallet: React.FC<IProp> = ({ onBack, onSubmit }) => {
  const { data } = usePaymentMethods();
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Center color="primary" flexDirection="column">
      <Box w="full" fontWeight="bold">
        <ArrowLeft
          verticalAlign=""
          w={{ base: "14px", xl: "18px" }}
          h={{ base: "14px", xl: "18px" }}
          cursor="pointer"
          onClick={onBack}
        />
        <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
          Payment Information
        </Text>
      </Box>
      <Text mt="8" fontWeight="bold" w="full" fontSize={{ xl: "xl" }}>
        Payment Method
      </Text>
      {!!data?.length &&
        data
          ?.filter((paymentData) => !paymentData?.error)
          .map?.((paymentData) => (
            <React.Fragment key={paymentData.stripePayment?.id}>
              <Text mt="5" w="full">
                <Text as="span" textTransform="capitalize">
                  {paymentData?.stripePayment?.card.brand.toLocaleLowerCase() ??
                    ""}
                </Text>{" "}
                ****
                {paymentData?.stripePayment?.card.last4}
                {", "}
                {paymentData?.stripePayment?.card?.exp_month}/
                {paymentData?.stripePayment?.card?.exp_year}
                <br /> Subscription payment will be automatically collected from
                this card.
              </Text>
            </React.Fragment>
          ))}
      <Box w="full">
        <Button
          w={{ base: "full", xl: "auto" }}
          mt={{ base: "5", xl: "3.125rem" }}
          bg="secondary"
          color="primary"
          textTransform="uppercase"
          h="auto"
          py="3"
          onClick={handleSubmit}
          float={{ xl: "right" }}
          fontSize={{ xl: "xl" }}
        >
          Update payment method
        </Button>
      </Box>
    </Center>
  );
};

export default PaymentWallet;
