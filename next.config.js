/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", //TODO: Re-eneable ssr
  env: {
    HEROS_BASE_URL: process.env.HEROS_BASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    WEBSITE_URL: process.env.WEBSITE_URL,
    HEROS_MEDIA_URL: process.env.HEROS_MEDIA_URL,
    NEXT_PUBLIC_FIREBASE_CREDENTIALS:
      process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS,
  },
  publicRuntimeConfig: {
    HEROS_BASE_URL: process.env.HEROS_BASE_URL,
    WEBSITE_URL: process.env.WEBSITE_URL,
    HEROS_MEDIA_URL: process.env.HEROS_MEDIA_URL,
  },
  serverRuntimeConfig: {
    HEROS_BASE_URL: process.env.HEROS_BASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    WEBSITE_URL: process.env.WEBSITE_URL,
    HEROS_MEDIA_URL: process.env.HEROS_MEDIA_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "icon-library.com",
      "heros-media-dev.s3-website-ap-southeast-1.amazonaws.com",
      "cdn-dev.heros.xyz",
      "cdn-uat.heros.xyz",
      "cdn-prod.heros.xyz",
      "localhost",
      "100.77.4.16",
      "renzo",
      process.env.HEROS_MEDIA_URL?.replace("https://", ""),
    ],
  },
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
