// next.config.ts
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dummyjson.com", "dummyjson.com"], 
  },
  experimental: {
    // appDir is enabled by default in Next.js 13+ and removed in v15
  },
};

export default nextConfig;
