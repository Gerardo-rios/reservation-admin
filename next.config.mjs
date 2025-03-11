/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set both basePath and assetPrefix to your repository name
  basePath: '/reservation-admin',
  assetPrefix: '/reservation-admin/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
