import { BaseQueryFn, retry } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError: AxiosError | any) {
      return {
        error: {
          status: axiosError?.status || null,
          data: axiosError?.data || null,
        },
      };
    }
  };

export const staggeredAxiosBaseQuery = ({
  baseUrl = "",
}: {
  baseUrl: string;
}) =>
  retry(axiosBaseQuery({ baseUrl }), {
    maxRetries: 0,
  });
