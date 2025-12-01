import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbo bundler configuration
  turbopack: {
    root: process.cwd(),
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.example.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      // Cache static assets
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache API responses
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, max-age=60, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/old-jobs-page',
        destination: '/jobs',
        permanent: true,
      },
      {
        source: '/old-applicants-page',
        destination: '/applicants',
        permanent: true,
      },
    ];
  },

  // Rewrites for API routing
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite API calls for cleaner URLs
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/:path*`,
        },
      ],
    };
  },

  // Environment variables available on client
  env: {
    NEXT_PUBLIC_SITE_NAME: 'HireTrack',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://hiretrack.app',
  },
};

export default nextConfig;
