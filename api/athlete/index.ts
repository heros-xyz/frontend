import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";
import {
  IAthleteSetupAccountParams,
  IAthleteSetupAccountData,
  IOnboardingBasicInfoParams,
  IOnboardingCareerJourneyParams,
  IOnboardingPageInfoParams,
  IOnboardingSportProfileParams,
} from "@/types/users/types";
import {
  IBasicInfo,
  IAthleteSearchProfile,
  ISearchAthleteParams,
  IPageInfo,
  ISportProfile,
  ICareerJourney,
  ListMembershipTiers,
  UpdatedSubscriptionInfo,
  AddSubscriptionForm,
  UpdateSubscriptionForm,
  IListFans,
  IFanInfo,
  IAddInteractionInfo,
  IMeta,
  IInteractionItem,
  IResponseComment,
  IWithdrawPayloadType,
  IWithdrawResponeType,
} from "@/types/athlete/types";

import { ITimeLineInfo } from "@/components/ui/Timeline";
import { INotificationInfo } from "@/types/notifications/types";
import { IPagination } from "@/types/globals/types";

export const athleteApi = createApi({
  reducerPath: "athleteApi",
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
  tagTypes: ["AtheleInteractions"],
  endpoints: (builder) => ({
    athleteSetupAccount: builder.mutation<
      IAthleteSetupAccountData,
      IAthleteSetupAccountParams
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("nickName", data.nickName);

        if (data.avatar) {
          formData.append("avatar", data.avatar);
        }

        return {
          url: `/users/setup-account/athlete`,
          method: "PUT",
          data: formData,
        };
      },
    }),
    onboardingBasicInformation: builder.mutation<
      any,
      IOnboardingBasicInfoParams
    >({
      query: (data) => ({
        url: `/onboarding/basic-information`,
        method: "PUT",
        data,
      }),
    }),
    getBasicInformation: builder.query<IBasicInfo, string>({
      query: (data) => ({
        url: `/onboarding/basic-information${data ? `/${data}` : ""}`,
        method: "GET",
        data,
      }),
    }),
    getPageInformation: builder.query<IPageInfo, string>({
      query: (data) => ({
        url: `/onboarding/page-information`,
        method: "GET",
        data,
      }),
    }),
    onboardingPageInformation: builder.mutation<any, IOnboardingPageInfoParams>(
      {
        query: (data) => ({
          url: `/onboarding/page-information`,
          method: "POST",
          data,
        }),
      }
    ),
    onboardingSportProfile: builder.mutation<
      any,
      IOnboardingSportProfileParams
    >({
      query: (data) => ({
        url: `/onboarding/sport-profile`,
        method: "POST",
        data,
      }),
    }),
    onboardingCareerJourney: builder.mutation<
      any,
      IOnboardingCareerJourneyParams[]
    >({
      query: (data) => ({
        url: `/onboarding/career-journey`,
        method: "POST",
        data,
      }),
    }),
    getTotalSubscription: builder.query<{ total: number }, string>({
      query: (data) => ({
        url: `/dashboard/total-subscription${data ? `/${data}` : ""}`,
        method: "get",
      }),
    }),
    getMembershipList: builder.query({
      query: (userId) => ({
        url: `/dashboard/list-membership-tiers`,
        method: "get",
        params: userId,
      }),
    }),
    getGrossAmountMoney: builder.query<{ total: number }, string>({
      query: () => ({
        url: `/dashboard/gross-amount-money`,
        method: "get",
      }),
    }),
    searchAthleteProfile: builder.query<IAthleteSearchProfile[], IPagination>({
      query: (params) => ({
        url: `/dashboard/search-athlete-profile`,
        method: "get",
        params,
      }),
    }),
    getSportProfile: builder.query<ISportProfile, string>({
      query: () => ({
        url: `/onboarding/sport-profile`,
        method: "GET",
      }),
    }),
    getCareerJourney: builder.query<ITimeLineInfo[], string>({
      query: () => ({
        url: `/onboarding/career-journey`,
        method: "GET",
      }),
      transformResponse: (response: ICareerJourney[]) => {
        return response.map((item, index) => ({
          title: item.title,
          description: item.description,
          from: item.startTime,
          to: item.endTime,
          isArchive: !!item.icon,
          isCurrent: index === 0,
          icon: item.icon,
        })) as ITimeLineInfo[];
      },
    }),
    // API Subscription (Add Tier)
    getSubscriptionInfo: builder.query<{ data: ListMembershipTiers[] }, string>(
      {
        query: (data) => ({
          url: `/dashboard/list-membership-tiers`,
          method: "GET",
          data,
        }),
      }
    ),
    getListBenefit: builder.query<{ value: string; label: string }[], string>({
      query: () => ({
        url: `/lookup/benefits-membership-tier`,
        method: "GET",
      }),
    }),
    addSubscriptionInfo: builder.mutation<
      UpdatedSubscriptionInfo,
      AddSubscriptionForm
    >({
      query: (data) => ({
        url: `/subscription/membership-tier`,
        method: "POST",
        data,
      }),
    }),
    updateSubscriptionInfo: builder.mutation<
      UpdatedSubscriptionInfo,
      UpdateSubscriptionForm
    >({
      query: (data) => ({
        url: `/subscription/membership-tier/${data.id}`,
        method: "PUT",
        data,
      }),
    }),
    getListFans: builder.query<IFanInfo[], IPagination>({
      query: (params) => ({
        url: `/dashboard/athlete/my-fans`,
        method: "GET",
        params,
      }),
      transformResponse: (response: IListFans) => {
        return response.data.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          fullName: item.sourceUser.firstName + " " + item.sourceUser.lastName,
          description: item.membershipTier.name,
          avatar: item.sourceUser.avatar,
          email: item.sourceUser.email,
        })) as IFanInfo[];
      },
    }),
    getListInteraction: builder.query<IInteractionItem[], IPagination>({
      query: (params) => ({
        url: `/interaction`,
        method: "GET",
        params,
      }),
      transformResponse: (response: {
        data: IInteractionItem[];
        meta: IMeta;
      }) => {
        return response.data.map((item) => item) as IInteractionItem[];
      },
    }),
    getMyListInteractions: builder.query<
      {
        data: IInteractionItem[];
        meta: IMeta;
      },
      IPagination
    >({
      query: (params) => ({
        url: `/interaction`,
        method: "GET",
        params,
      }),
      providesTags: () => ["AtheleInteractions"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache?.data.push(...newItems?.data);
        currentCache.meta = newItems?.meta;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getInteractionDetail: builder.query<IInteractionItem, string>({
      query: (interactionId) => ({
        url: `/interaction/detail/${interactionId}`,
        method: "GET",
      }),
    }),
    getListCommentInteraction: builder.query<
      { data: IResponseComment[]; totalComments: number; meta: IMeta },
      { interactionId?: string | string[]; pageInfo?: IPagination }
    >({
      query: ({ interactionId, pageInfo }) => ({
        url: `/comment/${interactionId}`,
        method: "GET",
        params: pageInfo,
      }),
    }),
    addPostInteraction: builder.mutation<
      IInteractionItem[],
      IAddInteractionInfo
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("publicType", data.publicType);
        formData.append(`tags`, JSON.stringify(data.tags));
        if (data.publicType === "fanOnly") {
          formData.append("publicDate", data.publicDate);
        }
        if (data.listMedia) {
          data.listMedia.forEach(({ file }) => {
            formData.append("listMedia", file);
          });
        }
        return {
          url: `/interaction`,
          method: "POST",
          data: formData,
        };
      },
    }),
    addCommentInteraction: builder.mutation<
      IResponseComment,
      {
        interactionId?: string | string[];
        content: string;
      }
    >({
      query: (data) => ({
        url: `/comment/interaction`,
        method: "POST",
        data,
      }),
    }),
    deletePostInteraction: builder.mutation<boolean, string>({
      query: (interactionId) => ({
        url: `/interaction/${interactionId}`,
        method: "DELETE",
      }),
    }),
    //Withdraw money
    updateWithdrawMoney: builder.mutation<
      IWithdrawResponeType,
      IWithdrawPayloadType
    >({
      query: (data) => ({
        url: `/payment-information/withdraw`,
        method: "POST",
        data,
      }),
    }),
    //Validate is fan
    getValidateIsFan: builder.query<any, string>({
      query: (id) => ({
        url: `/subscription/validate-is-fan/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAthleteSetupAccountMutation,
  useOnboardingBasicInformationMutation,
  useOnboardingCareerJourneyMutation,
  useOnboardingPageInformationMutation,
  useOnboardingSportProfileMutation,
  useGetTotalSubscriptionQuery,
  useGetMembershipListQuery,
  useGetBasicInformationQuery,
  useGetGrossAmountMoneyQuery,
  useSearchAthleteProfileQuery,
  useGetPageInformationQuery,
  useGetSportProfileQuery,
  useGetCareerJourneyQuery,
  useGetSubscriptionInfoQuery,
  useGetListBenefitQuery,
  useAddSubscriptionInfoMutation,
  useUpdateSubscriptionInfoMutation,
  useGetListFansQuery,
  useGetListInteractionQuery,
  useAddPostInteractionMutation,
  useGetListCommentInteractionQuery,
  useGetInteractionDetailQuery,
  useAddCommentInteractionMutation,
  useUpdateWithdrawMoneyMutation,
  useGetMyListInteractionsQuery,
  useDeletePostInteractionMutation,
  util: { resetApiState, invalidateTags },
  useGetValidateIsFanQuery,
} = athleteApi;

export const {} = athleteApi.endpoints;
