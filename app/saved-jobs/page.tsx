"use client";

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_JOBS } from '@/constants/mockData';
import { 
  Heart,
  MapPin,
  DollarSign,
  Briefcase,
  Trash2,
  ExternalLink,
  Search
} from "lucide-react";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch saved jobs from localStorage
  useEffect(() => {
    const savedJobIds = localStorage.getItem('savedJobs');
    const jobIds = savedJobIds ? JSON.parse(savedJobIds) : [];
    
    // Get the actual job data from MOCK_JOBS
    const jobs: SavedJob[] = jobIds
      .map((id: string) => MOCK_JOBS.find((job: any) => job.id === id))
      .filter((job: any): job is typeof MOCK_JOBS[0] => job !== undefined)
      .map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        postedDate: job.postedDate,
        description: job.description
      }));
    
    setSavedJobs(jobs);
    setIsLoading(false);
  }, []);

  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (jobId: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedJobs);
    
    // Update localStorage
    const updatedJobIds = updatedJobs.map(job => job.id);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobIds));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Saved Jobs</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Your collection of favorite job postings</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search saved jobs by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-base sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 mt-3">
              {filteredJobs.length} saved job{filteredJobs.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Saved Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredJobs.map((job) => (
                <a
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="cursor-pointer group"
                >
                  <Card className="p-5 sm:p-6 bg-white shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 truncate">{job.company}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(job.id);
                        }}
                        className="ml-3 p-2 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-semibold text-slate-900">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                          <Briefcase className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium group-hover:ring-2 group-hover:ring-indigo-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Job
                      </button>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                {searchTerm ? 'No saved jobs found' : 'No saved jobs yet'}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Start saving jobs to keep track of opportunities you are interested in'}
              </p>
              <a
                href="/jobs/find"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-all"
              >
                Explore Jobs
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
