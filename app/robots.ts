import { MetadataRoute } from 'next';

/**
 * robots.txt configuration for SEO
 * Controls how search engines crawl the site
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hiretrack.app'; // Update with your actual domain
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/login',
          '/auth/signup',
          '/applicants/',
          '/analytics/',
          '/scheduling/',
          '/open-positions/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/applicants/',
          '/analytics/',
          '/scheduling/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
