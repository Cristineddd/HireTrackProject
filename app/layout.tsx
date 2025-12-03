/**
 * Optimized Root Layout with Mobile Responsive Design
 * 
 * Features:
 * - Proper metadata configuration
 * - Font optimization with display: swap
 * - Mobile-responsive sidebar navigation
 * - Lazy-loaded components
 * - Performance optimized CSS
 * - Semantic HTML structure
 * - Full viewport optimization
 */

import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import RootLayoutClient from './RootLayoutClient';

// Font imports with optimization
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap', // Prevent layout shift
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

/**
 * Root Metadata
 * Optimized for SEO and social media
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hiretrack.app'),
  
  title: {
    default: 'HireTrack - Find Your Dream Job',
    template: '%s | HireTrack',
  },
  
  description: 'Modern recruitment platform connecting talented professionals with leading companies worldwide. Find jobs, apply instantly, and track your progress.',
  
  keywords: [
    'jobs',
    'career',
    'recruitment',
    'hiring',
    'employment',
    'job search',
    'career opportunities',
    'job listings',
  ],
  
  authors: [{ name: 'HireTrack', url: 'https://hiretrack.app' }],
  creator: 'HireTrack',
  publisher: 'HireTrack',
  
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hiretrack.app',
    siteName: 'HireTrack',
    title: 'HireTrack - Find Your Dream Job',
    description: 'Modern recruitment platform connecting talented professionals with leading companies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HireTrack - Find Your Dream Job',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'HireTrack',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HireTrack - Find Your Dream Job',
    description: 'Modern recruitment platform for job seekers and employers',
    images: ['/og-image.jpg'],
    creator: '@hiretrack',
  },

  icons: {
    icon: [
      { url: '/Logo.svg', sizes: '32x32' },
      { url: '/Logo.svg', sizes: '16x16' },
    ],
    apple: '/Logo.svg',
    other: [
      {
        rel: 'mask-icon',
        url: '/Logo.svg',
        color: '#4F46E5',
      },
    ],
  },

  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },

  themeColor: '#FFFFFF',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },

  alternates: {
    canonical: 'https://hiretrack.app',
    languages: {
      'en-US': 'https://hiretrack.app',
    },
  },
};

/**
 * Viewport configuration
 * Mobile optimization
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1F2937' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for API calls */}
        <link rel="dns-prefetch" href="https://api.hiretrack.app" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/Logo.svg" />
        
        {/* Mobile web app */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HireTrack" />
        
        {/* Performance optimization */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Structured data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HireTrack',
              url: 'https://hiretrack.app',
              logo: 'https://hiretrack.app/logo.png',
              description: 'Modern recruitment and hiring platform',
              sameAs: [
                'https://twitter.com/hiretrack',
                'https://linkedin.com/company/hiretrack',
                'https://facebook.com/hiretrack',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'support@hiretrack.app',
              },
            }),
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-slate-50 h-full font-sans overflow-x-hidden`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>

        {/* Performance monitoring script (optional) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                  if ('PerformanceObserver' in window) {
                    try {
                      const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                          console.log('Performance:', entry.name, entry.duration);
                        }
                      });
                      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
                    } catch (e) {}
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
      </div>
    </div>
  );
}
