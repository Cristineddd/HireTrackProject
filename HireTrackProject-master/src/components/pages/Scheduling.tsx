"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  VideoIcon,
  Building2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Interview {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: 'video' | 'in-person';
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Scheduling: React.FC = () => {
  const interviews: Interview[] = [
    {
      id: 1,
      candidate: "John Doe",
      position: "Senior Software Engineer",
      date: "2025-11-03",
      time: "10:00 AM",
      type: "video",
      interviewers: ["Sarah Wilson", "Mike Chen"],
      status: "scheduled"
    },
    {
      id: 2,
      candidate: "Jane Smith",
      position: "Product Manager",
      date: "2025-11-03",
      time: "2:00 PM",
      type: "in-person",
      interviewers: ["David Brown", "Lisa Zhang"],
      status: "scheduled"
    },
    {
      id: 3,
      candidate: "Alex Johnson",
      position: "UX Designer",
      date: "2025-11-04",
      time: "11:30 AM",
      type: "video",
      interviewers: ["Emma Davis"],
      status: "scheduled"
    }
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Interview Schedule</h1>
            <p className="text-slate-600 mt-2">Manage and schedule interviews</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Schedule Interview
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search interviews..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Calendar Section */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                {currentMonth} {currentYear}
              </h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map(day => (
                <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors p-1"
                >
                  <div className="text-sm text-slate-600">{index + 1}</div>
                  {index === 2 && (
                    <div className="mt-1">
                      <div className="text-[10px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate">
                        2 interviews
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Interviews</h2>
          {interviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-slate-900">{interview.candidate}</h3>
                    <Badge className={
                      interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      interview.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-rose-100 text-rose-700'
                    }>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {interview.position}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <CalendarIcon className="w-4 h-4 text-slate-400" />
                      {new Date(interview.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {interview.time}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <VideoIcon className="w-4 h-4 text-slate-400" />
                      {interview.type === 'video' ? 'Video Call' : 'In-person'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      {interview.interviewers.join(', ')}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="w-full">Reschedule</Button>
                    {interview.type === 'video' && (
                      <Button size="sm" className="w-full">Join Call</Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
