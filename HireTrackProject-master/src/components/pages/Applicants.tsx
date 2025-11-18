"use client";

import React, { useState } from 'react';
import {
  Search,
  Filter,
  User,
  Mail,
  Briefcase,
  Calendar,
  ChevronDown,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  MapPin,
  MoreHorizontal,
  Phone,
  Star
} from "lucide-react";

interface Applicant {
  id: number;
  initials: string;
  name: string;
  position: string;
  applicationDate: string;
  status: 'New' | 'Active' | 'Screening' | 'Interview' | 'Hired';
  email: string;
  location?: string;
  experience?: string;
  department?: string;
  rating?: number;
}

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const applicants: Applicant[] = [
    {
      id: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      applicationDate: '2024-01-15',
      status: 'New',
      email: 'sarah.johnson@example.com',
      department: 'Engineering',
      location: 'New York, NY',
      experience: '8 years',
      rating: 4.5
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      position: 'UX Designer',
      applicationDate: '2024-01-14',
      status: 'Screening',
      email: 'michael.chen@example.com',
      department: 'Design',
      location: 'San Francisco, CA',
      experience: '5 years',
      rating: 4.8
    },
    {
      id: 3,
      initials: 'ER',
      name: 'Emily Rodriguez',
      position: 'Product Manager',
      applicationDate: '2024-01-13',
      status: 'Interview',
      email: 'emily.rodriguez@example.com',
      department: 'Product',
      location: 'Austin, TX',
      experience: '6 years',
      rating: 4.2
    },
    {
      id: 4,
      initials: 'RM',
      name: 'Robert Manger',
      position: 'Backend Developer',
      applicationDate: '2024-01-12',
      status: 'Screening',
      email: 'robert.manger@example.com',
      department: 'Engineering',
      location: 'Remote',
      experience: '4 years',
      rating: 4.0
    },
    {
      id: 5,
      initials: 'AL',
      name: 'Amanda Lee',
      position: 'Data Analyst',
      applicationDate: '2024-01-11',
      status: 'Hired',
      email: 'amanda.lee@example.com',
      department: 'Analytics',
      location: 'Chicago, IL',
      experience: '3 years',
      rating: 4.9
    },
    {
      id: 6,
      initials: 'DW',
      name: 'David Wilson',
      position: 'DevOps Engineer',
      applicationDate: '2024-01-10',
      status: 'Interview',
      email: 'david.wilson@example.com',
      department: 'Engineering',
      location: 'Seattle, WA',
      experience: '7 years',
      rating: 4.3
    }
  ];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <AlertCircle className="w-3.5 h-3.5" />
        };
      case 'active':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: <CheckCircle className="w-3.5 h-3.5" />
        };
      case 'screening':
        return {
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Clock className="w-3.5 h-3.5" />
        };
      case 'interview':
        return {
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Calendar className="w-3.5 h-3.5" />
        };
      case 'hired':
        return {
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle className="w-3.5 h-3.5" />
        };
      default:
        return {
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <AlertCircle className="w-3.5 h-3.5" />
        };
    }
  };

  const statusCounts = {
    all: applicants.length,
    new: applicants.filter(a => a.status === 'New').length,
    screening: applicants.filter(a => a.status === 'Screening').length,
    interview: applicants.filter(a => a.status === 'Interview').length,
    hired: applicants.filter(a => a.status === 'Hired').length
  };

  const getInitialsColor = (initials: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-emerald-500',
      'bg-amber-500',
      'bg-rose-500',
      'bg-indigo-500'
    ];
    const charCode = initials.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Applicants</h1>
              <p className="text-slate-600">Manage and track all job applications in one place</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="w-4 h-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-700">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Applicant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'All', count: statusCounts.all, color: 'slate', active: statusFilter === 'all' },
            { label: 'New', count: statusCounts.new, color: 'blue', active: statusFilter === 'new' },
            { label: 'Screening', count: statusCounts.screening, color: 'amber', active: statusFilter === 'screening' },
            { label: 'Interview', count: statusCounts.interview, color: 'purple', active: statusFilter === 'interview' },
            { label: 'Hired', count: statusCounts.hired, color: 'emerald', active: statusFilter === 'hired' }
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setStatusFilter(stat.label.toLowerCase())}
              className={`p-4 rounded-xl border-2 transition-all ${
                stat.active
                  ? `border-${stat.color}-500 bg-${stat.color}-50 shadow-md`
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className={`text-2xl font-bold ${stat.active ? `text-${stat.color}-700` : 'text-slate-900'}`}>
                {stat.count}
              </div>
              <div className={`text-sm font-medium mt-1 ${stat.active ? `text-${stat.color}-600` : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </button>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, position, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-500 text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors bg-white">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">More Filters</span>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              <div className="hidden lg:flex items-center px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{filteredApplicants.length}</span> of {applicants.length} applicants
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredApplicants.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No applicants found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredApplicants.map((applicant) => {
                const statusConfig = getStatusConfig(applicant.status);
                const initialsColor = getInitialsColor(applicant.initials);

                return (
                  <div
                    key={applicant.id}
                    className="p-6 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Candidate Info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`w-12 h-12 ${initialsColor} rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                          <span className="text-white font-semibold text-sm">{applicant.initials}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-900 text-lg mb-1">{applicant.name}</h3>
                              <p className="text-slate-700 font-medium mb-2">{applicant.position}</p>
                            </div>
                            
                            {/* Status Badge - Mobile */}
                            <div className="lg:hidden">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                                {statusConfig.icon}
                                {applicant.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-4 h-4 shrink-0" />
                              <span className="truncate">{applicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <MapPin className="w-4 h-4 shrink-0" />
                              <span>{applicant.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Briefcase className="w-4 h-4 shrink-0" />
                              <span>{applicant.department}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">{applicant.experience}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-600">Applied {applicant.applicationDate}</span>
                            </div>
                            {applicant.rating && (
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium text-slate-700">{applicant.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:justify-center lg:min-w-[180px]">
                        {/* Status Badge - Desktop */}
                        <div className="hidden lg:block">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {applicant.status}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">1,000+ Companies</span> trust us to streamline their hiring process
          </p>
        </div>
      </div>
    </div>
  );
};

export default Applicants;