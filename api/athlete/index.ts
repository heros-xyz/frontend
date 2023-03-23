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
  IPageInfo,
  ISportProfile,
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
  IBasicInfoParams,
  EditPageInfo,
} from "@/types/athlete/types";

import { ITimeLineInfo } from "@/components/ui/Timeline";
import { ICommentParams, IPagination } from "@/types/globals/types";

export const athleteApi = createApi({
  reducerPath: "athleteApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
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
        formData.append("middleName", data.middleName);
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
      { items: IOnboardingCareerJourneyParams[] }
    >({
      query: (data) => ({
        url: `/onboarding/career-journey/bulk`,
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
    getMembershipList: builder.query<{ data: ListMembershipTiers[] }, string>({
      query: (userId) => ({
        url: `/dashboard/list-membership-tiers`,
        method: "get",
        params: {
          userId,
        },
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
    // API CareerJourney
    getCareerJourney: builder.query<ITimeLineInfo[], string>({
      query: (id: string) => ({
        url: `/onboarding/career-journey/athlete/${id ?? "0"}`,
        method: "GET",
      }),
    }),
    getMilestone: builder.query<ITimeLineInfo, string>({
      query: (id: string) => ({
        url: `/onboarding/career-journey/${id ?? "0"}`,
        method: "GET",
      }),
    }),
    editMilestone: builder.mutation<any, any>({
      query: (data) => ({
        url: `/onboarding/career-journey`,
        method: "POST",
        data,
      }),
    }),
    deleteMilestone: builder.mutation<any, any>({
      query: (id: string) => ({
        url: `/onboarding/career-journey/${id}`,
        method: "DELETE",
      }),
    }),
    // API Subscription (Add Tier)
    getSubscriptionInfo: builder.query<{ data: ListMembershipTiers[] }, string>(
      {
        query: (userId) => ({
          url: `/dashboard/list-membership-tiers`,
          method: "GET",
          params: {
            userId,
          },
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
    getListInteractionByTag: builder.query<
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
    }),
    getInteractionDetail: builder.query<IInteractionItem, string>({
      query: (interactionId) => ({
        url: `/interaction/detail/${interactionId}`,
        method: "GET",
      }),
    }),
    getListCommentInteraction: builder.query<
      { data: IResponseComment[]; totalComments: number; meta: IMeta },
      {
        interactionId?: string | string[];
        authorId?: string;
        pageInfo?: ICommentParams;
      }
    >({
      query: ({ interactionId, authorId, pageInfo }) => ({
        url: `/comment/${interactionId}`,
        method: "GET",
        params: { authorId, ...pageInfo },
      }),
    }),
    getTotalComments: builder.query<
      number,
      {
        interactionId?: string | string[];
        authorId?: string;
        pageInfo?: IPagination;
      }
    >({
      query: ({ interactionId, authorId, pageInfo }) => ({
        url: `/comment/${interactionId}`,
        method: "GET",
        params: { authorId, ...pageInfo },
      }),
      transformResponse: (response: {
        data: IResponseComment[];
        totalComments: number;
        meta: IMeta;
      }) => {
        return response.meta.itemCount as number;
      },
    }),
    addPostInteraction: builder.mutation<
      IInteractionItem[],
      IAddInteractionInfo
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append(`tags`, JSON.stringify(data.tags));
        if (data.schedule) {
          formData.append("publicDate", data.publicDate);
        }
        data.listMedia.forEach(({ file }) => {
          formData.append("listMedia", file);
        });
        return {
          url: `/interaction`,
          method: "POST",
          data: formData,
        };
      },
    }),
    updatePostInteraction: builder.mutation<
      IInteractionItem[],
      { interactionId: string; data: IAddInteractionInfo }
    >({
      query: ({ interactionId, data }) => {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append(`tags`, JSON.stringify(data.tags));
        data.listMedia.forEach(({ file }) => {
          formData.append("listMedia", file);
        });
        if (data.schedule) {
          formData.append("publicDate", data.publicDate);
        }
        if (data.listMediaExisted?.length) {
          data.listMediaExisted = data.listMediaExisted.map((item) => {
            return {
              ...item,
              file: item.fileName,
            };
          });
          formData.append(
            `listMediaExisted`,
            JSON.stringify(data.listMediaExisted)
          );
        }
        return {
          url: `/interaction/${interactionId}`,
          method: "PUT",
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
      keepUnusedDataFor: 1,
    }),
    putSportProfile: builder.mutation<
      boolean,
      {
        id: string;
        data: {
          currentTeam: string;
          sportId: string;
          goal: string;
        };
      }
    >({
      query: ({ data, id }) => ({
        url: `/onboarding/sport-profile/${id}`,
        method: "PUT",
        data,
      }),
    }),
    editBasicInfo: builder.mutation<boolean, IBasicInfoParams>({
      query: (data) => ({
        url: `/users/basic-information`,
        method: "PUT",
        data,
      }),
    }),
    editPageInfo: builder.mutation<any, EditPageInfo>({
      query: (data) => {
        const formData = new FormData();
        formData.append("nickName", data.nickName);
        formData.append("tagLine", data.tagLine);
        formData.append("tags", JSON.stringify(data.tags));
        if (data.avatar) {
          formData.append("avatar", data.avatar);
        }
        return {
          url: `/users/page-information`,
          method: "PUT",
          data: formData,
        };
      },
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
  useGetMilestoneQuery,
  useEditMilestoneMutation,
  useDeleteMilestoneMutation,
  useGetSubscriptionInfoQuery,
  useGetListBenefitQuery,
  useAddSubscriptionInfoMutation,
  useUpdateSubscriptionInfoMutation,
  useGetListFansQuery,
  useGetListInteractionByTagQuery,
  useAddPostInteractionMutation,
  useGetListCommentInteractionQuery,
  useGetInteractionDetailQuery,
  useAddCommentInteractionMutation,
  useUpdateWithdrawMoneyMutation,
  useGetMyListInteractionsQuery,
  useDeletePostInteractionMutation,
  useUpdatePostInteractionMutation,
  useGetValidateIsFanQuery,
  usePutSportProfileMutation,
  useEditBasicInfoMutation,
  useEditPageInfoMutation,
  useGetTotalCommentsQuery,
} = athleteApi;

export const { getValidateIsFan } = athleteApi.endpoints;
