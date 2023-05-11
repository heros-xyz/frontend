import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  useGetBasicInformationQuery,
  useOnboardingBasicInformationMutation,
} from "@/api/athlete";
import { updateSession } from "@/utils/auth";
import { isValidDate } from "@/utils/functions";
import { IHerosError } from "@/types/globals/types";
import { useAuthContext } from "@/context/AuthContext";
import { mapToBasicInformation } from "@/libs/dtl/basicInformation";
import useUpdateDoc from "@/hooks/useUpdateDoc";
export interface IValuesTypes {
  dateOfBirth: string;
  gender: string;
  nationality: {
    label: string;
    value: string;
  };
  story: string;
}

const validationSchema = yup.object().shape({
  dateOfBirth: yup
    .string()
    .required("This is a required field")
    .test("valid-date", "Invalid date", (value) => {
      return isValidDate(value);
    }),
  gender: yup.string().required("This is a required field"),
  story: yup
    .string()
    .max(5000, "Your Story cannot exceed 5000 characters")
    .required("This is a required field"),
  nationality: yup.object().shape({
    value: yup.string().required("This is a required field!"),
  }),
});

export const useBasicInfo = () => {
  const totalStep = 4;
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null)
  const { userProfile } = useAuthContext()
  const { updateDocument, isUpdating } = useUpdateDoc()

  const formik = useFormik({
    validationSchema,
    initialValues: {
      dateOfBirth: "",
      gender: "",
      nationality: {
        label: "",
        value: "",
      },
      story: "",
    },
    onSubmit: async (values) => {
      // TODO: add loading
      try {
        if (!!userProfile?.uid) {
          const paramsUser = {
            nationality: values.nationality,
            gender: values.gender,
            birthday: values.dateOfBirth,
          }
          const paramsAthleteProfile = {
            story: values.story
          }
          await updateDocument(`user/${userProfile?.uid}`, paramsUser)
          await updateDocument(`athleteProfile/${userProfile?.uid}`, paramsAthleteProfile)
          setStep((step) => step + 1);
        }

      } catch (error) {
        setError(error)
        console.log(error)
      }

    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: (error as IHerosError)?.data?.error || "Oops! Something went wrong",
        status: "error",
      });
    }
  }, [error]);

  return {
    formik,
    step,
    totalStep,
    error,
    setStep,
  };
};
