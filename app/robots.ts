import { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/seo';

/**
 * robots.txt configuration for search engines
 * Controls how search engine crawlers access and crawl the site
 * Reference: https://www.robotstxt.org/
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // Rules for different user agents
    rules: [
      {
        // Default rules for all search engines
        userAgent: '*',
        allow: '/',
        // Disallow crawling sensitive pages that require authentication
        disallow: [
          '/admin',
          '/api/auth',
          '/api/users',
          '/api/applications',
          '/auth', // Authentication pages
          '/dashboard', // User dashboards
          '/applicants', // Applicant management (requires auth)
          '/analytics', // Analytics dashboard (requires auth)
          '/scheduling', // Scheduling dashboard (requires auth)
          '/open-positions/*/edit', // Edit pages
          '/jobs/*/edit', // Job edit pages
          '/*.json$', // JSON files
          '/*.pdf$', // PDF files
          '/*?*sort=', // Avoid crawling sorted results
          '/*?*filter=', // Avoid crawling filtered results
          '/*?*page=', // Avoid multiple pagination crawls
        ],
        // Moderate crawl delay (100ms between requests)
        crawlDelay: 0.1,
      },
      // More aggressive crawling allowed for Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/auth',
          '/dashboard',
          '/applicants',
          '/analytics',
          '/scheduling',
        ],
        crawlDelay: 0,
      },
      // Specific rules for Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/auth',
          '/dashboard',
          '/applicants',
          '/analytics',
          '/scheduling',
        ],
        crawlDelay: 1,
      },
      // Block aggressive scrapers and bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'ScrapeBot',
          'scrapy',
          'Nuclei',
        ],
        disallow: '/',
      },
    ],
    // Sitemap location for auto-discovery
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Preferred host for canonicalization
    host: SITE_URL,
  };
}
