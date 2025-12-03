"use client";

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_JOBS } from '@/constants/mockData';
import { 
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Mail,
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'Video' | 'Phone' | 'In-Person';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  interviewer: string;
  location?: string;
  company?: string;
}

export default function SchedulingPage() {
  const [currentDate] = useState(new Date());
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const interviewTypes: Array<'Video' | 'Phone' | 'In-Person'> = ['Video', 'Phone', 'In-Person'];
    const interviewers = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown', 'Charlie Davis', 'Diana Garcia', 'Eric Martinez', 'Fiona Lee', 'George Taylor', 'Hannah Anderson'];
    const statuses: Array<'Scheduled' | 'Completed' | 'Cancelled'> = ['Scheduled', 'Completed', 'Scheduled'];
    
    const interviewsList = MOCK_JOBS.map((job, index) => ({
      id: job.id,
      candidateName: `Candidate ${index + 1}`,
      position: job.title,
      date: new Date(Date.now() + (index * 86400000)).toISOString().split('T')[0],
      time: `${10 + (index % 8)}:00 ${index % 2 === 0 ? 'AM' : 'PM'}`,
      type: interviewTypes[index % interviewTypes.length],
      status: statuses[index % statuses.length],
      interviewer: interviewers[index % interviewers.length],
      location: index % 3 === 0 ? 'Conference Room A' : undefined,
      company: job.company
    }));
    
    setInterviews(interviewsList);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Phone':
        return <Phone className="w-4 h-4" />;
      case 'In-Person':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Interview Scheduling</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Manage and schedule your upcoming interviews</p>
            </div>
            <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap">
              <Plus className="w-4 h-4" />
              <span>Schedule Interview</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Total Interviews</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{interviews.length}</p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 shrink-0" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">This Week</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'Scheduled').length}
                </p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 shrink-0" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Completed</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'Completed').length}
                </p>
              </div>
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 shrink-0" />
            </div>
          </Card>
        </div>

        <Card className="p-4 sm:p-6 bg-white shadow-lg mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{monthYear}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{interview.candidateName}</h3>
                      <Badge className={`${getStatusStyle(interview.status)} shrink-0 w-fit`}>
                        {interview.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 truncate">{interview.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <div className="p-1.5 bg-blue-50 rounded-lg shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm truncate">{interview.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-600">
                    <div className="p-1.5 bg-green-50 rounded-lg shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm">{interview.time}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-600">
                    <div className="p-1.5 bg-purple-50 rounded-lg shrink-0">
                      {getTypeIcon(interview.type)}
                    </div>
                    <span className="text-sm truncate">{interview.type}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-600">
                    <div className="p-1.5 bg-orange-50 rounded-lg shrink-0">
                      <User className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-sm truncate">{interview.interviewer}</span>
                  </div>
                </div>

                {interview.location && (
                  <div className="flex items-center gap-2.5 text-gray-600 mt-3">
                    <div className="p-1.5 bg-indigo-50 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-sm truncate">{interview.location}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 shrink-0" />
                    <span className="text-sm">View Details</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="text-sm">Reschedule</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 sm:flex-none flex items-center justify-center gap-2">
                    <X className="w-4 h-4 shrink-0" />
                    <span className="text-sm">Cancel</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}
