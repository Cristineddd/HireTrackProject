"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ChevronRight
} from "lucide-react";

interface Interview {
  id: number;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'Video' | 'Phone' | 'In-Person';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  interviewer: string;
  location?: string;
}

export default function SchedulingPage() {
  const [currentDate] = useState(new Date());
  const [interviews] = useState<Interview[]>([
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Senior Frontend Developer",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Video",
      status: "Scheduled",
      interviewer: "John Doe",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      position: "UX Designer",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Phone",
      status: "Scheduled",
      interviewer: "Jane Smith",
    },
    {
      id: 3,
      candidateName: "Emily Rodriguez",
      position: "Product Manager",
      date: "2024-01-21",
      time: "11:00 AM",
      type: "In-Person",
      status: "Scheduled",
      interviewer: "Bob Wilson",
      location: "Conference Room A",
    },
    {
      id: 4,
      candidateName: "David Kim",
      position: "Backend Developer",
      date: "2024-01-22",
      time: "3:00 PM",
      type: "Video",
      status: "Scheduled",
      interviewer: "Alice Brown",
    },
  ]);

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Interview Scheduling</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Interviews</p>
                <p className="text-3xl font-bold text-gray-900">{interviews.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">This Week</p>
                <p className="text-3xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'Scheduled').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {interviews.filter(i => i.status === 'Completed').length}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{monthYear}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{interview.candidateName}</h3>
                      <Badge className={getStatusStyle(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{interview.position}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{interview.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{interview.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    {getTypeIcon(interview.type)}
                    <span className="text-sm ml-2">{interview.type}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">{interview.interviewer}</span>
                  </div>
                </div>

                {interview.location && (
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{interview.location}</span>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
