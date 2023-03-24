import axios, { AxiosError, AxiosResponse } from "axios";
import { getEnvVariables } from "@/utils/env";
const { HEROS_BASE_URL } = getEnvVariables()
export const $http = axios.create({
  baseURL: HEROS_BASE_URL,
});

$http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    return Promise.reject(error?.response?.data || null);
  }
);
