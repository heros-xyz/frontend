import { getCookie, setCookie } from "cookies-next";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { signOut } from "next-auth/react";
import { IAuthResponse, IToken } from "@/types/users/types";
import { $http } from "@/libs/http";
import { store } from "@/store";
import {
  finishLoading,
  setAccessToken,
  setRefreshToken,
  startLoading,
} from "@/store/globalSlice";
import { getEnvVariables } from "./env";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";
import { convertTimeUnit } from "./time";

const { HEROS_BASE_URL } = getEnvVariables();

export const updateSession = async () => {
  await fetch("/api/auth/session?update");
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const getAccessTokenFromCookie = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY, {
    req,
    res,
    path: "/",
  });

  return accessToken;
};

export const getUserRoleFromCookie = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userRole = getCookie("role", {
    req,
    res,
    path: "/",
  });

  return userRole;
};

export const setAccessTokenToCookie = (
  credentials: IToken,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { accessToken, refreshToken, refreshExpiresIn } = credentials;
  const refreshExpire = new Date().getTime() + +refreshExpiresIn * 1000;

  setCookie(ACCESS_TOKEN_KEY, accessToken, {
    req,
    res,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(convertTimeUnit('1d')),
    sameSite: 'lax'
  });

  setCookie(REFRESH_TOKEN_KEY, refreshToken, {
    req,
    res,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    expires: new Date(refreshExpire),
  });
};

export const fetchUser = async (accessToken: string) => {
  try {
    const res = await fetch(`${HEROS_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-FP-API-KEY": "iphone",
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signInSocial = async (
  data: {
    token: string | undefined;
    role: "FAN" | "ATHLETE" | "ADMIN";
    provider: string;
  },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const url =
      data.provider === "google"
        ? "/auth/google-authenticate"
        : "/auth/facebook-authenticate";
    const loginResp = await $http.post<unknown, IAuthResponse>(
      `${HEROS_BASE_URL}${url}`,
      data
    );

    if (loginResp) {
      const { accessToken } = loginResp.token;
      setAccessTokenToCookie(loginResp.token, req, res);

      const user = await fetchUser(accessToken);
      return Promise.resolve(user);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const onSignOut = async () => {
  store.dispatch(startLoading());
  await Promise.all([
    signOut({
      redirect: true,
      callbackUrl: "/",
    }),
    $http({
      baseURL: "",
      url: `/api/remove-authorization`,
    }),
    $http({
      method: "POST",
      baseURL: "",
      url: `/api/auth/sign-out`,
    }),
    ,
  ]);

  if (typeof window !== undefined) {
    setTimeout(() => {
      store.dispatch(finishLoading());
    }, 200);
  }
};

export const setTokenToStore = (
  storeSSR: typeof store,
  { req, res }: GetServerSidePropsContext
) => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY, {
    res,
    req,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  }) as string ?? "";

  const refreshToken = getCookie(REFRESH_TOKEN_KEY, {
    res,
    req,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  }) as string ?? "";

  storeSSR.dispatch(setAccessToken(accessToken));
  storeSSR.dispatch(setRefreshToken(refreshToken));
};
