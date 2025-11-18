"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  LineChart,
  PieChart,
  Calendar,
  Target,
  Award,
  AlertCircle,
  Building,
  Briefcase,
  MapPin,
  TrendingDown
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "2,847",
      change: "+12.5%",
      icon: <Users className="w-5 h-5" />,
      trend: "up",
      color: "blue"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      icon: <Clock className="w-5 h-5" />,
      trend: "down",
      color: "emerald"
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+24",
      icon: <BarChart3 className="w-5 h-5" />,
      trend: "up",
      color: "purple"
    },
    {
      title: "Cost per Hire",
      value: "$1,200",
      change: "-8.3%",
      icon: <DollarSign className="w-5 h-5" />,
      trend: "down",
      color: "amber"
    }
  ];

  const chartData = [
    {
      title: "Applications by Department",
      type: "pie",
      icon: <PieChart className="w-5 h-5" />,
      data: [
        { department: "Engineering", count: 847, percentage: 30, icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-500" },
        { department: "Marketing", count: 623, percentage: 22, icon: <Target className="w-4 h-4" />, color: "bg-purple-500" },
        { department: "Sales", count: 512, percentage: 18, icon: <DollarSign className="w-4 h-4" />, color: "bg-emerald-500" },
        { department: "Design", count: 423, percentage: 15, icon: <Award className="w-4 h-4" />, color: "bg-pink-500" },
        { department: "Operations", count: 442, percentage: 15, icon: <Building className="w-4 h-4" />, color: "bg-amber-500" }
      ]
    },
    {
      title: "Hiring Timeline",
      type: "line",
      icon: <LineChart className="w-5 h-5" />,
      data: [
        { month: "Jan", hires: 12, applications: 145 },
        { month: "Feb", hires: 18, applications: 167 },
        { month: "Mar", hires: 15, applications: 189 },
        { month: "Apr", hires: 22, applications: 201 },
        { month: "May", hires: 19, applications: 223 },
        { month: "Jun", hires: 25, applications: 245 }
      ]
    },
    {
      title: "Source Quality",
      type: "bar",
      icon: <BarChart3 className="w-5 h-5" />,
      data: [
        { source: "Referrals", quality: 95, hires: 22, icon: <Users className="w-4 h-4" />, color: "from-emerald-500 to-teal-500" },
        { source: "Company Website", quality: 92, hires: 28, icon: <MapPin className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
        { source: "LinkedIn", quality: 85, hires: 45, icon: <Building className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
        { source: "Indeed", quality: 78, hires: 32, icon: <Briefcase className="w-4 h-4" />, color: "from-orange-500 to-amber-500" },
        { source: "Job Fairs", quality: 68, hires: 15, icon: <Calendar className="w-4 h-4" />, color: "from-slate-500 to-gray-500" }
      ]
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "application",
      message: "New application received for Senior Developer position",
      time: "2 minutes ago",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 2,
      type: "hire",
      message: "John Smith hired as Product Manager",
      time: "1 hour ago",
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 3,
      type: "interview",
      message: "Interview scheduled for UX Designer position",
      time: "3 hours ago",
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: 4,
      type: "alert",
      message: "Time to hire increased by 2 days this month",
      time: "1 day ago",
      icon: <AlertCircle className="w-4 h-4" />
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      emerald: "bg-emerald-50 text-emerald-600",
      purple: "bg-purple-50 text-purple-600",
      amber: "bg-amber-50 text-amber-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-slate-600 text-base">Track your recruitment metrics and insights in real-time</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700 font-medium">Last 30 days</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {chartData.map((chart) => (
              <Card key={chart.title} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-slate-100">
                      {chart.icon}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-lg">{chart.title}</h3>
                  </div>

                  {/* Chart Visualization */}
                  <div className="min-h-[280px]">
                    {chart.type === 'pie' && (
                      <div className="space-y-3">
                        {chart.data.map((item: any, idx: number) => (
                          <div key={idx} className="group">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-slate-700">{item.department}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-slate-900">{item.count}</div>
                                <div className="text-xs text-slate-500">{item.percentage}%</div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div
                                className={`${item.color} h-2.5 rounded-full transition-all duration-700 ease-out`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {chart.type === 'line' && (
                      <div className="space-y-3">
                        {chart.data.map((item: any, idx: number) => (
                          <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-slate-200">
                                  <span className="text-sm font-bold text-slate-700">{item.month}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-slate-500 mb-1">Applications</span>
                                  <span className="text-lg font-semibold text-slate-900">{item.applications}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
                                <Award className="w-4 h-4 text-emerald-600" />
                                <div className="flex flex-col">
                                  <span className="text-xs text-emerald-600">Hires</span>
                                  <span className="text-lg font-bold text-emerald-700">{item.hires}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {chart.type === 'bar' && (
                      <div className="space-y-5">
                        {chart.data.map((item: any, idx: number) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{item.source}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500">{item.hires} hires</span>
                                <span className="text-sm font-bold text-slate-900 min-w-[45px] text-right">{item.quality}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                              <div
                                className={`bg-linear-to-r ${item.color} h-3 rounded-full transition-all duration-700 shadow-sm`}
                                style={{ width: `${item.quality}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="p-6 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-slate-100">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">Recent Activities</h3>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="group">
                      <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer">
                        <div className={`p-2.5 rounded-lg shrink-0 ${
                          activity.type === 'application' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'hire' ? 'bg-emerald-100 text-emerald-600' :
                          activity.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 leading-relaxed mb-1">{activity.message}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;