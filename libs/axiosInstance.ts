import { getCookie, setCookie } from "cookies-next";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import { IAuthResponse } from "@/types/users/types";
import { onSignOut } from "@/utils/auth";
import { $http } from "./http";

let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const setToken = (token: string | undefined) => {
  if (!token) return;
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

const setTokenToCookie = (token: string | undefined) => {
  setCookie("_Auth.access-token", token, {
    res: context.res,
    req: context.req,
    path: "/",
  });
};

axios.interceptors.request.use(
  async (config) => {
    const access_token = getCookie("_Auth.access-token", {
      res: context.res,
      req: context.req,
      path: "/",
    }) as string;

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
      const refreshToken = getCookie("_Auth.refresh-token", {
        res: context.res,
        req: context.req,
        path: "/",
      }) as string;

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
        }
      }
    }

    return axios(originalConfig);
  } catch (error) {
    await onSignOut();
    return Promise.reject(error);
  } finally {
    fetchingToken = false;
  }
};

export const axiosInstance = axios;
