import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie("_Auth.refresh-token", { req, res, path: "/" });
  deleteCookie("_Auth.access-token", { req, res, path: "/" });

  res.status(200).json({ message: "Remove token successfully" });
}
