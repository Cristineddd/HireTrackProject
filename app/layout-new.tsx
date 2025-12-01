import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// @ts-ignore - RootLayoutClient exists, TypeScript may need restart
import RootLayoutClient from "./RootLayoutClient";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

/**
 * Root Layout with SEO Metadata
 * This layout provides global metadata and semantic HTML structure
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://hiretrack.app'), // Update with your actual domain
  title: {
    default: 'HireTrack - Modern Recruitment and Hiring Platform',
    template: '%s | HireTrack',
  },
  description: 'HireTrack is a comprehensive recruitment platform that helps employers find the best talent and job seekers discover their dream careers. Streamline your hiring process with advanced analytics, applicant tracking, and interview scheduling.',
  keywords: [
    'recruitment',
    'hiring',
    'job board',
    'applicant tracking',
    'ATS',
    'job posting',
    'career opportunities',
    'talent acquisition',
    'HR software',
    'recruitment platform',
  ],
  authors: [{ name: 'HireTrack Team' }],
  creator: 'HireTrack',
  publisher: 'HireTrack',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hiretrack.app',
    siteName: 'HireTrack',
    title: 'HireTrack - Modern Recruitment and Hiring Platform',
    description: 'Streamline your hiring process with HireTrack. Find top talent or discover your next career opportunity.',
    images: [
      {
        url: '/og-image.png', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'HireTrack - Recruitment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireTrack - Modern Recruitment and Hiring Platform',
    description: 'Streamline your hiring process with HireTrack.',
    images: ['/og-image.png'],
    creator: '@hiretrack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#4F46E5" />
        <link rel="canonical" href="https://hiretrack.app" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
