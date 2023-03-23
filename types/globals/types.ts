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
  beforeDate?: string | Date;
  sessionId?: number;
  searching?: string;
  limit?: number;
  tag?: string;
  authorId?: string;
  offset?: number;
  isGetPublic?: boolean;
}

export interface ICommentParams {
  order?: "ASC" | "DESC";
  page?: number;
  take?: number;
  q?: string;
  limit?: number;
  authorId?: string;
  offset?: number;
  commentIdFocus?: string;
  getReply?: boolean;
}

export interface IHerosError {
  data: {
    message?: string;
    statusCode?: number;
    error?: string;
  };
  errors?: string;
  statusCode?: number;
}
