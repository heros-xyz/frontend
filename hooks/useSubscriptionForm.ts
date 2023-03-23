import * as yup from "yup";
import { useFormik } from "formik";

export const initialAddTierValues = {
  monthlyPrice: "",
  tierDescription: "",
  listBenefitsId: [],
};
export interface initialAddTier {
  monthlyPrice: string;
  tierDescription: string;
  listBenefitsId: string[];
}

export const validationAddTierSchema = yup.object().shape({
  monthlyPrice: yup
    .string()
    .required("This is a required field")
    .test("valid-price", "Minimum amount is 1 USD", (value) => {
      return value && 1.0 <= parseFloat(value) ? true : false;
    }),
  tierDescription: yup
    .string()
    .max(150, "Tier Description cannot exceed 150 characters"),
  listBenefitsId: yup.array(),
});

interface IPaymentFormProps {
  initialValues?: initialAddTier;
}

export const useSubscriptionForm = (props?: IPaymentFormProps) => {
  const formik = useFormik({
    initialValues: props?.initialValues ?? initialAddTierValues,
    validationSchema: validationAddTierSchema,
    onSubmit: async () => {},
  });
  return {
    formik,
    ...formik,
  };
};
