const path = require("path");

const nextConfig = {
  env: {
    HEROS_BASE_URL: process.env.HEROS_BASE_URL,
    WEBSITE_URL: process.env.WEBSITE_URL,
    HEROS_MEDIA_URL: process.env.HEROS_MEDIA_URL,
    NEXT_PUBLIC_FIREBASE_CREDENTIALS: process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "icon-library.com",
      "cdn-dev.heros.xyz",
      "cdn-uat.heros.xyz",
      "cdn-prod.heros.xyz",
      "localhost",
      "nacho",
      "renzo",
      "fran",
      "firebasestorage.googleapis.com",
      process.env.HEROS_MEDIA_URL?.replace("https://", ""),
    ],
  },
};

module.exports = nextConfig;
