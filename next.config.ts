/**
 * Next.js Configuration with Performance & SEO Optimizations
 * 
 * Features:
 * - Image optimization
 * - Security headers
 * - Redirects for SEO
 * - Caching strategies
 * - Compression
 * - Performance monitoring
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React compilation mode
  reactStrictMode: true,

  /**
   * Image Optimization
   */
  images: {
    // Remote image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.hiretrack.app',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    
    // Supported image formats (AVIF = fastest)
    formats: ['image/avif', 'image/webp'],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for srcSet
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache images for 1 year (immutable assets)
    minimumCacheTTL: 31536000,
    
    // Dangerously allow SVG (only from trusted sources)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /**
   * Security Headers
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Enable XSS filter
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          // DNS prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' *.google-analytics.com *.googletagmanager.com;",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Dynamic pages - revalidate frequently
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },

  /**
   * Redirects for SEO
   */
  async redirects() {
    return [
      // Legacy URLs to new structure
      {
        source: '/old-jobs-page',
        destination: '/jobs',
        permanent: true,
      },
      {
        source: '/old-applicants',
        destination: '/applicants',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/jobs',
        permanent: true,
      },
    ];
  },

  /**
   * Rewrites for API routing
   */
  async rewrites() {
    return {
      beforeFiles: [
        // Don't rewrite local API routes
        // Rewrite only external APIs if needed
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  /**
   * Environment Variables
   */
  env: {
    NEXT_PUBLIC_SITE_NAME: 'HireTrack',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://hiretrack.app',
  },

  /**
   * Production Builds
   */
  productionBrowserSourceMaps: false,
  
  /**
   * Module Aliases
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side optimizations
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Separate vendor code
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          priority: 10,
        },
        // Common code shared between pages
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      };
    }
    
    return config;
  },

  /**
   * Turbopack configuration (Next.js 14+)
   */
  turbopack: {
    root: process.env.npm_package_config_turbopack_root || process.cwd(),
  },

  /**
   * Experimental features
   */
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
