export const getWebsiteLink = (link: string) => {
  return `${process.env.WEBSITE_URL}/${link}`;
};

export const getImageLink = (link: string | undefined) => {
  if (!link) return "";
  return `${process.env.HEROS_MEDIA_URL}/${link}`;
};
