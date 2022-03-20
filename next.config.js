/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.ASSETS_DOMAIN}`],
  },
  env: {
    ENDPOINT_URL: process.env.ENDPOINT_URL,
  },
}
