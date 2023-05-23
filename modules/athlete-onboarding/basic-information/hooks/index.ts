import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { isValidDate } from "@/utils/time";
import { IHerosError } from "@/types/globals/types";
import { useMyUserProfile } from "@/libs/dtl";
import { useMyAthleteProfile } from "@/libs/dtl/athleteProfile";
export interface IValuesTypes {
  dateOfBirth: Date;
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
  const myUserProfile = useMyUserProfile()
  const myAthleteProfile = useMyAthleteProfile()

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
      try {
        if (!myUserProfile.data?.uid) {
          const params = {
            nationality: {
              code: values.nationality.value,
              name: values.nationality.label,
              twoLetterCode: values?.nationality?.twoLetterCode
            },
            gender: values?.gender,
            story: values?.story,
            dateOfBirth: new Date(values.dateOfBirth as unknown as string),
          }
          await myUserProfile.update({
            ...params,
            gender: values.gender as unknown as number,
          })
          await myAthleteProfile.update({
            ...params,
            story: values.story,
          })
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
    submitLoading: myAthleteProfile.loading || myUserProfile.loading
  };
};
