import { fetchJobs } from "@/service/dataFetching";
import Jobs from "../../components/pages/Jobs";

/**
 * Jobs Page with ISR (Incremental Static Regeneration)
 * This page is statically generated but revalidates every 60 seconds
 */

// Enable ISR with 60 second revalidation
export const revalidate = 60;

// Generate metadata for SEO
export const metadata = {
  title: 'HireTrack - Find Your Dream Job',
  description: 'Browse and manage job postings on HireTrack. Find the best opportunities or post new positions.',
  keywords: 'jobs, hiring, recruitment, career opportunities',
};

export default async function JobsPage() {
  // Fetch jobs data at build time and revalidate periodically
  const { jobs, lastUpdated } = await fetchJobs();
  
  return <Jobs initialJobs={jobs} lastUpdated={lastUpdated} />;
}
