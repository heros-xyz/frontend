import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { convertTimeUnit } from "@/utils/time";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { access_token } = req.query;
	if (access_token) {
		setCookie(ACCESS_TOKEN_KEY, access_token, {
			res,
			req,
			path: "/",
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			expires: new Date(convertTimeUnit('1d')),
			sameSite: 'lax'
		});
		res.status(200).json({ message: "Set token successfully" });
	}
}
