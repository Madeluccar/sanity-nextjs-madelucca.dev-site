/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
