import * as yup from "yup";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { isValidDate } from "@/utils/time";

export const validationSchema = yup.object().shape({
  nameOnCard: yup
    .string()
    .max(20, "Card name cannot exceed 20 characters")
    .required("This is a required field"),
  cardNumber: yup.string().required("This is a required field"),
  expiredDate: yup
    .string()
    .required("This is a required field")
    .test("month/year", "Please select valid expiration", (value) => {
      return isValidDate(value, "MM/YY");
    })
    .test(
      "is-before-current-month",
      "Expiration field must be later than current month and year",
      (value: string | undefined) => {
        let check = false;
        if (value?.length === 5) {
          const year = parseInt("20" + value?.slice(3));
          const month = parseInt(value?.slice(0, 2));
          check =
            dayjs().year() < year ||
            (dayjs().month() + 1 < month && dayjs().year() === year);
        }
        return check;
      }
    ),
  cvv: yup.string().required("This is a required field"),
});

export const defaultValue = {
  nameOnCard: "",
  cardNumber: "",
  expiredDate: "",
  cvv: "",
};

export interface IPaymentForm {
  nameOnCard: string;
  cardNumber: string;
  expiredDate: string;
  cvv: string;
}

interface IPaymentFormProps {
  initialValues?: IPaymentForm;
}

export const usePaymentForm = (props?: IPaymentFormProps) => {
  const formik = useFormik({
    initialValues: props?.initialValues ?? defaultValue,
    validationSchema,
    onSubmit: async () => { },
    validateOnMount: true,
  });

  return {
    formik,
    ...formik,
  };
};
