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
  athleteId: string;
  autoRenew: boolean;
  avatar: string;
  status: "ACTIVE" | "EXPIRED" | "DRAFT" | "CANCEL";
  fullName: string;
  id: string;
  nickName: string;
  monthlyPrice: number;
  expiredDate: string;
  totalAccessibleInteraction: number;
}

export interface GetFanSetting {
  avatar: string;
  dateOfBirth: string;
  email: string;
  fanInformation: {
    fanSports: {
      id: string;
      sport: {
        id: string;
        name: string;
      };
    }[];
  };
  firstName: string;
  lastName: string;
  gender: number;
  id: string;
}

export interface EditFanInfo {
  gender: number;
  sportIds: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatar?: File;
}
