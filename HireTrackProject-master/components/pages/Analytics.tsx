"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
// framer-motion removed per user request
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  LineChart,
  PieChart
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "2,847",
      change: "+12.5%",
      icon: <Users className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      icon: <Clock className="w-5 h-5" />,
      trend: "down"
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+24",
      icon: <BarChart3 className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Cost per Hire",
      value: "$1,200",
      change: "-8.3%",
      icon: <DollarSign className="w-5 h-5" />,
      trend: "down"
    }
  ];

  const chartData = [
    {
      title: "Applications by Department",
      type: "pie",
      icon: <PieChart className="w-5 h-5" />
    },
    {
      title: "Hiring Timeline",
      type: "line",
      icon: <LineChart className="w-5 h-5" />
    },
    {
      title: "Source Quality",
      type: "bar",
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-600 mt-2">Track your recruitment metrics and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={stat.title}>
            <Card>
              <div className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${
                      stat.trend === 'up' ? '' : 'rotate-180'
                    }`} />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {chartData.map((chart, index) => (
          <div key={chart.title}>
            <Card>
              <div className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    {chart.icon}
                  </div>
                  <h3 className="font-medium text-slate-900">{chart.title}</h3>
                </div>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-slate-500">Chart visualization coming soon</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
