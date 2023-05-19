import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import PaymentForm from "@/components/payment/PaymentForm";
import {
  defaultValue,
  usePaymentForm,
  validationSchema,
} from "@/hooks/usePaymentForm";

import { usePaymentMethods } from "@/libs/dtl/payment";
import { useAuthContext } from "@/context/AuthContext";
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter();
  const { userProfile } = useAuthContext();
  const {
    create: addPayment
  } = usePaymentMethods();

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try{
        await addPayment({
          cardName: values.nameOnCard,
          cardNumber: values.cardNumber,
          cardExpMonth: +values.expiredDate.split("/")[0],
          cardExpYear: +values.expiredDate.split("/")[1],
          cardCvc: values.cvv,
          expiredDate: values?.expiredDate,
        });
        if (idAthleteSubmit && idAthleteTier) {
          await router.push({
            pathname: "/fan/athlete-profile/[id]/payment-details",
            query: {
              id: idAthleteSubmit,
              membershipTierId: idAthleteTier,
            },
          });
        } else {
          await router.push("/fan/payment");
        }
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    },
    validateOnMount: true,
  });

  const [errorCard, setErrorCard] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<
    | {
        data: { message: string; statusCode: number };
        status: number;
      }
    | {}
  >();

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
            onClick={()=>formik.handleSubmit()}
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
            <Text>Your credit card was declined.</Text>
            <Text ml={{ xl: 1 }}>Try paying with another credit card.</Text>
          </Flex>
        )}
      </FormikContext.Provider>
    </Box>
  );
};

export default ChangePayment;
