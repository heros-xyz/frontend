import * as yup from "yup";
import { isValidDate, isValidString } from "@/utils/functions";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, "First name cannot exceed 20 characters")
    .test(
      "invalid-firstName",
      "Legal first name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    )
    .required("This is a required field"),
  middleName: yup
    .string()
    .max(20, "Middle name cannot exceed 20 characters")
    .test(
      "invalid-middleName",
      "Legal middle name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    )
    .required("This is a required field"),
  lastName: yup
    .string()
    .max(20, "Last name cannot exceed 20 characters")
    .test(
      "invalid-lastName",
      "Legal last name is not allowing special character",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    )
    .required("This is a required field"),
  dateOfBirth: yup
    .string()
    .required("This is a required field")
    .test("valid-date", "Invalid date", (value) => {
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
  middleName: "",
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
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: {
    value: string;
    label: string;
  };
  story: string;
}
