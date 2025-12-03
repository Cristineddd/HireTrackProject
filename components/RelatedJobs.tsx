'use client';

import Link from 'next/link';
import { Job } from '@/constants/mockData';

interface RelatedJobsProps {
  jobs: Job[];
  compact?: boolean;
}

export default function RelatedJobs({ jobs, compact = false }: RelatedJobsProps) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="space-y-1.5">
        {jobs.slice(0, 3).map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="bg-white border border-slate-200 rounded p-2 hover:shadow-sm transition-shadow block"
          >
            <h3 className="font-semibold text-slate-800 line-clamp-1 hover:text-indigo-600 text-xs leading-tight">
              {job.title}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">{job.company}</p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col h-full">
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 hover:text-indigo-600">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{job.company}</p>
            
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span>{job.location}</span>
            </div>

            <p className="text-sm font-semibold text-indigo-600 mt-auto">
              {job.salary}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span>{job.applicants} applicants</span>
              <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                {job.type}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
