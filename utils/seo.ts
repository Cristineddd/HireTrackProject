/**
 * SEO Utilities
 * Helper functions and constants for SEO optimization
 */

import type { Metadata } from 'next';

export const SITE_NAME = 'HireTrack';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiretrack.app';
export const SITE_DESCRIPTION = 'Modern recruitment and hiring platform connecting talented professionals with leading companies worldwide';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

/**
 * Generate metadata for any page with comprehensive SEO tags
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  options?: {
    keywords?: string[];
    noIndex?: boolean;
    ogImage?: string;
    canonical?: string;
  }
): Metadata {
  const canonicalUrl = options?.canonical || `${SITE_URL}${path}`;
  const ogImage = options?.ogImage || DEFAULT_OG_IMAGE;

  return {
    title: `${title} | ${SITE_NAME}`,
    description: sanitizeDescription(description, 160),
    keywords: options?.keywords || ['recruitment', 'hiring', 'jobs', 'career'],
    
    robots: options?.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-snippet': -1 },
    
    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
      creator: '@hiretrack',
    },

    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    creator: SITE_NAME,
  };
}

/**
 * Generate metadata for job listing pages
 */
export function generateJobMetadata(job: {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  type: string;
  postedDate?: string;
  slug?: string;
}): Metadata {
  const jobUrl = `/jobs/${job.slug || job.id}`;
  const salary = job.salary ? ` - ${job.salary}` : '';
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`;
  
  return generatePageMetadata(
    `${job.title} at ${job.company}${salary}`,
    `${sanitizeDescription(job.description, 150)}... Apply now on ${SITE_NAME}`,
    jobUrl,
    {
      keywords: [
        job.title,
        job.company,
        job.location,
        job.type,
        'job',
        'opportunity',
        'hiring',
        'career',
      ],
      ogImage,
    }
  );
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
      currency: 'PHP',
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
 * Helper function to sanitize description for meta tags
 */
function sanitizeDescription(description: string, maxLength = 160): string {
  return description
    .replace(/[<>]/g, '')
    .substring(0, maxLength)
    .replace(/\s+$/, '')
    .concat(description.length > maxLength ? '...' : '');
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

/**
 * Generate SearchAction schema for site search
 */
export function generateSearchActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Person schema (for company pages/team)
 */
export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  url?: string;
  image?: string;
  email?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    url: person.url,
    image: person.image,
    email: person.email,
  };
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
