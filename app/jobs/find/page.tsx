"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Filter,
  BookmarkPlus,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { MOCK_JOBS } from "@/constants/mockData";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedDate: string;
  image?: string;
}

const FindJobsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(userData));
      // Use MOCK_JOBS from constants
      const jobsData = MOCK_JOBS.map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        description: job.description,
        postedDate: job.postedDate,
      }));
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      
      // Load saved jobs from localStorage
      const savedJobIds = localStorage.getItem('savedJobs');
      if (savedJobIds) {
        setSavedJobs(JSON.parse(savedJobIds));
      }
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Job type filter
    if (jobType !== "all") {
      filtered = filtered.filter((job) => job.type === jobType);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, location, jobType, jobs]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const updatedSavedJobs = prev.includes(jobId) 
        ? prev.filter((id) => id !== jobId) 
        : [...prev, jobId];
      
      // Save to localStorage
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
      
      return updatedSavedJobs;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Find Jobs</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Search and discover your next opportunity</p>
            </div>
            <Link href="/saved-jobs" className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap">
              <BookmarkPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Saved Jobs</span>
              <span className="sm:hidden">Saved</span>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Search jobs</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="City or Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Job type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-4 py-3 text-base sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs sm:text-sm text-slate-600">
                Found <span className="font-bold text-indigo-600">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </p>
              <button className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-lg text-slate-700 text-xs sm:text-sm font-medium transition-all hover:shadow-md">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Advanced Filters</span>
                <span className="sm:hidden">Filters</span>
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-3 sm:space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                          {job.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium">{job.company}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center gap-2.5 text-slate-600 min-w-0">
                          <div className="p-1.5 bg-blue-50 rounded-lg shrink-0 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-600 min-w-0">
                          <div className="p-1.5 bg-green-50 rounded-lg shrink-0 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="text-sm font-medium truncate">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-600 min-w-0">
                          <div className="p-1.5 bg-purple-50 rounded-lg shrink-0 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium truncate">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-600 min-w-0">
                          <div className="p-1.5 bg-orange-50 rounded-lg shrink-0 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium truncate">{job.postedDate}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 sm:flex-col sm:gap-2 shrink-0">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-3 rounded-lg transition-all flex items-center justify-center gap-2 sm:w-full min-w-11 sm:min-w-0 ${
                          savedJobs.includes(job.id)
                            ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                        title="Save job"
                      >
                        <BookmarkPlus className="w-5 h-5 shrink-0" />
                        <span className="text-xs sm:hidden">Save</span>
                      </button>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center justify-center gap-2 sm:w-full shadow-sm hover:shadow-md min-w-11 sm:min-w-0"
                        title="View job details"
                      >
                        <Send className="w-5 h-5 shrink-0" />
                        <span className="text-xs sm:hidden">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs found</h3>
                  <p className="text-slate-600 text-center max-w-sm">
                    Try adjusting your search terms or filters to find more opportunities
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobsPage;
