/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bzvtmbwqhwoowdrd.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
