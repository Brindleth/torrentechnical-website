/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static HTML export → Cloudflare Pages (no server needed)
  images: { unoptimized: true },
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'framer-motion'],
  },
};

export default nextConfig;
