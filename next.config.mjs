/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tacos.jacksonbaxter.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
