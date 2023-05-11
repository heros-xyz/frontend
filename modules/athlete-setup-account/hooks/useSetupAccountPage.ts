import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yub from "yup";
import { setDoc } from "firebase/firestore";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { useAthleteSetupAccountMutation } from "@/api/athlete";
import { updateSession } from "@/utils/auth";
import { isValidString } from "@/utils/functions";
import { IHerosError } from "@/types/globals/types";
import { storage } from "@/libs/firebase";
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
      "This field contains text only",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    ),
  middleName: yub
    .string()
    .max(20, getCharacterMessage("Middle name"))
    .test(
      "invalid-middlename",
      "This field contains text only",
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
      "This field contains text only",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
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
  //const ref = storageRef(storage, 'avatar.jpg');
 // const [uploadFile, uploading, snapshot, errorUploadImage] = useUploadFile();

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      console.log({ values });
      // uploadImage
    /*       if (values?.avatar) {
            const result = await uploadFile(ref, values?.avatar, {
              contentType: 'image/jpeg'
            });
            console.log({ result });
          } */
      // 1 modify user
      // 3 athleteProfile/{uid} nickName
      //setupAccount(values);
    },
  });

  const updateUser = async () => {
    await updateSession();
    setStep((step) => step + 1);
  }

  useEffect(() => {
    if (setupAccountData) {
      updateUser()
    }
  }, [setupAccountData]);

  useEffect(() => {
    if (error) {
      toast({
        title: (error as IHerosError)?.data?.message || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);
  return { formik, step, totalStep, toast, isError, error, isLoading, setStep };
};

export default useSetupAccountPage;
