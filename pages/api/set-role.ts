import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role } = req.query;

  if (role) {
    setCookie("role", role, { req, res, httpOnly: true });
    res.status(200).json({ message: "Set user role successfully" });
  }
}
