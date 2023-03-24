import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { $http } from "@/libs/http";
import { getEnvVariables } from "@/utils/env";

const { HEROS_BASE_URL } = getEnvVariables();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const refreshToken = getCookie("_Auth.refresh-token", {
    req,
    res,
    path: "/",
  });

  if (!refreshToken) return;

  try {
    await $http.post(`${HEROS_BASE_URL}/auth/sign-out`, {
      refreshToken,
    });
    res.status(200).send({ message: "Sign out successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
}
