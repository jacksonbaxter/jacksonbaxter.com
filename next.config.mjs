/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [48, 96, 175, 352, 576],
    minimumCacheTTL: 604800,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
