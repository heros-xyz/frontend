import { Box, Button, Center, Text } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import { PaymentInfo } from "@/types/fan/types";

interface IProp {
  onSubmit: () => void;
  onBack: () => void;
  paymentData?: PaymentInfo;
}
const PaymentWallet: React.FC<IProp> = ({ onBack, onSubmit, paymentData }) => {
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
      <If condition={paymentData?.cardNumber}>
        <Then>
          <Text mt="5" w="full">
            <Text as="span" textTransform="capitalize">
              {paymentData?.cardType?.toLocaleLowerCase() ?? ""}
            </Text>{" "}
            ****
            {paymentData?.cardNumber?.split(" ").join("").slice(-4)},{" "}
            {paymentData?.expiredDate.slice(0, -2)}20
            {paymentData?.expiredDate.slice(-2)}
            <br /> Subscription payment will be automatically collected from
            this card.
          </Text>
        </Then>
      </If>
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
