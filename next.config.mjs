/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "*firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;


