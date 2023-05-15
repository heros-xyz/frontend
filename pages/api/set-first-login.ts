import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertTimeUnit } from "@/utils/time";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCookie("_FirstLogin", true, {
    req,
    res,
    httpOnly: true,
    expires: new Date(convertTimeUnit('30d')),
  });
  res.status(200).json({ message: "Set firstLogin successfully" });
}
