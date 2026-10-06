import type { NextConfig } from 'next';
import imageRenames from './image-renames.json';

const nextConfig: NextConfig = {
  // Preserve indexed image URLs and existing links after descriptive renames.
  async redirects() {
    return imageRenames;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
