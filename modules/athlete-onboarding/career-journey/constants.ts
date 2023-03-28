import * as yup from "yup";
import { isBeforeEndDate, isValidDate } from "@/utils/functions";

const endDateValidation = (
  isPeriodDate: boolean,
  startDate: string,
  schema: any
) => {
  if (isPeriodDate)
    return schema
      .required("This is a required field")
      .test("valid-date", "Invalid date", (value: string) => {
        return isValidDate(value);
      })
      .test(
        "is-before-end-date",
        "Start date cannot be greater than end date",
        (value: string) => {
          return isBeforeEndDate(startDate, value);
        }
      );

  return schema;
};

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, "Name/ Title cannot exceed 50 characters")
    .required("This is a required field"),
  description: yup
    .string()
    .max(100, "Description/Subtitle cannot exceed 100 characters"),
  startDate: yup
    .string()
    .required("This is a required field")
    .test("valid-date", "Invalid date", (value) => {
      return isValidDate(value);
    }),
  endDate: yup
    .string()
    .when(["isPeriodDate", "startDate"], endDateValidation as any),
  isPeriodDate: yup.boolean(),
});

export const initialValues = {
  id: "",
  title: "",
  description: "",
  icon: "",
  startDate: "",
  endDate: "",
  isPeriodDate: false,
};

export interface IMilestone {
  title: string;
  description: string;
  icon?: string;
  startDate: string;
  endDate: string;
  isPeriodDate: boolean;
}
