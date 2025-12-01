/**
 * Data Fetching Service
 * Provides reusable data fetching functions for different pages
 * Supports SSR, SSG, and ISR patterns
 */

import { MOCK_JOBS, MOCK_APPLICANTS } from '@/constants/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch jobs data - suitable for ISR (Incremental Static Regeneration)
 * This can be used with Next.js revalidation
 */
export async function fetchJobs() {
  await delay(100); // Simulate API call
  
  return {
    jobs: MOCK_JOBS,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch single job by ID - suitable for SSG with dynamic paths
 */
export async function fetchJobById(id: string) {
  await delay(100); // Simulate API call
  
  const job = MOCK_JOBS.find(j => j.id === id);
  
  if (!job) {
    return null;
  }
  
  return {
    job,
    relatedJobs: MOCK_JOBS.filter(j => j.id !== id).slice(0, 3),
  };
}

/**
 * Fetch applicants data - suitable for SSR (Server-Side Rendering)
 * This data changes frequently and should be fetched on each request
 */
export async function fetchApplicants() {
  await delay(100); // Simulate API call
  
  return {
    applicants: MOCK_APPLICANTS,
    totalCount: MOCK_APPLICANTS.length,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch analytics data - suitable for ISR with shorter revalidation
 */
export async function fetchAnalytics() {
  await delay(100); // Simulate API call
  
  // Generate analytics from applicant data
  const totalApplicants = MOCK_APPLICANTS.length;
  const byStatus = MOCK_APPLICANTS.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    analytics: {
      totalApplicants,
      totalJobs: MOCK_JOBS.length,
      byStatus,
      activeJobs: MOCK_JOBS.filter(j => j.status === 'active').length,
    },
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch user-specific data (requires authentication)
 * Should be called client-side or with SSR
 */
export async function fetchUserData(userId: string) {
  await delay(100); // Simulate API call
  
  return {
    savedJobs: [],
    applications: [],
    postedJobs: [],
  };
}

/**
 * Search jobs with filters
 */
export async function searchJobs(params: {
  query?: string;
  location?: string;
  type?: string;
  salary?: string;
}) {
  await delay(100); // Simulate API call
  
  let filtered = [...MOCK_JOBS];
  
  if (params.query) {
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(params.query!.toLowerCase()) ||
      job.company.toLowerCase().includes(params.query!.toLowerCase())
    );
  }
  
  if (params.location) {
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(params.location!.toLowerCase())
    );
  }
  
  if (params.type && params.type !== 'all') {
    filtered = filtered.filter(job =>
      job.type.toLowerCase() === params.type!.toLowerCase()
    );
  }
  
  return {
    jobs: filtered,
    totalCount: filtered.length,
  };
}

/**
 * Fetch static data for homepage - suitable for SSG
 */
export async function fetchHomePageData() {
  await delay(100); // Simulate API call
  
  return {
    featuredJobs: MOCK_JOBS.slice(0, 6),
    stats: {
      totalJobs: MOCK_JOBS.length,
      totalCompanies: new Set(MOCK_JOBS.map(j => j.company)).size,
      totalApplicants: MOCK_APPLICANTS.length,
    },
    lastUpdated: new Date().toISOString(),
  };
}
