import { getEnvVariables } from "@/utils/env";

export const useEnv = () => {
	const { WEBSITE_URL, NEXTAUTH_URL } = getEnvVariables()

	return {
		isProd: WEBSITE_URL === 'https://heros.xyz' || WEBSITE_URL === "https://www.heros.xyz",
		isDev: WEBSITE_URL === 'https://dev.heros.xyz' || WEBSITE_URL === 'https://www.dev.heros.xyz',
		isUat: WEBSITE_URL === 'https://uat.heros.xyz' || WEBSITE_URL === 'https://www.uat.heros.xyz',
		isDevelopment: NEXTAUTH_URL?.includes('localhost'),
	};
};
