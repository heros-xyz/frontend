import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertTimeUnit } from "@/utils/time";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email } = req.query;

	if (!email) {
		res.status(404).json({ message: "No email found" });
		return
	}

	if (email) {
		try {
			setCookie("_DefaultEmail", email, {
				req,
				res,
				httpOnly: true,
				expires: new Date(convertTimeUnit('6m')),
			});
			res.status(200).json({ message: "Set user default email successfully" });
		} catch (error) {
			res.status(400).json({ message: "Set user default email failure" });
		}
	}
}
