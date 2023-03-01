import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { signOut } from "next-auth/react";
import { IAuthResponse, IToken } from "@/types/users/types";
import { $http } from "@/libs/http";
import { store } from "@/store";
import { finishLoading, startLoading } from "@/store/globalSlice";

export const updateSession = async () => {
  await fetch("/api/auth/session?update");
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const getAccessTokenFromCookie = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const accessToken = getCookie("_Auth.access-token", {
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
  const expire = new Date().getTime() + 1000 * 24 * 60 * 60;
  const refreshExpire = new Date().getTime() + +refreshExpiresIn * 1000;

  setCookie("_Auth.access-token", accessToken, {
    req,
    res,
    path: "/",
    // httpOnly: true,
    // secure: process.env.NODE_ENV !== 'development',
    expires: new Date(expire),
  });

  setCookie("_Auth.refresh-token", refreshToken, {
    req,
    res,
    path: "/",
    expires: new Date(refreshExpire),
  });
};

export const fetchUser = async (accessToken: string) => {
  try {
    const res = await fetch(`${process.env.HEROS_BASE_URL}/auth/me`, {
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
    role: "FAN" | "ATHLETE";
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
      `${process.env.HEROS_BASE_URL}${url}`,
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
