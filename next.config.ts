// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  transpilePackages: [
    "sanity",
    "@sanity/ui",
    "@sanity/icons",
    "@sanity/vision",
    "@sanity/client",
    "@sanity/portable-text-editor",
    "next-sanity",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};