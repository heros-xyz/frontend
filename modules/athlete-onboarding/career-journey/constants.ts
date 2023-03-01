import * as yup from "yup";
import { isBeforeEndDate, isValidDate } from "@/utils/functions";

const endDateValidation = (
  showEndDate: boolean,
  startDate: string,
  schema: any
) => {
  if (showEndDate)
    return schema
      .required("This is a required field")
      .test("valid-date", "Please select valid date", (value: string) => {
        return isValidDate(value);
      })
      .test(
        "is-before-end-date",
        "Start date cannot greater than end date",
        (value: string) => {
          return isBeforeEndDate(startDate, value);
        }
      );

  return schema;
};

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Name/ Title cannot exceed 50 characters")
    .required("This is a required field"),
  description: yup
    .string()
    .max(100, "Description/Subtitle cannot exceed 100 characters"),
  startDate: yup
    .string()
    .required("This is a required field")
    .test("valid-date", "Please select valid date", (value) => {
      return isValidDate(value);
    }),
  endDate: yup
    .string()
    .when(["showEndDate", "startDate"], endDateValidation as any),
  showEndDate: yup.boolean(),
  icon: yup.string(),
});

export const initialValues = {
  name: "",
  description: "",
  icon: "",
  startDate: "",
  endDate: "",
  showEndDate: false,
};

export interface IMilestone {
  name: string;
  description: string;
  icon: string;
  startDate: string;
  endDate: string;
  showEndDate: boolean;
}

export interface ITimeLine {
  title: string;
  description: string;
  from: string;
  to: string;
  isArchive: boolean;
  isCurrent: boolean;
  icon: string;
}
