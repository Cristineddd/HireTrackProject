"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Share2,
  BookmarkPlus,
  Send,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  views: number;
}

const JobDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const mockJobs: Record<string, JobDetail> = {
    "1": {
      id: "1",
      title: "Senior Frontend Developer",
      company: "Tech Company A",
      location: "San Francisco, CA",
      salary: "$120,000 - $160,000",
      type: "Full-time",
      description: `We are looking for an experienced Senior Frontend Developer to join our growing team. 
      
You will be responsible for building and maintaining our web applications using modern technologies. 
This is a great opportunity to work with a talented team of engineers in a fast-paced environment.

We value innovation, collaboration, and continuous learning. You'll have the chance to work on projects 
that impact millions of users worldwide.`,
      requirements: [
        "5+ years of experience in frontend development",
        "Strong proficiency in React and TypeScript",
        "Experience with CSS and responsive design",
        "Knowledge of web performance optimization",
        "Experience with Git and CI/CD pipelines",
        "Excellent communication skills",
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance (medical, dental, vision)",
        "401(k) matching",
        "Flexible working hours",
        "Remote work options",
        "Professional development budget",
        "Free snacks and beverages",
      ],
      postedDate: "2 days ago",
      views: 342,
    },
    "2": {
      id: "2",
      title: "UX/UI Designer",
      company: "Design Studio B",
      location: "Remote",
      salary: "$80,000 - $110,000",
      type: "Full-time",
      description: `Join our design team and create beautiful user experiences for our products. 
      
We're looking for a talented UX/UI Designer who is passionate about creating intuitive and visually 
appealing interfaces. You'll work closely with product managers and developers to bring designs to life.`,
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in design tools (Figma, Adobe XD, Sketch)",
        "Strong understanding of design principles",
        "Experience with user research and testing",
        "Portfolio demonstrating design work",
      ],
      benefits: [
        "Competitive salary",
        "100% remote work",
        "Flexible schedule",
        "Design tool licenses provided",
        "Professional development",
      ],
      postedDate: "3 days ago",
      views: 210,
    },
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(userData));
    }

    // Simulate loading job details
    const jobId = params.id as string;
    const jobData = mockJobs[jobId] || mockJobs["1"];
    setJob(jobData);
    setLoading(false);
  }, [params, router]);

  if (loading || !job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <Card className="border-0 bg-slate-800 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{job.title}</h1>
              <p className="text-xl text-slate-300 mb-6">{job.company}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-5 h-5" />
                  <span>{job.postedDate}</span>
                </div>
              </div>

              <div className="text-sm text-slate-500">
                {job.views} views
              </div>
            </Card>

            {/* Job Description */}
            <Card className="border-0 bg-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Role</h2>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="border-0 bg-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="border-0 bg-slate-800 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <span className="text-blue-400 font-bold">★</span>
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Action Buttons */}
            <Card className="border-0 bg-slate-800 p-6 sticky top-24">
              {applied ? (
                <div className="w-full py-3 px-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-lg text-center font-medium">
                  ✓ Already Applied
                </div>
              ) : (
                <button
                  onClick={() => setApplied(true)}
                  className="w-full py-3 px-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mb-3"
                >
                  <Send className="w-4 h-4" />
                  Apply Now
                </button>
              )}

              <button
                onClick={() => setSaved(!saved)}
                className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  saved
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                    : "bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300"
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                {saved ? "Saved" : "Save Job"}
              </button>

              <button className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mt-3">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </Card>

            {/* Company Info */}
            <Card className="border-0 bg-slate-800 p-6">
              <h3 className="font-bold text-white mb-4">About {job.company}</h3>
              <p className="text-slate-400 text-sm mb-4">
                We're a leading tech company dedicated to creating innovative
                solutions that impact millions of users worldwide.
              </p>
              <Link
                href="#"
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                Visit Company Website →
              </Link>
            </Card>

            {/* Similar Jobs */}
            <Card className="border-0 bg-slate-800 p-6">
              <h3 className="font-bold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition-all"
                  >
                    <p className="text-white font-medium text-sm">
                      Position Title {idx}
                    </p>
                    <p className="text-slate-400 text-xs">Company Name</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
