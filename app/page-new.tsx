import type { Metadata } from 'next';
import { fetchHomePageData } from '@/service/dataFetching';
// TODO: Create HomePageClient component from existing app/page.tsx
// import HomePageClient from './HomePageClient';

/**
 * Homepage with SSG (Static Site Generation) for optimal SEO
 * This page is statically generated with revalidation
 * 
 * NOTE: This is an enhanced version. To use it:
 * 1. Extract the client component from app/page.tsx into HomePageClient.tsx
 * 2. Pass featuredJobs and stats as props to HomePageClient
 * 3. Replace the original app/page.tsx with this file
 */

// Enable ISR with 3600 second (1 hour) revalidation
export const revalidate = 3600;

// SEO Metadata
export const metadata: Metadata = {
  title: 'HireTrack - Find Your Dream Job or Hire Top Talent',
  description: 'HireTrack connects talented professionals with leading companies. Whether you\'re looking for your next career opportunity or searching for the perfect candidate, HireTrack makes hiring simple and efficient.',
  keywords: [
    'job search',
    'job board',
    'recruitment',
    'hiring platform',
    'career opportunities',
    'job listings',
    'find jobs',
    'post jobs',
    'applicant tracking',
  ],
  openGraph: {
    title: 'HireTrack - Find Your Dream Job or Hire Top Talent',
    description: 'Connect with top employers and talented candidates on HireTrack.',
    type: 'website',
    url: 'https://hiretrack.app',
  },
  alternates: {
    canonical: 'https://hiretrack.app',
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HireTrack',
  description: 'Modern recruitment and hiring platform',
  url: 'https://hiretrack.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://hiretrack.app/jobs/find?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default async function HomePage() {
  // Fetch static data for the homepage
  const { featuredJobs, stats } = await fetchHomePageData();

  // TODO: Replace with HomePageClient when created
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to HireTrack</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalJobs}</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Companies</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalCompanies}</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Applicants</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalApplicants}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-sm text-blue-600 mt-2">{job.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
  // Uncomment when HomePageClient is created:
  // return (
  //   <>
  //     <script
  //       type="application/ld+json"
  //       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  //     />
  //     <HomePageClient 
  //       featuredJobs={featuredJobs} 
  //       stats={stats}
  //     />
  //   </>
  // );
}
