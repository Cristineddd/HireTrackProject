import { MetadataRoute } from 'next';
import { fetchJobs } from '@/service/dataFetching';
import { SITE_URL } from '@/utils/seo';

/**
 * Dynamic sitemap generation for Next.js
 * Includes static pages and dynamic routes from database
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Static pages with priority levels
  // Priority: 1.0 = highest, 0.0 = lowest
  // Change frequency hints: always, hourly, daily, weekly, monthly, yearly, never
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs/find`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/jobs/post`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'never' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'never' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/open-positions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Fetch all active jobs for dynamic routes
  try {
    const { jobs: jobsList } = await fetchJobs();

    // Generate sitemap entries for each job
    const jobPages: MetadataRoute.Sitemap = jobsList.map((job: any) => {
      // Validate and parse the date
      const modifiedDate = job.updatedAt || job.postedDate || new Date();
      const lastModified = 
        typeof modifiedDate === 'string' 
          ? new Date(modifiedDate) 
          : modifiedDate;

      // Ensure valid date
      if (isNaN(lastModified.getTime())) {
        lastModified.setTime(Date.now());
      }

      return {
        url: `${baseUrl}/jobs/${job.id}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    return [...staticPages, ...jobPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if dynamic fetch fails
    return staticPages;
  }
}
