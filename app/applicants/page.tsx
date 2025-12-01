"use client";

import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  DollarSign,
  MoreHorizontal
} from "lucide-react";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'Rejected' | 'Accepted';
  salary?: string;
  location?: string;
}

const MyApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const mockApplications: Application[] = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Corp',
      appliedDate: '2024-01-15',
      status: 'Reviewing',
      salary: '$120k - $150k',
      location: 'New York, NY'
    },
    {
      id: 2,
      jobTitle: 'UX/UI Designer',
      company: 'Design Studio',
      appliedDate: '2024-01-14',
      status: 'Interview',
      salary: '$90k - $120k',
      location: 'San Francisco, CA'
    },
    {
      id: 3,
      jobTitle: 'Product Manager',
      company: 'Startup Inc',
      appliedDate: '2024-01-13',
      status: 'Applied',
      salary: '$110k - $140k',
      location: 'Remote'
    },
    {
      id: 4,
      jobTitle: 'Backend Engineer',
      company: 'Cloud Solutions',
      appliedDate: '2024-01-12',
      status: 'Accepted',
      salary: '$130k - $160k',
      location: 'Austin, TX'
    },
    {
      id: 5,
      jobTitle: 'Data Scientist',
      company: 'AI Labs',
      appliedDate: '2024-01-11',
      status: 'Rejected',
      salary: '$100k - $135k',
      location: 'Boston, MA'
    }
  ];

  const [applications] = useState<Application[]>(mockApplications);

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <AlertCircle className="w-3 h-3" />
        };
      case 'reviewing':
        return {
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Clock className="w-3 h-3" />
        };
      case 'interview':
        return {
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Calendar className="w-3 h-3" />
        };
      case 'accepted':
        return {
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle className="w-3 h-3" />
        };
      case 'rejected':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: <AlertCircle className="w-3 h-3" />
        };
      default:
        return {
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <AlertCircle className="w-3 h-3" />
        };
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      <div className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Applications</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 sm:mt-2">Track all your job applications in one place</p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 flex-1 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by job title, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <button className="flex items-center gap-2 px-3 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                  <Filter className="w-4 h-4" />
                  More Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-slate-600">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="hidden sm:table-cell py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="hidden lg:table-cell py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="hidden md:table-cell py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-right text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApplications.map((application) => {
                  const statusConfig = getStatusConfig(application.status);
                  return (
                    <tr key={application.id} className="hover:bg-slate-50 transition-colors group bg-white">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors shrink-0">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800 truncate">{application.jobTitle}</p>
                            <p className="text-sm text-slate-600 truncate">{application.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="truncate">{application.location}</span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                          <DollarSign className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="truncate">{application.salary}</span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                          {application.appliedDate}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {application.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium whitespace-nowrap">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0">
                            <MoreHorizontal className="w-4 h-4 text-slate-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredApplications.length === 0 && (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
                <button className="px-4 py-2 border-2 border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
