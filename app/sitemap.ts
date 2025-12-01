import { MetadataRoute } from 'next';
import { fetchJobs } from '@/service/dataFetching';

/**
 * Sitemap generator for SEO
 * Dynamically generates sitemap.xml with all public pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hiretrack.app'; // Update with your actual domain
  
  // Fetch all jobs for dynamic job pages
  const { jobs } = await fetchJobs();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs/find`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs/post`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  
  // Dynamic job pages
  const jobPages: MetadataRoute.Sitemap = jobs.map(job => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...jobPages];
}
