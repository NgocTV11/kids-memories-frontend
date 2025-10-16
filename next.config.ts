import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations */
  
  // Enable React Strict Mode for better development
  reactStrictMode: true,
  
  // Optimize production builds
  swcMinify: true,
  
  // Reduce bundle size by removing unused code
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Disable ESLint during build (errors won't block production build)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize for faster builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
