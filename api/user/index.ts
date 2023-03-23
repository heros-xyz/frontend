import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";
import {
  IAuthResponse,
  ISignInWithEmailParams,
  IVerifyOTP,
  OnboardingInformationResponse,
} from "@/types/users/types";
import { IUser } from "@/types/next-auth";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: staggeredAxiosBaseQuery({
    baseUrl: process.env.HEROS_BASE_URL || "",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    profile: builder.query<IUser, string>({
      query: () => {
        return {
          url: `/auth/me`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 10,
    }),
    getOnboardingInformation: builder.query<
      OnboardingInformationResponse,
      string
    >({
      query: () => ({
        url: `/onboarding/on-boarding-info`,
        method: "GET",
      }),
    }),
    preSignInWithEmail: builder.mutation<IUser, ISignInWithEmailParams>({
      query: (data) => ({
        url: `/auth/pre-login-passwordless`,
        method: "POST",
        data,
      }),
    }),
    resendOtp: builder.mutation<IUser, string>({
      query: (email) => ({
        url: `/auth/pre-login-passwordless`,
        method: "POST",
        data: { email },
      }),
    }),
    verifyOtp: builder.mutation<IAuthResponse, IVerifyOTP>({
      query: (data) => ({
        url: `/auth/verify-passwordless`,
        method: "POST",
        data,
      }),
    }),
    signOut: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/sign-out`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useGetOnboardingInformationQuery,
  usePreSignInWithEmailMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useSignOutMutation,
  util: { getRunningQueriesThunk },
} = userApi;

export const { profile, getOnboardingInformation } = userApi.endpoints;
