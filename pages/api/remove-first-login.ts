import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie("_FirstLogin", { req, res, httpOnly: true });
  res.status(200).json({ message: "Delete firstLogin successfully" });
}
