"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// framer-motion removed per user request
import {
  ArrowRight,
  Users,
  FileText,
  Target,
  MessageSquare,
  BarChart3,
  Smartphone,
  CheckCircle,
  Star,
  TrendingUp,
  Briefcase
} from "lucide-react";

const Home: React.FC = () => {
  const router = useRouter();

  const handlePostJob = () => {
    router.push('/open-positions');
  };

  const handleFindJobs = () => {
    router.push('/jobs');
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Job Posting & Management",
      description: "Create, edit, and manage job postings in real-time. Reach qualified candidates efficiently.",
      color: "from-indigo-500 to-purple-600",
      bgColor: "hover:shadow-indigo-100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Applicant Tracking System",
      description: "Track candidates through every stage: applied, shortlisted, interviewed, and hired.",
      color: "from-sky-500 to-blue-600",
      bgColor: "hover:shadow-sky-100"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Resume Screening & Ranking",
      description: "Automated candidate sorting and ranking to save time for your HR team.",
      color: "from-emerald-500 to-green-600",
      bgColor: "hover:shadow-emerald-100"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Communication Tools",
      description: "Built-in messaging and email notifications for seamless applicant-employer communication.",
      color: "from-amber-500 to-orange-600",
      bgColor: "hover:shadow-amber-100"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Recruitment insights: time-to-fill, candidate sources, and comprehensive HR metrics.",
      color: "from-rose-500 to-pink-600",
      bgColor: "hover:shadow-rose-100"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-Friendly Access",
      description: "Responsive interface accessible on desktop and mobile for both employers and applicants.",
      color: "from-violet-500 to-purple-600",
      bgColor: "hover:shadow-violet-100"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Jobs" },
    { number: "2M+", label: "Candidates" },
    { number: "15K+", label: "Companies" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30">
      {/* Enhanced Hero Section */}
      <header className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-sky-600 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[60px_60px]">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}


            <h1 className="text-6xl lg:text-8xl font-black leading-tight tracking-tight">
              Transform Your
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-200 via-white to-indigo-200">
                Transform Your
              </span>
            </h1>
            
            <p className="mt-8 text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-light">
              Complete applicant tracking system for employers and job seekers. Streamline recruitment from job posting to candidate selection with real-time tracking and AI-powered insights.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="relative group bg-white! text-indigo-700! hover:bg-indigo-50! shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold px-10 py-7 rounded-2xl overflow-hidden"
                onClick={handlePostJob}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Post a Job
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="relative group border-2 border-white! text-white! bg-white/10 hover:bg-white/20 backdrop-blur-sm text-lg font-bold px-10 py-7 rounded-2xl overflow-hidden transition-all duration-300"
                onClick={handleFindJobs}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Find Jobs
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-indigo-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </header>

      {/* Post a Job Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 bg-linear-to-br from-indigo-50 to-sky-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <FileText className="w-4 h-4 fill-current" />
              For Employers
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Post a Job
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-sky-600">
                Effortlessly
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Reach thousands of qualified candidates with our intuitive job posting platform. Get started in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Create Your Job</h3>
              <p className="text-slate-600">Fill in job details, requirements, and company information in our easy-to-use form.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Target Candidates</h3>
              <p className="text-slate-600">Use filters and keywords to attract the right talent for your open positions.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Track Results</h3>
              <p className="text-slate-600">Monitor applications, views, and engagement with real-time analytics.</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-12 py-6 rounded-2xl text-lg"
              onClick={handlePostJob}
            >
              Post Your First Job
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Find Jobs Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 bg-linear-to-br from-sky-50 to-indigo-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Users className="w-4 h-4 fill-current" />
              For Job Seekers
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Find Jobs
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-indigo-600">
                That Fit You
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover opportunities that match your skills and career goals. Apply to jobs from top companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Sample Job Cards */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Senior Developer</h3>
                  <p className="text-slate-600 text-sm">TechCorp Inc.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Remote</span>
              </div>
              <p className="text-slate-600 text-sm mb-4">San Francisco, CA • $120k-$150k</p>
              <Button size="sm" variant="outline" className="w-full">View Details</Button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Data Analyst</h3>
                  <p className="text-slate-600 text-sm">DataFlow Solutions</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">SQL</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Hybrid</span>
              </div>
              <p className="text-slate-600 text-sm mb-4">New York, NY • $90k-$110k</p>
              <Button size="sm" variant="outline" className="w-full">View Details</Button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">UX Designer</h3>
                  <p className="text-slate-600 text-sm">Creative Studios</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Figma</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Adobe XD</span>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">Remote</span>
              </div>
              <p className="text-slate-600 text-sm mb-4">Austin, TX • $80k-$100k</p>
              <Button size="sm" variant="outline" className="w-full">View Details</Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-12 py-6 rounded-2xl text-lg"
              onClick={handleFindJobs}
            >
              Browse All Jobs
              <Briefcase className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Everything you need in one platform
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Complete Hiring
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-sky-600">
                Solution
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools and features designed to streamline your recruitment process and help you find the perfect candidates faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`group relative p-8 border border-slate-200/60 rounded-3xl hover:shadow-2xl hover:shadow-slate-200/50 backdrop-blur-sm bg-white/70 hover:bg-white transition-all duration-500 overflow-hidden ${feature.bgColor}`}>
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Icon */}
                <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed relative">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-indigo-700 to-sky-600 py-24 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[60px_60px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div
            className=""
          >
            <h3 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Ready to Transform
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-200 to-indigo-200">
                Your Hiring?
              </span>
            </h3>
            
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of companies that have revolutionized their recruitment process with our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="relative group bg-white! text-indigo-700! hover:bg-indigo-50! shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold px-12 py-7 rounded-2xl overflow-hidden"
                onClick={handlePostJob}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Hiring Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="relative group border-2 border-white! text-white! bg-white/10 hover:bg-white/20 backdrop-blur-sm text-lg font-bold px-12 py-7 rounded-2xl overflow-hidden transition-all duration-300"
                onClick={handleFindJobs}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Browse Open Positions
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-indigo-200">
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current text-amber-400" />
                ))}
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[60px_60px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="text-center mb-16">
            <div className="mb-8">
      
              <h4 className="text-2xl font-bold text-white mb-3">HireTrack</h4>
              <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                End-to-end job hiring portal with integrated applicant tracking.
                Connecting talent with opportunity worldwide.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-sm text-slate-400">
              © 2025 HireTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
