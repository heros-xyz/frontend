import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const expire = new Date().getTime() + 1000 * 24 * 60 * 60 * 30;
  setCookie("_FirstLogin", true, {
    req,
    res,
    httpOnly: true,
    expires: new Date(expire),
  });
  res.status(200).json({ message: "Set firstLogin successfully" });
}
