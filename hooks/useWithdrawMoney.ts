import * as yup from "yup";

export const validationWithdrawMoney = yup.object().shape({
  bankName: yup.string().required("This is a required field"),
  swiftCode: yup.string().required("This is a required field"),
  cardNumber: yup.string().required("This is a required field"),
});

export const initialValues = {
  bankName: "",
  swiftCode: "",
  cardNumber: "",
};

export interface initialWithdrawMoney {
  bankName: string;
  swiftCode: string;
  cardNumber: string;
}
