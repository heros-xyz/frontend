import { IReplyComment } from "@/components/ui/Comment/List/index.stories";

export interface Nationality {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: Date | string | null;
  name: string;
  code: string;
  phoneCode: string;
  twoLetterCode?: string;
  threeLetterCode?: string;
}

export interface IBasicInfo {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: Date | string | null;
  nickName: string;
  story?: string;
  nationality: Nationality;
  dateOfBirth: string;
  gender: number;
}

export interface ISearchAthleteParams {
  searching: string;
  limit: number;
}

export interface IAthleteSearchProfile {
  id: string;
  sport: string;
  sourceSubscriptionsTotal?: number;
  fullName: string;
  fan?: number;
  avatar: string;
}
export interface IPageInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  tagLine: string;
  tags: string[];
}

export interface ISportProfile {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    currentTeam: string;
    goal: string;
    sportProfilesItems: {
      createdAt: string;
      deletedAt: string;
      id: string;
      sport: {
        createdAt: string;
        deletedAt: string;
        id: string;
        updatedAt: string;
        name: string;
      };
      updatedAt: string;
    }[];
  };
  success: boolean;
}
export interface ITakeAthlete {
  take: number;
}

export interface ICareerJourney {
  createdAt?: string;
  id: string;
  icon: string;
  startTime: string | null;
  endTime: string | null;
  title: string;
  description: string;
}

export interface SubscriptionInfo {
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
[];

export interface UpdatedSubscriptionInfo {
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

export interface AddSubscriptionForm {
  name: string;
  monthlyPrice: number;
  tierDescription: string;
  listBenefitsId: string[];
}

export interface UpdateSubscriptionForm {
  id: string;
  name: string;
  monthlyPrice: number;
  tierDescription: string;
  listBenefitsId: string[];
}
export interface ListMembershipTiers {
  benefits: {
    createAt: string;
    deleteAt: string | null;
    id: string;
    name: string;
    updatedAt: string;
  }[];
  totalFan: number;
  createdAt: string;
  deleteAt: string | null;
  id: string;
  monthlyPrice: number;
  name: string;
  tierDescription: string;
  updatedAt: string;
}
export interface IAthleteProfileResponse {
  id: string;
  avatar: string;
  fullName: string;
  sourceSubscriptionsTotal: number;
  sport: string;
  tagLine: string;
  nationality: Nationality;
  story: string;
  gender: number;
  dateOfBirth: Date;
  currentTeam: string;
  goal: string;
}
export interface IAthleteUpToDate {
  id: string;
  status: number;
  totalNewestInteraction: number;
  targetUser: {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
}
export interface ILatestInteraction {
  id: string;
  content: string;
  user: {
    id: string;
    avatar: string;
  };
  interactionMedia: {
    id: string;
    url: string;
  }[];
}

export interface IAthleteInfo {
  id: string;
  fullName: string;
  avatar: string;
  createdAt: string;
  recommended?: boolean;
  description?: string;
  totalSubscribed?: string;
  sportName: string;
}

export interface ISourceUser {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  avatar: string;
  gender: number;
}

export interface MembershipTier {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: string;
  name: string;
  monthlyPrice?: number | null;
  tierDescription: string;
}

export interface IFanItem {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sourceUser: ISourceUser;
  startDate: Date | string;
  expiredDate: Date | string;
  status: number;
  membershipTier: MembershipTier;
}

export interface IMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IListFans {
  data: IFanItem[];
  meta: IMeta;
}

export interface IFanInfo {
  avatar: string;
  fullName: string;
  description?: string;
  createdAt: string | Date;
  id?: string;
  email?: string;
}
export interface IUploadFileInteraction {
  type: string;
  file: File;
}
export interface IAddInteractionInfo {
  content: string;
  tags: string[];
  listMedia: IUploadFileInteraction[];
  publicType: string;
  publicDate: string;
}
export interface IInteractionMedia {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | string | null;
  extension: string;
  type: string;
  sortOrder: number;
  url: string;
}

export interface ITags {
  id: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  name: string;
}

export interface IInteractionItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  tags: ITags[];
  publicType: string;
  publicDate?: Date | string | null;
  interactionMedia: IInteractionMedia[];
  commentCount: number;
  reactionCount: number;
  isCurrentUserReacted: boolean;
  user?: IUserPostInfo;
  liked: boolean;
}
export interface IUserPostInfo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: string | null;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  isVerified: boolean;
  isConsumedOtp: boolean;
  dateOfBirth: Date;
  gender: number;
  registeredType?: string | null;
  otp?: string | null;
  sentOtpTime?: string | null;
  stripeCustomerId?: string | null;
  netAmount: number;
}

export interface IUserComment {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IResponseComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  user: IUserComment;
  reactedCommentsCount: number;
  parentComment?: {
    content: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  liked: boolean;
}

// Withdraw money

export interface IWithdrawPayloadType {
  bankName: string;
  swiftCode: string;
  cardNumber: string;
}
export interface PaymentInfoType {
  bankName: string;
  cardNumber: string;
  cvv: string | null;
  expiredDate: string | null;
  id: string;
  paymentType: string;
  postCode: string | null;
  swiftCode: string;
  user: IUserPostInfo;
}
export interface IWithdrawResponeType {
  createdAt: string;
  deletedAt: string | null;
  id: string;
  netAmount: string;
  paymentInformation: PaymentInfoType;
  status: string;
  updateAt: string;
}
