import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import { useRouter } from "next/router";
import { useUpdateEffect } from "react-use";
import { If, Then } from "react-if";
import PaymentForm from "@/components/payment/PaymentForm";
import {
  defaultValue,
  usePaymentForm,
  validationSchema,
} from "@/hooks/usePaymentForm";
import {
  useAddPaymentInfoMutation,
  useUpdatePaymentInfoMutation,
} from "@/api/fan";
import { usePaymentMethod } from "@/libs/dtl/payment";
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
  const router = useRouter();
  const {
    create: {
      success: addSuccess,
      loading: loadingAdd,
      error: errorAdd,
      create: addPayment,
    },
  } = usePaymentMethod();

  /*
  const { formik, isValid, submitCount, values, handleSubmit } =
    usePaymentForm();
    */
  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema,
    onSubmit: async (values) => {
      console.log("submit", values);
      if (idUpdate) {
        console.log("update");
        //updatePayment({ id: idUpdate, ...values });
      } else {
        console.log("add");
        //addPayment(values);
      }
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
  /*
  const [
    addPayment,
    { isSuccess: addSuccess, isLoading: loadingAdd, error: errorAdd },
  ] = usePaymentMethod();
  */

  const [
    updatePayment,
    { isSuccess: updateSuccess, isLoading: loadingUpdate, error: errorUpdate },
  ] = useUpdatePaymentInfoMutation();

  /*
  useEffect(() => {
    if (submitCount && isValid) {
      if (idUpdate) {
        updatePayment({ id: idUpdate, ...values });
      } else {
        addPayment(values);
      }
    }
  }, [submitCount]);
  */

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

  useUpdateEffect(() => {
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
            isLoading={loadingAdd || loadingUpdate}
            onClick={() => {
              if (loadingAdd || loadingUpdate || isError) {
                return;
              } else {
                formik.handleSubmit();
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
