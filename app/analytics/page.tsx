"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, DollarSign } from "lucide-react";

export default function AnalyticsPage() {
  // Mock analytics data
  const stats = [
    { label: "Total Applications", value: "1,234", change: "+12%", icon: Users, color: "blue" },
    { label: "Active Jobs", value: "48", change: "+8%", icon: BarChart3, color: "green" },
    { label: "Hired This Month", value: "23", change: "+15%", icon: TrendingUp, color: "purple" },
    { label: "Revenue Generated", value: "$45K", change: "+20%", icon: DollarSign, color: "yellow" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Application Trends</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart placeholder - Coming soon
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Jobs</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart placeholder - Coming soon
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
