import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormikContext } from "formik";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import { If, Then } from "react-if";
import PaymentForm from "@/components/payment/PaymentForm";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import {
  useAddPaymentInfoMutation,
  useUpdatePaymentInfoMutation,
} from "@/api/fan";
import { initialChangepayment } from "../../constants";
interface IProp {
  idUpdate: string;
  initialValues?: initialChangepayment;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const ChangePayment: React.FC<IProp> = ({ idUpdate, isError, setIsError }) => {
  const router = useRouter();
  const { formik, isValid, submitCount, values, handleSubmit } =
    usePaymentForm();
  const [errorCard, setErrorCard] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<
    | {
        data: { message: string; statusCode: number };
        status: number;
      }
    | {}
  >();
  const [
    addPayment,
    { isSuccess: addSuccess, isLoading: loadingAdd, error: errorAdd },
  ] = useAddPaymentInfoMutation();
  const [
    updatePayment,
    { isSuccess: updateSuccess, isLoading: loadingUpdate, error: errorUpdate },
  ] = useUpdatePaymentInfoMutation();

  useEffect(() => {
    if (submitCount && isValid) {
      if (idUpdate) {
        updatePayment({ id: idUpdate, ...values });
      } else {
        addPayment(values);
      }
    }
  }, [submitCount]);

  useUpdateEffect(() => {
    if (!!errorAdd) {
      setErrorData(errorAdd);
    } else if (!!errorUpdate) {
      setErrorData(errorUpdate);
    }
  }, [errorAdd, errorUpdate]);

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
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    }
  }, [errorData]);

  useUpdateEffect(() => {
    router.push("/fan/payment");
  }, [addSuccess, updateSuccess]);

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
            onClick={() => {
              if (loadingAdd || loadingUpdate || isError) {
                return;
              } else {
                handleSubmit();
              }
            }}
          >
            update
          </Button>
        </Flex>
        <If condition={errorCard}>
          <Then>
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
          </Then>
        </If>
      </FormikContext.Provider>
    </Box>
  );
};

export default ChangePayment;
