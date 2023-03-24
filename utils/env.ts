export const getEnvVariables = () => {
	return {
		HEROS_BASE_URL: process.env.HEROS_BASE_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		WEBSITE_URL: process.env.WEBSITE_URL,
		HEROS_MEDIA_URL: process.env.HEROS_MEDIA_URL,
		NODE_ENV: process.env.NODE_ENV,
	}
};
