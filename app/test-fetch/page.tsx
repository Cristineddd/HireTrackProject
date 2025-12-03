'use client';

import { useEffect, useState } from 'react';
import { MOCK_JOBS } from '@/constants/mockData';

export default function TestFetchPage() {
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFetch = async (jobId: string) => {
    setLoading(true);
    try {
      // Direct mock data access
      const job = MOCK_JOBS.find(j => j.id === jobId);
      console.log('Fetched job:', job);
      setJobData(job);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Mock Data Fetch Demo</h1>

        {/* All Jobs List */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">All Available Jobs</h2>
          <div className="grid grid-cols-1 gap-2">
            {MOCK_JOBS.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200 hover:bg-slate-100"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    Job #{job.id}: {job.title}
                  </p>
                  <p className="text-sm text-slate-600">{job.company}</p>
                </div>
                <button
                  onClick={() => testFetch(job.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700"
                >
                  Fetch
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {jobData && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">✅ Fetched Data</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-600">ID</p>
                <p className="text-lg font-bold text-slate-900">{jobData.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Title</p>
                <p className="text-lg font-bold text-slate-900">{jobData.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Company</p>
                <p className="text-lg text-slate-900">{jobData.company}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Location</p>
                <p className="text-lg text-slate-900">{jobData.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Salary</p>
                <p className="text-lg text-slate-900">{jobData.salary}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Applicants</p>
                <p className="text-lg font-bold text-indigo-600">{jobData.applicants} applicants</p>
              </div>
              <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800 font-medium">✨ Mock data is being fetched successfully!</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-slate-600">Loading...</p>
          </div>
        )}

        {!jobData && !loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800">Click "Fetch" on any job to see the data</p>
          </div>
        )}
      </div>
    </div>
  );
}
