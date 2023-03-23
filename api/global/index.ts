import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";
import { IOption, IPagination } from "@/types/globals/types";
import { INotificationInfo } from "@/types/notifications/types";
import { IMeta } from "@/types/athlete/types";

export const globalApi = createApi({
  reducerPath: "globalApi",
  baseQuery: staggeredAxiosBaseQuery({
    baseUrl: process.env.HEROS_BASE_URL || "",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    getNationality: builder.query<IOption[], string>({
      query: () => ({
        url: `/lookup/nationalities`,
        method: "get",
      }),
    }),
    getSportList: builder.query<IOption[], string>({
      query: () => ({
        url: `/lookup/sports`,
        method: "get",
      }),
    }),
    getListNotification: builder.query<
      {
        data: INotificationInfo[];
        meta: IMeta;
      },
      IPagination
    >({
      query: (params) => ({
        url: `/notification`,
        method: "GET",
        params,
      }),
      providesTags: () => ["Notifications"],
      keepUnusedDataFor: 0,
    }),
    maskNotification: builder.mutation<boolean, string>({
      query: (notificationId) => ({
        url: `/notification/mark-as-read/${notificationId}`,
        method: "PUT",
      }),
    }),
    maskAllNotification: builder.mutation<boolean, string | undefined>({
      query: () => ({
        url: `/notification/mark-all-as-read`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetNationalityQuery,
  useGetSportListQuery,
  useGetListNotificationQuery,
  useMaskNotificationMutation,
  useMaskAllNotificationMutation,
} = globalApi;

export const {} = globalApi.endpoints;
