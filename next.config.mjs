/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    turbo: {
      resolveAlias: {},
    },
  },
};

export default nextConfig;
