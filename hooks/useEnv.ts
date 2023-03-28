import { getEnvVariables } from "@/utils/env";

export const useEnv = () => {
	const { WEBSITE_URL, NEXTAUTH_URL } = getEnvVariables()

	return {
		isProd: WEBSITE_URL === 'https://heros.xyz',
		isDev: WEBSITE_URL === 'https://dev.heros.xyz',
		isUat: WEBSITE_URL === 'https://uat.heros.xyz',
		isDevelopment: NEXTAUTH_URL?.includes('localhost'),
	};
};
