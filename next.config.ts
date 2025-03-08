import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',      // Google user profile images
      'firebasestorage.googleapis.com',
      'placehold.co'  // Firebase Storage images (for uploaded avatars)
    ],
  },
  eslint: {
    // This will ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
