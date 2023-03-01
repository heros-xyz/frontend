import { IMeta } from "../athlete/types";

export interface IParams {
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  q?: string;
  userId?: string;
}

export interface IBenefit {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
  name: string;
}

export interface IMembershipTier {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
  name: string;
  monthlyPrice: number;
  tierDescription: string;
  benefits: IBenefit[];
  totalFan?: number;
}

export interface ITierMembershipList {
  data: IMembershipTier[];
  meta: IMeta;
}
