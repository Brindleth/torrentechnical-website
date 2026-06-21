/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static HTML export → Cloudflare Pages (no server needed)
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
