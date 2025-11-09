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
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Applicant {
  id: number;
  initials: string;
  name: string;
  position: string;
  applicationDate: string;
  status: 'New' | 'Screening' | 'Interview' | 'Hired';
  email: string;
  location?: string;
  experience?: string;
  department?: string;
}

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'screening':
        return 'bg-amber-100 text-amber-700';
      case 'interview':
        return 'bg-purple-100 text-purple-700';
      case 'hired':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

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
      experience: '8 years'
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
      experience: '5 years'
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
      experience: '6 years'
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
      experience: '4 years'
    },
    {
      id: 5,
      initials: 'AL',
      name: 'Amanda Lee',
      position: 'Data Analyst',
      applicationDate: '2024-01-11',
      status: 'Screening',
      email: 'amanda.lee@example.com',
      department: 'Analytics',
      location: 'Chicago, IL',
      experience: '3 years'
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
          icon: <AlertCircle className="w-3 h-3" />
        };
      case 'screening':
        return {
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <Clock className="w-3 h-3" />
        };
      case 'interview':
        return {
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: <Calendar className="w-3 h-3" />
        };
      case 'hired':
        return {
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle className="w-3 h-3" />
        };
      default:
        return {
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: <AlertCircle className="w-3 h-3" />
        };
    }
  };

  // Custom Components
  const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );

  const Badge = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`} {...props}>
      {children}
    </span>
  );

  const Button = ({ 
    children, 
    className = "", 
    variant = "default",
    size = "default",
    ...props 
  }: { 
    children: React.ReactNode; 
    className?: string; 
    variant?: "default" | "outline" | "ghost"; 
    size?: "default" | "sm";
    [key: string]: any 
  }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
    
    const variantStyles = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
      ghost: "text-slate-700 hover:bg-slate-100"
    };
    
    const sizeStyles = {
      default: "px-4 py-3 text-sm",
      sm: "px-3 py-2 text-xs"
    };
    
    return (
      <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => document.querySelector('.mobile-sidebar')?.classList.toggle('translate-x-0')}
        >
          <Menu className="w-4 h-4" />
          Menu
        </Button>
      </div>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Applicants</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 sm:mt-2">Manage and track job applications</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" className="flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Applicant</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 flex-1 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicants..."
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
                <option value="new">New</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="hired">Hired</option>
              </select>
              
              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                <Filter className="w-4 h-4" />
                More Filters
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-slate-600">
            Showing {filteredApplicants.length} of {applicants.length} applicants
          </div>
        </div>
      </Card>

      {/* Applicants Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="hidden sm:table-cell py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Applied For
                </th>
                <th className="hidden lg:table-cell py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Application Date
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
              {filteredApplicants.map((applicant, index) => {
                const statusConfig = getStatusConfig(applicant.status);
                
                return (
                  <tr 
                    key={applicant.id}
                    className="hover:bg-slate-50 transition-colors group bg-white"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                          <User className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{applicant.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-3 h-3 text-slate-600" />
                            <p className="text-sm text-slate-700">{applicant.email}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-slate-600" />
                            <p className="text-sm text-slate-700">{applicant.location}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-800">{applicant.position}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-3 h-3 text-slate-600" />
                          <p className="text-sm text-slate-700">{applicant.department}</p>
                        </div>
                        <p className="text-sm text-slate-700 mt-1">{applicant.experience}</p>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-800">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        {applicant.applicationDate}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <Badge className={`flex items-center gap-1.5 w-fit ${statusConfig.color}`}>
                        {statusConfig.icon}
                        {applicant.status}
                      </Badge>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2 hover:bg-slate-100 text-slate-800"
                        >
                          <Eye className="w-4 h-4 text-slate-700" />
                          <span>View</span>
                        </Button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredApplicants.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No applicants found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Trusted Companies Footer */}
      <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">1,000+ Companies Trust Us</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Join them in streamlining your hiring process</p>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-3 sm:p-4">
                <img 
                  src="/company1.svg" 
                  alt="Company 1" 
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-2 sm:mt-3 text-sm font-medium text-gray-700">Company 1</p>
            </div>

            {/* Company 2 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-4">
                <img 
                  src="/company2.svg" 
                  alt="Company 2" 
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700">Company 2</p>
            </div>

            {/* Company 3 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-4">
                <img 
                  src="/company3.svg" 
                  alt="Company 3" 
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700">Company 3</p>
            </div>

            {/* Company 4 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-4">
                <img 
                  src="/company4.svg" 
                  alt="Company 4" 
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700">Company 4</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="text-sm">
              View All Partners
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;