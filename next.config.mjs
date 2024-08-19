/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.anit.dev" }],
  },
};

export default nextConfig;
