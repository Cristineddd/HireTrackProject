"use client";

import React from 'react';
// framer-motion removed per user request
import { 
  Search,
  Filter,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Clock,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Position {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedDate: string;
  applicants: number;
  status: 'active' | 'draft' | 'closed';
}

const OpenPositions: React.FC = () => {
  const positions: Position[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      experience: '5+ years',
      postedDate: '2025-10-15',
      applicants: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $180k',
      experience: '4+ years',
      postedDate: '2025-10-20',
      applicants: 28,
      status: 'active'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$100k - $140k',
      experience: '3+ years',
      postedDate: '2025-10-18',
      applicants: 36,
      status: 'active'
    },
    {
      id: 4,
      title: 'Marketing Director',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      experience: '8+ years',
      postedDate: '2025-10-25',
      applicants: 15,
      status: 'draft'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $150k',
      experience: '4+ years',
      postedDate: '2025-10-22',
      applicants: 32,
      status: 'active'
    }
  ];

  return (
    <div className="p-8">
      {/* Header and Search */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Open Positions</h1>
            <p className="text-slate-600 mt-2">Manage and track your job listings</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Post New Position
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search positions..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {positions.map((position, index) => (
          <div key={position.id}>
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{position.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {position.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                    </div>
                  </div>
                  <Badge className={
                    position.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    position.status === 'draft' ? 'bg-slate-100 text-slate-700' :
                    'bg-rose-100 text-rose-700'
                  }>
                    {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    {position.salary}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {position.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {position.experience}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    {position.applicants} Applicants
                  </div>
                </div>

                {/* Posted Date and Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    Posted {new Date(position.postedDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm">View Applicants</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenPositions;
