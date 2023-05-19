import { AthleteProfile } from "@/libs/dtl/athleteProfile";
import { IUserComment } from "@/types/athlete/types";

export interface IAthleteInteraction {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  content: string;
  user: AthleteProfile;
  liked: boolean;
  publicType: string;
  publicDate: string | null | Date;
  interactionMedia: IInteractionMedia[];
  reactionCount: number;
  commentCount: number;
  isAccessRight: boolean;
  tags: {
    id: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    name: string;
  }[];
}

export interface IParamsPagination {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

export interface IAthleteInteractionResponse {
  meta: IParamsPagination;
  data: IAthleteInteraction[];
}

export interface IInteractionMedia {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: null;
  extension: string;
  type: string;
  sortOrder: number;
  url: string;
}

export interface IInteracionUser {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: null;
  firstName: string;
  lastName: string;
  role?: string;
  email?: string;
  password?: string;
  phone?: string;
  avatar: string;
  isVerified?: boolean;
  isConsumedOtp?: boolean;
  dateOfBirth?: Date | string;
  gender?: number;
  registeredType?: null;
  otp?: null;
  sentOtpTime?: null;
  stripeCustomerId?: null;
  netAmount?: number;
  nickName: string;
}

export interface IAthleteInteractionCommentResponse {
  meta: IParamsPagination;
  data: IAthleteInteractionComment[];
}

export interface IAthleteInteractionComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  user: IUserComment;
  reactedCommentsCount: number;
  liked?: boolean;
}

export interface IResponseReactInteraction {
  type: string;
  totalReaction: number;
  data: IReactInteraction;
}

export interface IReactInteraction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  reactionType: number;
}
