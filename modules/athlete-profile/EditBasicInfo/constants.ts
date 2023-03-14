import * as yup from "yup";
import { isValidDate } from "@/utils/functions";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, "First name cannot exceed 20 characters")
    .required("This is a required field"),
  lastName: yup
    .string()
    .max(20, "Last name cannot exceed 20 characters")
    .required("This is a required field"),
  dateOfBirth: yup
    .string()
    .required("This is a required field")
    .test("valid-date", "Please select valid date", (value) => {
      return isValidDate(value);
    }),
  gender: yup.string().required("This is a required field"),
  story: yup
    .string()
    .max(500, "My story cannot exceed 500 characters")
    .required("This is a required field"),
});

export const initialBasicValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: {
    label: "",
    value: "",
  },
  story: "",
};
export interface initialBasicValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: {
    value: string;
    label: string;
  };
  story: string;
}
