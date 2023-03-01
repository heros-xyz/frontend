import axios, { AxiosError, AxiosResponse } from "axios";

export const $http = axios.create({
  baseURL: process.env.HEROS_BASE_URL,
});

$http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    return Promise.reject(error?.response?.data || null);
  }
);
