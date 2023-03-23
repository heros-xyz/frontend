import dayjs from "dayjs";
import * as yup from "yup";
import { isBeforeEndDate, isValidDate, isValidString } from "@/utils/functions";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, "First name cannot exceed 20 characters")
    .test(
      "invalid-firstName",
      "This field contains text only",
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
      "This field contains text only",
      (value: string | undefined) => {
        if (value) {
          return isValidString(value);
        }
        return true;
      }
    ),
  lastName: yup
    .string()
    .max(20, "Last name cannot exceed 20 characters")
    .test(
      "invalid-lastName",
      "This field contains text only",
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
    })
    .test("is-before-today", "Invalid date", (value) => {
      return isBeforeEndDate(
        dayjs(value, "YYYY/MM/DD").format("YYYY/MM/DD"),
        dayjs(new Date()).format("YYYY/MM/DD")
      );
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
