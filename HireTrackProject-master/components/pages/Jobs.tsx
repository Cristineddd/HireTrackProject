"use client";

import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  ExternalLink,
  ChevronDown,
  Star,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedDate: string;
  applicants: number;
  description: string;
  skills: string[];
  isBookmarked: boolean;
}

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      experience: '5+ years',
      postedDate: '2024-01-15',
      applicants: 45,
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React, TypeScript, and modern web technologies.',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
      isBookmarked: false
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Studios',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90k - $130k',
      experience: '3+ years',
      postedDate: '2024-01-14',
      applicants: 32,
      description: 'Join our design team to create exceptional user experiences. You will work on product design, user research, and collaborate with cross-functional teams.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
      isBookmarked: true
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'DataFlow Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $110k',
      experience: '2+ years',
      postedDate: '2024-01-13',
      applicants: 28,
      description: 'We need a skilled Data Analyst to help us make data-driven decisions. You will work with large datasets, create reports, and provide insights to stakeholders.',
      skills: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
      isBookmarked: false
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $170k',
      experience: '4+ years',
      postedDate: '2024-01-12',
      applicants: 19,
      description: 'Lead product development from ideation to launch. Work closely with engineering, design, and marketing teams to deliver successful products.',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Communication'],
      isBookmarked: false
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110k - $150k',
      experience: '3+ years',
      postedDate: '2024-01-11',
      applicants: 37,
      description: 'Manage our cloud infrastructure and CI/CD pipelines. Ensure high availability, scalability, and security of our applications.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      isBookmarked: true
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesLocation && matchesType;
  });

  const toggleBookmark = (jobId: number) => {
    // In a real app, this would update the backend
    console.log('Toggle bookmark for job:', jobId);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Find Jobs</h1>
            <p className="text-slate-600 mt-2">Discover opportunities that match your skills and career goals</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Saved Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 flex-1 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="san francisco">San Francisco</option>
                <option value="new york">New York</option>
                <option value="austin">Austin</option>
                <option value="seattle">Seattle</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>

              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                <Filter className="w-4 h-4" />
                More Filters
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-slate-600 mt-4 lg:mt-0">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Job Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                    <div className="flex items-center gap-4 text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(job.id)}
                    className={`p-2 ${job.isBookmarked ? 'text-indigo-600' : 'text-slate-400'} hover:text-indigo-600`}
                  >
                    <Bookmark className={`w-5 h-5 ${job.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <p className="text-slate-700 mb-4 line-clamp-2">{job.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {job.experience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 lg:min-w-[200px]">
                <Button className="w-full flex items-center gap-2">
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
                setTypeFilter('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
