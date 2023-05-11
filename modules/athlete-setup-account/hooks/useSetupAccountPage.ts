import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yub from "yup";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { useAthleteSetupAccountMutation } from "@/api/athlete";
import { isValidString } from "@/utils/functions";
import { IHerosError } from "@/types/globals/types";
import { storage } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { useLoading } from "@/hooks/useLoading";
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
  const { start, finish } = useLoading()
  const [step, setStep] = useState(1);
  const [setupAccount, { isError, data: setupAccountData, error, isLoading }] =
    useAthleteSetupAccountMutation();
  const { userProfile } = useAuthContext()
  const [uploadFile] = useUploadFile();
  const { updateDocument } = useUpdateDoc()

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        start()
        const { avatar, nickName, ...params } = values
        // upload avatar
        let avatarUrl = ""
        if (avatar) {
          const refStorage = ref(storage, `profile/${userProfile?.uid}/${avatar.name}`);
          const result = await uploadFile(refStorage, avatar, {
            contentType: avatar.type
          });
          if (!!result?.ref) {
            const downloadURL = await getDownloadURL(result?.ref);
            avatarUrl = downloadURL
          }
        }
        // update athleteProfile/{uid} 
        await updateDocument(`athleteProfile/${userProfile?.uid}`, {
          firstName: params?.firstName,
          nickName,
        })
        // update user/{uid}
        await updateDocument(`user/${userProfile?.uid}`, {
          ...params,
          avatar: avatarUrl,
          isFinishSetupAccount: true
        })

        setStep(currentStep => currentStep + 1)

      } catch (error) {
        console.error("useSetupAccountPage()", { error })
      } finally {
        finish()
      }
    },
  });

  const updateUser = async () => {
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
