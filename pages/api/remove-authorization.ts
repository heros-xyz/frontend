import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "@/utils/constants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie(REFRESH_TOKEN_KEY, {
    req,
    res,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  });
  deleteCookie(ACCESS_TOKEN_KEY, {
    req,
    res,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Remove token successfully" });
}
