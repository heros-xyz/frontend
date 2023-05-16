import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { staggeredAxiosBaseQuery } from "@/libs/axiosBaseQuery";

export const adminApi = createApi({
	reducerPath: "adminApi",
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
		deleteComment: builder.mutation<unknown, string>({
			query: (commentId) => ({
				url: `/admin/comment/${commentId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useDeleteCommentMutation
} = adminApi;
