/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
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
      process.env.HEROS_MEDIA_URL ?? ""
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
