import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yub from "yup";
import { useAthleteSetupAccountMutation } from "@/api/athlete";
import { updateSession } from "@/utils/auth";
import { isValidString } from "@/utils/functions";
import { getCharacterMessage, REQUIRED_MESSAGE } from "../constants";

export type IValuesTypes = {
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  avatar: File | null;
};

const initialValues: IValuesTypes = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  avatar: null,
};

const validationSchema = yub.object().shape({
  firstName: yub
    .string()
    .max(20, getCharacterMessage("First name"))
    .required(REQUIRED_MESSAGE)
    .test(
      "invalid-firstname",
      "First name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return false;
      }
    ),
  middleName: yub
    .string()
    .max(20, getCharacterMessage("Middle name"))
    .test(
      "invalid-middlename",
      "Middle name is not allowing special character",
      (value: string | undefined) => {
        if (!value) {
          return true;
        } else {
          return isValidString(value);
        }
      }
    ),
  lastName: yub
    .string()
    .max(20, getCharacterMessage("Last name"))
    .required(REQUIRED_MESSAGE)
    .test(
      "invalid-lastname",
      "Last name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return false;
      }
    ),
  nickName: yub
    .string()
    .max(20, getCharacterMessage("Nickname"))
    .required(REQUIRED_MESSAGE),
  avatar: yub.string().required(REQUIRED_MESSAGE),
});

const useSetupAccountPage = () => {
  const totalStep = 3;
  const toast = useToast();
  const [step, setStep] = useState(1);

  const [setupAccount, { isError, data: setupAccountData, error, isLoading }] =
    useAthleteSetupAccountMutation();

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      setupAccount(values);
    },
  });

  useEffect(() => {
    if (setupAccountData) {
      setStep((step) => step + 1);
      updateSession();
    }
  }, [setupAccountData]);

  useEffect(() => {
    if (error) {
      toast({
        title: (error as any)?.data?.message || "Something went wrong",
        status: "error",
      });
    }
  }, [error]);
  return { formik, step, totalStep, toast, isError, error, isLoading, setStep };
};

export default useSetupAccountPage;
