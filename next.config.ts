import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',      // Google user profile images
      'firebasestorage.googleapis.com',
      'placehold.co'  // Firebase Storage images (for uploaded avatars)
    ],
  },
  /* config options here */
};

export default nextConfig;
