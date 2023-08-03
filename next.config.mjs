/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "./",
  output: "standalone",
  experimental: {
    appDir: true,
    mdxRs: true,
  },
};

export default nextConfig;
