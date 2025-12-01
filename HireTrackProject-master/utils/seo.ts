/**
 * SEO Utilities
 * Helper functions and constants for SEO optimization
 */

import type { Metadata } from 'next';

export const SITE_NAME = 'HireTrack';
export const SITE_URL = 'https://hiretrack.app'; // Update with your actual domain
export const SITE_DESCRIPTION = 'Modern recruitment and hiring platform connecting talented professionals with leading companies';

/**
 * Generate metadata for job listing pages
 */
export function generateJobMetadata(job: {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type: string;
}): Metadata {
  const title = `${job.title} at ${job.company}`;
  const description = job.description.substring(0, 160);
  
  return {
    title,
    description,
    keywords: [job.title, job.company, job.location, job.type, 'job opportunity', 'career'],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/jobs/${job.title.toLowerCase().replace(/\s+/g, '-')}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

/**
 * Generate JSON-LD structured data for job posting
 */
export function generateJobPostingSchema(job: {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type: string;
  postedDate: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    employmentType: job.type.toUpperCase().replace('-', '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
      },
    },
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'YEAR',
      },
    } : undefined,
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    sameAs: [
      // Add social media URLs
      'https://twitter.com/hiretrack',
      'https://linkedin.com/company/hiretrack',
    ],
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate default metadata for a page
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  options?: {
    keywords?: string[];
    noIndex?: boolean;
    ogImage?: string;
  }
): Metadata {
  return {
    title,
    description,
    keywords: options?.keywords,
    robots: options?.noIndex ? {
      index: false,
      follow: true,
    } : {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      images: options?.ogImage ? [
        {
          url: options.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: options?.ogImage ? [options.ogImage] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  };
}

/**
 * Common SEO-friendly HTML attributes
 */
export const semanticProps = {
  main: {
    role: 'main',
    'aria-label': 'Main content',
  },
  nav: {
    role: 'navigation',
    'aria-label': 'Main navigation',
  },
  search: {
    role: 'search',
    'aria-label': 'Search',
  },
  footer: {
    role: 'contentinfo',
    'aria-label': 'Footer',
  },
};
