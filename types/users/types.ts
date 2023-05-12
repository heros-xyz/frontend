export interface IAthleteSetupAccountParams {
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  avatar?: File | null;
}
export interface IFanSetupAccountParams {
  firstName: string;
  lastName: string;
  gender: number;
  sportIds: string;
  dateOfBirth: string;
  avatar: File | null | undefined;
}

export interface IAthleteSetupAccountData {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  email: string;
  avatar: string;
  phone: string;
  isActive: boolean;
  dateOfBirth: string | Date;
  gender: number;
}

export interface OnboardingInformationResponse {
  hasBasicInformation: boolean;
  hasPageInformation: boolean;
  hasSportProfile: boolean;
  hasCareerJourney: boolean;
}

export interface IOnboardingPageInfoParams {
  id: string;
  tagLine: string;
  tags: string[];
}

export interface IOnboardingBasicInfoParams {
  dateOfBirth: string | Date;
  gender: number;
  nationalityId: string;
  story: string;
}

export interface IOnboardingSportProfileParams {
  sportId: string;
  currentTeam: string;
  goal: string;
  sports?: { value: string, label: string }
}

export interface IOnboardingCareerJourneyParams {
  isPeriodDate: boolean;
  startDate: string;
  endDate: string | null;
  title: string;
  description: string;
  icon?: string;
}

export interface ISignInWithEmailParams {
  email: string;
  role?: string;
}

export interface IVerifyOTP {
  email: string;
  otp: number;
}

interface IUser {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  avatar: string;
  phone?: number;
  dateOfBirth: string;
  gender: string;
  signInMethod: string;
  netAmount?: number;
}
export interface IToken {
  expiresIn: number | string;
  accessToken: string;
  refreshToken: string;
  refreshExpiresIn: number | string;
}

export interface IAuthResponse {
  user: IUser;
  token: IToken;
}
