import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";
import {
  IAthleteInteraction,
  IAthleteInteractionResponse,
  IResponseReactInteraction,
} from "@/modules/athlete-profile/interactions/constants";
import {
  IAthleteInfo,
  IAthleteProfileResponse,
  IAthleteUpToDate,
  IBasicInfo,
  ILatestInteraction,
  IPageInfo,
  ISportProfile,
  IMeta,
  IAthleteSubscribed,
} from "@/types/athlete/types";
import {
  AddPaymentForm,
  EditFanInfo,
  GetActiveSubscription,
  GetFanSetting,
  PaymentInfo,
  UpdatedPaymentInfo,
  UpdatePaymentForm,
} from "@/types/fan/types";
import { IPagination } from "@/types/globals/types";
import { IParams, ITierMembershipList } from "@/types/membership/types";
import { IFanSetupAccountParams } from "@/types/users/types";

export const fanApi = createApi({
  reducerPath: "fanApi",
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
    setUpAccount: builder.mutation<any, IFanSetupAccountParams>({
      query: (data) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("sportIds", data.sportIds);
        formData.append("gender", `${data.gender}`);
        if (data.avatar) {
          formData.append("avatar", data.avatar);
        }
        console.log(formData);

        return {
          url: `/users/setup-account/fan`,
          method: "POST",
          data: formData,
        };
      },
    }),
    getPaymentInfo: builder.query<PaymentInfo[], string>({
      query: (data) => ({
        url: `/payment-information`,
        method: "GET",
        data,
      }),
    }),
    addPaymentInfo: builder.mutation<UpdatedPaymentInfo, AddPaymentForm>({
      query: (data) => ({
        url: `/payment-information`,
        method: "POST",
        data,
      }),
    }),
    updatePaymentInfo: builder.mutation<UpdatedPaymentInfo, UpdatePaymentForm>({
      query: (data) => ({
        url: `/payment-information/${data.id}`,
        method: "PUT",
        data,
      }),
    }),
    getListAthleteSubscribed: builder.query<
      {
        data: IAthleteSubscribed[];
        meta: IMeta;
      },
      IPagination
    >({
      query: (params) => ({
        url: `/dashboard/subscribed-athletes`,
        method: "GET",
        params,
      }),
    }),
    getAthleteBasicInfo: builder.query<IBasicInfo, string>({
      query: (athleteId) => ({
        url: `/onboarding/basic-information/${athleteId}`,
        method: "GET",
      }),
    }),
    getAthletePageInfo: builder.query<IPageInfo, string>({
      query: (athleteId) => ({
        url: `/onboarding/page-information/${athleteId}`,
        method: "GET",
      }),
    }),
    getAthleteSportProfile: builder.query<ISportProfile, string>({
      query: (athleteId) => ({
        url: `/onboarding/sport-profile/${athleteId}`,
        method: "GET",
      }),
    }),
    getAthleteTierMembership: builder.query<ITierMembershipList, IParams>({
      query: (params) => ({
        url: `/dashboard/list-membership-tiers`,
        method: "GET",
        params,
      }),
    }),
    updateAthleteUpToDate: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/interaction/last-visited-time/${id}`,
        method: "PUT",
      }),
    }),
    getListAthleteUpToDate: builder.query<{ data: IAthleteUpToDate[] }, string>(
      {
        query: (params) => ({
          url: `/interaction/get-newest-interactions`,
          method: "GET",
          params,
        }),
      }
    ),
    getLatestInteraction: builder.query<
      { data: ILatestInteraction[]; meta: IMeta },
      IPagination
    >({
      query: (params) => ({
        url: `/interaction/get-latest-interaction`,
        method: "GET",
        params,
      }),
    }),

    getListAthleteRecommended: builder.query<IAthleteSubscribed[], IPagination>(
      {
        query: (params) => ({
          url: `/dashboard/recommended-athletes`,
          method: "GET",
          params,
        }),
      }
    ),
    getListAthleteMightLike: builder.query<IAthleteInfo[], string>({
      query: (params) => ({
        url: `/dashboard/might-like-athletes`,
        method: "GET",
        params,
      }),
    }),
    subscribeAthlete: builder.mutation<
      ITierMembershipList,
      {
        targetUserId: string;
        membershipTierId: string;
        paymentInformationId: string;
      }
    >({
      query: (data) => ({
        url: `/subscription`,
        method: "POST",
        data,
      }),
    }),
    getAthleteProfile: builder.query<IAthleteProfileResponse, string>({
      query: (athleteId) => ({
        url: `/dashboard/athlete-profile/${athleteId}`,
        method: "GET",
      }),
    }),
    // Active Subscriptions
    getActiveSubscriptions: builder.query<
      { data: GetActiveSubscription[] },
      string
    >({
      query: (data) => ({
        url: `/dashboard/subscribed-athletes`,
        method: "GET",
        data,
      }),
    }),
    deleteSubscriptions: builder.mutation<UpdatedPaymentInfo, string>({
      query: (id) => ({
        url: `/subscription/unsubscribe/${id}`,
        method: "PUT",
      }),
    }),
    getAthleteListInteraction: builder.query<
      IAthleteInteractionResponse,
      {
        athleteId?: string | string[];
        params: {
          order: "ASC" | "DESC";
          page: number;
          take: number;
          q?: string;
          tag?: string;
        };
      }
    >({
      query: (args) => {
        const { athleteId, params } = args;
        return {
          url: `/interaction/get-list-interaction/${athleteId}`,
          method: "GET",
          params,
        };
      },
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // merge: (currentCache, newItems) => {
      //   currentCache?.data.push(...newItems?.data);
      //   currentCache.meta = newItems?.meta;
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   console.log(currentArg, previousArg);

      //   return currentArg !== previousArg;
      // },
    }),
    getAthleteInteractionDetail: builder.query<IAthleteInteraction, string>({
      query: (postId) => ({
        url: `/interaction/detail/${postId}`,
        method: "GET",
      }),
    }),
    reactionInteraction: builder.mutation<
      IResponseReactInteraction,
      {
        interactionId: string | string[] | undefined;
        reactionType: number;
      }
    >({
      query: (data) => ({
        url: `/reaction/interaction`,
        method: "POST",
        data,
      }),
    }),
    replyComment: builder.mutation<
      string,
      {
        interactionId?: string | string[];
        content: string;
        commentId: string;
      }
    >({
      query: (data) => ({
        url: "/comment/reply-comments",
        method: "POST",
        data,
      }),
    }),
    reactionComment: builder.mutation<
      {
        totalReaction: number;
        type: "like" | "unlike";
      },
      { commentId?: string; reactionCommentType: number }
    >({
      query: (data) => ({
        url: "/reaction/comments",
        method: "POST",
        data,
      }),
    }),
    // Fan Edit Information
    getFanSetting: builder.query<GetFanSetting, string>({
      query: () => ({
        url: `/dashboard/fan-setting`,
        method: "GET",
      }),
    }),
    editFanInfo: builder.mutation<any, EditFanInfo>({
      query: (data) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("sportIds", data.sportIds);
        formData.append("gender", `${data.gender}`);
        if (data.avatar) {
          formData.append("avatar", data.avatar);
        }
        return {
          url: `/users/account-information/fan`,
          method: "PUT",
          data: formData,
        };
      },
    }),
  }),
});

export const {
  useSetUpAccountMutation,
  useGetPaymentInfoQuery,
  useAddPaymentInfoMutation,
  useUpdatePaymentInfoMutation,
  useGetAthleteBasicInfoQuery,
  useGetAthletePageInfoQuery,
  useGetAthleteSportProfileQuery,
  useGetAthleteTierMembershipQuery,
  useSubscribeAthleteMutation,
  useUpdateAthleteUpToDateMutation,
  useGetListAthleteUpToDateQuery,
  useGetListAthleteRecommendedQuery,
  useGetListAthleteMightLikeQuery,
  useGetListAthleteSubscribedQuery,
  useGetAthleteProfileQuery,
  useGetActiveSubscriptionsQuery,
  useDeleteSubscriptionsMutation,
  useGetLatestInteractionQuery,
  useGetAthleteListInteractionQuery,
  useGetAthleteInteractionDetailQuery,
  useReactionInteractionMutation,
  useReplyCommentMutation,
  useReactionCommentMutation,
  useGetFanSettingQuery,
  useEditFanInfoMutation,
  util: { getRunningQueriesThunk, resetApiState },
} = fanApi;

export const { getAthleteBasicInfo, getAthleteProfile, getPaymentInfo } =
  fanApi.endpoints;