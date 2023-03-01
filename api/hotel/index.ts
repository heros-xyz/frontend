import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";
import { store } from "@/store";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
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
    getHotelDetail: builder.query({
      query: (hotelId: number | string | string[]) => ({
        url: `/hotels/${hotelId}`,
        method: "get",
      }),
    }),

    getsRoomAndPlans: builder.query<
      any,
      {
        hotelId: number;
        params: any;
      }
    >({
      query: (args) => {
        const { hotelId, params } = args;
        return {
          url: `/hotels/${hotelId}/rooms`,
          method: "get",
          params,
        };
      },
    }),
  }),
});

export const {
  useGetHotelDetailQuery,
  useGetsRoomAndPlansQuery,
  util: { getRunningOperationPromises },
} = hotelApi;

export const { getHotelDetail, getsRoomAndPlans } = hotelApi.endpoints;

export const selectHotelDetail = (id: string) =>
  getHotelDetail.select(id)(store.getState());
