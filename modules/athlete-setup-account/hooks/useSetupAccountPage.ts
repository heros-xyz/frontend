import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yub from "yup";
import { useUploadFile } from 'react-firebase-hooks/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { set } from "immer/dist/internal";
import { useRouter } from "next/router";
import { serverTimestamp } from "firebase/firestore";
import { getFullName, isValidString } from "@/utils/functions";
import { IHerosError } from "@/types/globals/types";
import { storage } from "@/libs/firebase";
import { useAuthContext } from "@/context/AuthContext";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { useLoading } from "@/hooks/useLoading";
import { RoutePath } from "@/utils/route";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";
import { useMyUserProfile } from "@/libs/dtl";
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { userProfile } = useAuthContext()
  const [uploadFile] = useUploadFile();
  const myAthleteProfile = useMyAthleteProfile()
  const myUserProfile = useMyUserProfile()

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
          setIsLoading(true)
          const refStorage = ref(storage, `profile/${userProfile?.uid}/${avatar.name}`);
          const result = await uploadFile(refStorage, avatar, {
            cacheControl: 'public, max-age=31536000',  // Un año
          });
          if (!!result?.ref) {
            const downloadURL = await getDownloadURL(result?.ref);
            //remove token attribute of the downloadURL
            const downloadURLWithoutToken = downloadURL.split('?')[0]
            avatarUrl = downloadURLWithoutToken+"?alt=media"
          }
        }
        // update athleteProfile/{uid}
        await myAthleteProfile.update({
          firstName: params?.firstName,
          middleName: params?.middleName,
          lastName: params?.lastName,
          nickName,
          avatar: avatarUrl,
          createdAt: new Date(),
          fullName: getFullName(params?.firstName, params?.lastName, params?.middleName),
          totalSubCount: 0,
          totalInteractionCount: 0
        })
        // update user/{uid}
        await myUserProfile.update({
          ...params,
          avatar: avatarUrl,
          isFinishSetupAccount: true
        })

        setStep(currentStep => currentStep + 1)

      } catch (error) {
        console.error("useSetupAccountPage()", { error })
        setError(error)
      } finally {
        setIsLoading(false)
        finish()
      }
    },
  });

/*useEffect(() => {
    debugger
    console.log({ userProfile, showSuccess })
    if (userProfile?.isFinishSetupAccount && userProfile?.isFinishOnboarding) {
      router.push(RoutePath.ATHLETE)
    }
    if (userProfile?.isFinishSetupAccount) {
      router.push(RoutePath.ATHLETE_CHECKLIST)
    }
  }, [userProfile, showSuccess]); */

  useEffect(() => {
    if (error) {
      toast({
        title: (error as IHerosError)?.data?.message || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);
  return { formik, step, totalStep, toast, isLoading, setStep };
};

export default useSetupAccountPage;
