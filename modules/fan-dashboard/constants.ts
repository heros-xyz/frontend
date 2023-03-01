import * as yup from "yup";
import { isValidDate } from "@/utils/functions";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Card name cannot exceed 20 characters")
    .required("This is a required field"),
  number: yup
    .string()
    .max(20, "Card number cannot exceed 20 characters")
    .required("This is a required field"),
  expiration: yup
    .string()
    .required("This is a required field")
    .test("month/year", "Please select valid expiration", (value) => {
      return isValidDate(value, "MM/YYYY");
    }),
  cvv: yup.string().required("This is a required field"),
  country: yup.string().required("This is a required field"),
  postcode: yup.string().required("This is a required field"),
});

export const initialValues = {
  name: "",
  number: "",
  expiration: "",
  cvv: "",
  country: "",
  postcode: "",
};

export interface initialChangepayment {
  name: string;
  number: string;
  expiration: string;
  cvv: string;
  country: string;
  postcode: string;
}
