"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock,
  Users,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface Position {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  applicants: number;
  status: 'Active' | 'Paused' | 'Closed';
  postedDate: string;
}

export default function OpenPositionsPage() {
  const [positions] = useState<Position[]>([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      applicants: 24,
      status: "Active",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90k - $120k",
      applicants: 18,
      status: "Active",
      postedDate: "2024-01-14"
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $160k",
      applicants: 32,
      status: "Active",
      postedDate: "2024-01-12"
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$70k - $90k",
      applicants: 15,
      status: "Paused",
      postedDate: "2024-01-10"
    },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Paused':
        return 'bg-amber-100 text-amber-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Open Positions</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Briefcase className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Positions</p>
                <p className="text-3xl font-bold text-gray-900">{positions.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Positions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {positions.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900">
                  {positions.reduce((sum, p) => sum + p.applicants, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <Card key={position.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                <Badge className={getStatusStyle(position.status)}>
                  {position.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">{position.department}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{position.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm">{position.salary}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{position.type}</span>
                </div>

                <div className="flex items-center text-blue-600 font-semibold">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{position.applicants} applicants</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1 text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" className="flex-1 text-sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
