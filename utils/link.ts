import { getEnvVariables } from "./env";
const { HEROS_MEDIA_URL, WEBSITE_URL } = getEnvVariables()

export const getWebsiteLink = (link: string) => {
  return `${WEBSITE_URL}/${link}`;
};

export const getImageLink = (link: string | undefined) => {
  if (!link) return "";
  return `${HEROS_MEDIA_URL}/${link}`;
};

export const getVideoLink = (link: string | undefined) => {
  if (!link) return "";
  return `${HEROS_MEDIA_URL}/${link}#t=0.001`;
};

