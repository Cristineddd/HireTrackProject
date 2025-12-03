import type { Metadata } from 'next';
import LandingPage from './page-client';

export const metadata: Metadata = {
  title: 'HireTrack - Find Your Dream Job | Modern Recruitment Platform',
  description: 'Browse thousands of job opportunities and land your next role. HireTrack connects talented professionals with top companies. Apply in seconds, track your progress, and get hired faster.',
  keywords: 'jobs, careers, recruitment, job search, hiring, employment opportunities, career platform',
  authors: [{ name: 'HireTrack' }],
  creator: 'HireTrack',
  openGraph: {
    title: 'HireTrack - Find Your Dream Job',
    description: 'Find your dream job on HireTrack. Connect with top companies and accelerate your career.',
    type: 'website',
    locale: 'en_US',
    url: 'https://hiretrack.app',
    siteName: 'HireTrack',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HireTrack - Find Your Dream Job',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireTrack - Find Your Dream Job',
    description: 'Find your dream job on HireTrack. Connect with top companies.',
    images: ['/og-image.jpg'],
    creator: '@hiretrack',
  },
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
  alternates: {
    canonical: 'https://hiretrack.app',
  },
  other: {
    'og:type': 'website',
  },
};

export default LandingPage;
