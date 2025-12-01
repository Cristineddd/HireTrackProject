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

  // Mock job data
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Company A",
      location: "San Francisco, CA",
      salary: "$120,000 - $160,000",
      type: "Full-time",
      description: "We are looking for an experienced Frontend Developer...",
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "Design Studio B",
      location: "Remote",
      salary: "$80,000 - $110,000",
      type: "Full-time",
      description: "Create beautiful user experiences for our products...",
      postedDate: "3 days ago",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Tech Company C",
      location: "New York, NY",
      salary: "$100,000 - $150,000",
      type: "Full-time",
      description: "Lead product strategy and roadmap planning...",
      postedDate: "1 day ago",
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Tech Startup D",
      location: "Austin, TX",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      description: "Build scalable backend systems with Node.js...",
      postedDate: "4 days ago",
    },
    {
      id: "5",
      title: "Marketing Manager",
      company: "Marketing Agency E",
      location: "Los Angeles, CA",
      salary: "$70,000 - $100,000",
      type: "Full-time",
      description: "Develop and execute marketing campaigns...",
      postedDate: "5 days ago",
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "Tech Company F",
      location: "Remote",
      salary: "$110,000 - $160,000",
      type: "Full-time",
      description: "Work with big data and machine learning...",
      postedDate: "1 day ago",
    },
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(userData));
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
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
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white border-b-2 border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Find Jobs</h1>
            <p className="text-sm text-gray-600 font-medium">
              Hello, {user?.fullName || "Applicant"}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
              <input
                type="text"
                placeholder="Job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md font-medium"
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700 font-medium">
            Found <span className="text-blue-600 font-bold">{filteredJobs.length}</span> jobs
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg text-gray-900 font-semibold transition-all shadow-sm hover:shadow-md hover:scale-105">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="border-2 border-blue-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-4">{job.company}</p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{job.postedDate}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-3 rounded-lg transition-all hover:scale-105 ${
                          savedJobs.includes(job.id)
                            ? "bg-blue-100 text-blue-600 border-2 border-blue-500 shadow-md"
                            : "bg-white text-gray-600 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-sm"
                        }`}
                        title="Save job"
                      >
                        <BookmarkPlus className="w-5 h-5" />
                      </button>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="p-3 rounded-lg bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                        title="Apply now"
                      >
                        <Send className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="border-2 border-blue-200 bg-white p-12">
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobsPage;
