import { Session } from "next-auth";

export interface IAthlete {
  avatar: string;
  name: string;
  isRecommend: boolean;
}
export interface IGuards {
  session: Session | null;
}
export interface IOption {
  label: string;
  value: string;
}

export interface IPagination {
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  q?: string;
  fanName?: string;
  olderThan?: string | Date;
  sessionId?: number;
  searching?: string;
  limit?: number;
}
