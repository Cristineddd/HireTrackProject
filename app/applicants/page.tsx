"use client";

import React, { useState, useRef, useEffect } from 'react';
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
  ArrowDown,
  Trash2
} from "lucide-react";
import { MOCK_JOBS } from '@/constants/mockData';

interface Application {
  id: string;
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
  const [applications, setApplications] = useState<Application[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToApplications = () => {
    applicationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter(app => app.id !== appId));
    
    // Also update localStorage
    const savedApplicationIds = localStorage.getItem('applications');
    const appliedJobIds = savedApplicationIds ? JSON.parse(savedApplicationIds) : [];
    const updatedIds = appliedJobIds.filter((id: string) => id !== appId);
    localStorage.setItem('applications', JSON.stringify(updatedIds));
    
    setDeleteConfirmId(null);
  };
  
  // Load applications from localStorage
  useEffect(() => {
    const savedApplicationIds = localStorage.getItem('applications');
    const appliedJobIds = savedApplicationIds ? JSON.parse(savedApplicationIds) : [];
    
    // Get the actual job data from MOCK_JOBS
    const statuses: Array<'Applied' | 'Reviewing' | 'Interview' | 'Rejected' | 'Accepted'> = ['Applied', 'Reviewing', 'Interview', 'Rejected', 'Accepted'];
    
    const applicationsList = appliedJobIds
      .map((jobId: string) => {
        const job = MOCK_JOBS.find(j => j.id === jobId);
        if (!job) return null;
        
        const jobIndex = MOCK_JOBS.findIndex(j => j.id === jobId);
        return {
          id: job.id,
          jobTitle: job.title,
          company: job.company,
          appliedDate: job.postedDate,
          status: statuses[jobIndex % statuses.length],
          salary: job.salary,
          location: job.location
        };
      })
      .filter((app: any) => app !== null);
    
    setApplications(applicationsList);
    setIsHydrated(true);
  }, []);

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">My Applications</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Track all your job applications in one place</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by job title, company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2 sm:gap-3">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap text-sm">
                    <Filter className="w-5 h-5 shrink-0" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                </div>
              </div>
              
              <div className="text-xs sm:text-sm text-slate-600">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
            </div>
          </div>

          {/* Applications - Mobile Card View / Desktop Table View */}
          <div ref={applicationsRef} className="scroll-mt-20">
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3 sm:space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => {
                const statusConfig = getStatusConfig(application.status);
                return (
                  <div key={application.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-base truncate mb-1">{application.jobTitle}</h3>
                        <p className="text-sm text-slate-600 truncate">{application.company}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shrink-0 ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span>{application.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="truncate">{application.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                          <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="truncate">{application.salary}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>Applied {application.appliedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                        <Eye className="w-5 h-5 shrink-0" />
                        <span>View</span>
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(application.id)}
                        className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Withdraw Application"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {deleteConfirmId === application.id && (
                      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-2">Withdraw Application?</h3>
                          <p className="text-slate-600 text-sm mb-6">Are you sure you want to withdraw your application for <strong>{application.jobTitle}</strong>? This action cannot be undone.</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="flex-1 px-4 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteApplication(application.id)}
                              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">No applications found</h3>
                <p className="text-sm text-slate-600 mb-4">{isHydrated ? 'Start applying to jobs to track your applications here' : 'Try adjusting your search criteria or filters'}</p>
                {isHydrated && (
                  <a href="/jobs/find" className="px-4 py-2 border-2 border-indigo-300 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium inline-block">
                    Browse Jobs
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-slate-200">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-2.5 px-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="py-2.5 px-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-2.5 px-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-2.5 px-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => {
                      const statusConfig = getStatusConfig(application.status);
                      return (
                        <tr key={application.id} className="hover:bg-slate-50 transition-colors group bg-white">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors shrink-0">
                                <Briefcase className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-800 truncate text-sm">{application.jobTitle}</p>
                                <p className="text-xs text-slate-600 truncate">{application.company}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2 text-slate-700 text-sm">
                              <div className="p-1 bg-blue-50 rounded shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                              </div>
                              <span className="truncate text-xs">{application.location}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${statusConfig.color}`}>
                              {statusConfig.icon}
                              {application.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 justify-end">
                              <button onClick={() => window.location.href = `/jobs/${application.id}`} className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 bg-white text-slate-700 rounded hover:bg-slate-50 transition-colors text-xs font-medium whitespace-nowrap">
                                <Eye className="w-4 h-4 shrink-0" />
                                <span>View</span>
                              </button>
                              <button 
                                onClick={() => setDeleteConfirmId(application.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                                title="Withdraw Application"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 px-4">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                            <Briefcase className="w-8 h-8 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications found</h3>
                          <p className="text-slate-600 mb-4">{isHydrated ? 'Start applying to jobs to track your applications here' : 'Try adjusting your search criteria or filters'}</p>
                          {isHydrated && (
                            <a href="/jobs/find" className="px-4 py-2 border-2 border-indigo-300 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium inline-block">
                              Browse Jobs
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Withdraw Application?</h3>
              <p className="text-slate-600 text-sm mb-6">Are you sure you want to withdraw your application for <strong>{filteredApplications.find(a => a.id === deleteConfirmId)?.jobTitle}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteApplication(deleteConfirmId)}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
