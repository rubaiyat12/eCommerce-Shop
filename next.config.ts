// next.config.ts
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com'], 
  },
  experimental: {
    // `appDir` is enabled by default in Next.js 13+ and removed from config in v15
    // So you do not need to manually specify it
  },
};

export default nextConfig;
