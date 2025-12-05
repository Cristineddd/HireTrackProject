/**
 * Optimized Job Details Page with SSG + ISR
 * 
 * Features:
 * - Static Generation for popular jobs
 * - ISR revalidation every 24 hours
 * - SEO metadata & structured data
 * - Lazy-loaded related components
 * - Image optimization
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateJobMetadata, generateJobPostingSchema } from '@/utils/seo';
import { fetchJobById } from '@/service/dataFetching';
import Image from 'next/image';
import Script from 'next/script';
import { MOCK_JOBS } from '@/constants/mockData';
import type { Job } from '@/constants/mockData';
import RelatedJobs from '../../../components/RelatedJobs';
import ApplyButton from '../../../components/ApplyButton';
import JobComments from '../../../components/JobComments';

/**
 * Generate static params for all jobs
 * This pre-renders all jobs at build time
 */
export async function generateStaticParams() {
  try {
    // Generate params for all jobs to ensure they're all accessible
    return MOCK_JOBS.map((job) => ({
      id: job.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Dynamic metadata for SEO
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  try {
    const { id } = await params;
    const jobData = await fetchJobById(id);
    
    if (!jobData || !jobData.job) {
      return {
        title: 'Job Not Found | HireTrack',
        robots: { index: false },
      };
    }

    return generateJobMetadata(jobData.job);
  } catch (error) {
    return {
      title: 'Job Listing | HireTrack',
    };
  }
}

// Revalidate every 24 hours (can be on-demand via revalidatePath)
export const revalidate = 86400;

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const jobId = id;

  try {
    // Fetch job data
    const jobData = await fetchJobById(jobId);

    if (!jobData || !jobData.job) {
      return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
          <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10a4 4 0 018 0m-4-8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Job Not Found</h1>
                <p className="text-slate-600 text-center max-w-md mb-8">The job you're looking for doesn't exist or has been removed.</p>
                <a href="/jobs/find" className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all">
                  Back to Jobs
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const job = jobData.job;
    const relatedJobs = jobData.relatedJobs || [];

    // Generate structured data for SEO
    const jobSchema = generateJobPostingSchema(job);

    return (
      <>
        {/* JSON-LD Structured Data */}
        <Script
          id="job-posting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        />

        <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
          {/* Hero Section */}
          <section className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4 font-medium">{job.company}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4m0 0L14 6m2-2l2 2M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-50 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{job.postedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="w-full sm:w-auto">
                  <Suspense fallback={<div className="h-12 w-full sm:w-32 bg-slate-200 rounded-lg animate-pulse" />}>
                    <ApplyButton jobId={job.id} />
                  </Suspense>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Main Content */}
              <article className="lg:col-span-3">
                {/* Description */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About the Role</h2>
                  {job.description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: job.description }}
                      className="text-slate-700 leading-relaxed mb-8 prose prose-sm max-w-none"
                    />
                  )}
                </div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
                    <ul className="space-y-3">
                      {job.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="p-1.5 bg-green-50 rounded-lg shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Benefits</h2>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="p-1.5 bg-yellow-50 rounded-lg shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <span className="text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Comments Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Discussion</h2>
                  <Suspense fallback={<CommentsSkeleton />}>
                    <JobComments jobId={job.id} />
                  </Suspense>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-2">
                {/* Quick Info - Clean Card Design */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Quick Info</h3>
                  <div className="space-y-4">
                    {/* Job Type */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15a23.931 23.931 0 01-9-1.745M12 9a3 3 0 100-6 3 3 0 000 6z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Type</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">{job.type}</p>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">{job.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Experience</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">{job.experience}</p>
                        </div>
                      </div>
                    </div>

                    {/* Salary */}
                    {job.salary && (
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Salary Range</p>
                            <p className="text-sm font-semibold text-slate-900 mt-1">{job.salary}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Applications */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M12 4.354a4 4 0 018.048 0M12 12v8m-4-4h8" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Applications</p>
                          <p className="text-sm font-semibold text-slate-900 mt-1">{job.applicants || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Similar Jobs */}
                {relatedJobs && relatedJobs.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Similar Jobs</h3>
                    <div className="space-y-3">
                      <Suspense fallback={<div className="space-y-3">{[1,2,3].map(i => <div key={i} className="bg-slate-200 rounded-lg h-14 animate-pulse" />)}</div>}>
                        <RelatedJobs jobs={relatedJobs} compact={true} />
                      </Suspense>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error rendering job page:', error);
    
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9 9 0 119.84 17.93M9 12h6" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Error Loading Job</h1>
              <p className="text-slate-600 text-center max-w-md mb-8">There was an error loading this job. Please try again later.</p>
              <a href="/jobs/find" className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all">
                Back to Jobs
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Loading Skeletons
function RelatedJobsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
      ))}
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse" />
      ))}
    </div>
  );
}
