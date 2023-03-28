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
    .test("valid-date", "Invalid date", (value) => {
      return isValidDate(value);
    }),
  gender: yup.string().required("This is a required field"),
  nationality: yup.string().required("This is a required field"),
  myStory: yup
    .string()
    .max(5000, "My story cannot exceed 5000 characters")
    .required("This is a required field"),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  myStory: "",
};

export interface initialAddpayment {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  myStory: string;
}
