import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import PaymentForm from "@/components/payment/PaymentForm";
import { defaultValue, validationSchema } from "@/hooks/usePaymentForm";
import { usePaymentMethods } from "@/libs/dtl/payment";
import { useLoading } from "@/hooks/useLoading";
import { initialChangepayment } from "../../constants";

interface IProp {
  idAthleteTier?: string;
  idAthleteSubmit?: string;
  idUpdate: string;
  initialValues?: initialChangepayment;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setErrorCode: Dispatch<SetStateAction<number>>;
}

const ChangePayment: React.FC<IProp> = ({
  idAthleteTier,
  idAthleteSubmit,
  idUpdate,
  isError,
  setIsError,
  setErrorCode,
}) => {
  const { start, finish } = useLoading();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [newPaymentId, setNewPaymentId] = useState<string | null>(null);
  const { create: addPayment, data: dataPayment } = usePaymentMethods();
  const newPayment = dataPayment?.find?.((payment) =>
    payment.id === newPaymentId ? payment : null
  );

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const docRef = await addPayment({
          cardName: values.nameOnCard,
          cardNumber: values.cardNumber,
          cardExpMonth: +values.expiredDate.split("/")[0],
          cardExpYear: +values.expiredDate.split("/")[1],
          cardCvc: values.cvv,
          expiredDate: values?.expiredDate,
        });
        if (docRef?.id) {
          setNewPaymentId(docRef?.id);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    validateOnMount: true,
  });

  const [errorCard, setErrorCard] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<{
    data: { message: string | undefined; statusCode: number };
    status: number;
  }>();

  const loadingPaymentAfterSubmit =
    newPayment?.id !== null &&
    newPaymentId !== null &&
    !newPayment?.stripePayment &&
    !newPayment?.error;
  const newPaymentHasError =
    !!newPayment?.id && !newPayment?.stripePayment && !!newPayment?.error;

  useEffect(() => {
    if (newPaymentHasError) {
      // check payment status and if successful redirect
      setErrorData({
        data: { message: newPayment?.error, statusCode: 3002 },
        status: 3002,
      });
    }
    if (!loadingPaymentAfterSubmit && !!newPayment?.stripePayment) {
      if (idAthleteSubmit && idAthleteTier) {
        router.push({
          pathname: "/fan/athlete-profile/[id]/payment-details",
          query: {
            id: idAthleteSubmit,
            membershipTierId: idAthleteTier,
          },
        });
      } else {
        router.push("/fan/payment");
      }
    }
  }, [loadingPaymentAfterSubmit, newPaymentHasError]);

  useEffect(() => {
    if (loadingPaymentAfterSubmit) {
      start();
    } else {
      finish();
    }
  }, [loadingPaymentAfterSubmit]);

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
        setErrorCode(3000);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
      if (errorData.data.statusCode === 4001) {
        setIsError(true);
        setErrorCode(4001);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    }
  }, [errorData]);

  return (
    <Box className="fdfdf">
      <FormikContext.Provider value={formik}>
        <PaymentForm />
        <Flex w="full" justifyContent={{ xl: "end" }}>
          <Button
            bg="secondary"
            color="primary"
            w={{ base: "100%", xl: "auto" }}
            mt={"12"}
            fontWeight={"bold"}
            type="submit"
            fontSize={{ xl: "xl" }}
            isLoading={loading}
            onClick={() => formik.handleSubmit()}
          >
            update
          </Button>
        </Flex>
        {errorCard && (
          <Flex
            flexDirection={{ base: "column", xl: "row" }}
            color="error.dark"
            mt={{ base: 4, xl: 5 }}
            justifyContent={{ xl: "end" }}
            alignItems={{ base: "center", xl: "normal" }}
            fontSize="xs"
          >
            <Text>
              {errorData?.data?.message ?? "Your credit card was declined."}
            </Text>
            <Text ml={{ xl: 1 }}>Try paying with another credit card.</Text>
          </Flex>
        )}
      </FormikContext.Provider>
    </Box>
  );
};

export default ChangePayment;
