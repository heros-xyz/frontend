import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { IAuthResponse } from "@/types/users/types";
import { onSignOut } from "@/utils/auth";
import { store } from "@/store";
import { setAccessToken } from "@/store/globalSlice";
import { $http } from "./http";

export const setToken = (token: string | undefined) => {
  if (!token) return;
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

const setTokenToCookie = async (token: string | undefined) => {
  await fetch(`/api/set-access-token?access_token=${token}`)
};

axios.interceptors.request.use(
  async (config) => {
    const access_token = store.getState().appState.accessToken
    const headers = (config.headers as any) || {};

    if (access_token && headers) {
      headers["authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let fetchingToken = false;
let signingOut = false;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalConfig = { ...error.config };
    if (error?.response?.status === 401) {
      return refreshToken(originalConfig);
    }

    return Promise.reject(error?.response || null);
  }
);

const refreshToken = async (originalConfig: AxiosRequestConfig<any>) => {
  try {
    if (!fetchingToken) {
      fetchingToken = true;
      const refreshToken = store.getState().appState.refreshToken
      if (!refreshToken) {
        await onSignOut();
        return;
      }

      const response = await $http.post<unknown, IAuthResponse>(
        `${process.env.HEROS_BASE_URL}/auth/refresh`,
        {
          refreshToken,
        }
      );

      if (response) {
        const access_token = response.token?.accessToken;
        const headers = (originalConfig.headers as any) || {};

        if (access_token) {
          headers["authorization"] = `Bearer ${access_token}`;
          setToken(access_token as string);
          setTokenToCookie(access_token);
          store.dispatch(setAccessToken(access_token))
        }
      }
    }

    return axios(originalConfig);
  } catch (error) {
    if (!signingOut) {
      signingOut = true
      await onSignOut();
    }

    return Promise.reject(error);
  } finally {
    signingOut = false
    fetchingToken = false;
  }
};

export const axiosInstance = axios;
