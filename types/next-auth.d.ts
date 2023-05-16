import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string;
    user: IUser & DefaultSession["user"];
    accessToken: string;
  }
}

export interface User {
  id: number;
  tripla_uid: string;
}

export interface RefreshToken {
  token: string;
  expires_at: Date;
}

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  username: string;
  role: "FAN" | "ATHLETE" | "ADMIN";
  email: string;
  avatar: string;
  phone: string;
  isActive: boolean;
  dateOfBirth: string;
  gender: number;
  hasPaymentMethodInfo: boolean;
  hasFirstInteraction: boolean;
  isFinishOnboarding?: boolean;
  nickname: string;
  netAmount: number;
  hasCreateInteractionRecent: boolean;
  signInMethod: string;
}

export interface Option {
  label: string;
  value: any;
}
