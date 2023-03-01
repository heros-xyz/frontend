export interface PaymentInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  nameOnCard: string;
  cardNumber: string;
  expiredDate: string;
  cvv: string;
  country: string;
  postCode: string;
}

export interface UpdatedPaymentInfo {
  cardNumber: string;
  country: string;
  createdAt: string;
  cvv: string;
  expiredDate: string;
  id: string;
  nameOnCard: string;
  postCode: string;
  updatedAt: string;
}

export interface AddPaymentForm {
  nameOnCard: string;
  cardNumber: string;
  expiredDate: string;
  cvv: string;
}

export interface UpdatePaymentForm {
  id: string;
  nameOnCard: string;
  cardNumber: string;
  expiredDate: string;
  cvv: string;
}

export interface GetActiveSubscription {
  avatar: string;
  status: "ACTIVE" | "EXPIRED" | "DRAFT" | "CANCEL";
  fullName: string;
  id: string;
  nickName: string;
  monthlyPrice: number;
  expiredDate: string;
  totalAccessibleInteraction: number;
}
