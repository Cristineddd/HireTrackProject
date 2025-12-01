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
import { MOCK_JOBS } from "@/constants/mockData";
import type { Job } from "@/constants/mockData";

const JobDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(userData));
    }

    // Get job from MOCK_JOBS
    const jobId = params.id as string;
    const jobData = MOCK_JOBS.find(j => j.id === jobId);
    setJob(jobData || null);
    setLoading(false);
  }, [params, router]);

  if (loading || !job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <Card className="border-0 bg-linear-to-r from-blue-600 to-blue-500 p-8 shadow-2xl">
              <h1 className="text-4xl font-black text-white mb-2">{job.title}</h1>
              <p className="text-xl text-white/90 mb-6 font-semibold">{job.company}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <Clock className="w-5 h-5" />
                  <span>{job.postedDate}</span>
                </div>
              </div>

              <div className="text-sm text-white/80 font-medium">
                👁️ {job.views} views
              </div>
            </Card>

            {/* Job Description */}
            <Card className="border-2 border-blue-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Role</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="border-2 border-blue-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-2xl">✓</span>
                    <span className="font-medium">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="border-2 border-blue-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all"
                  >
                    <span className="text-2xl">★</span>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
            {/* Action Buttons */}
            <Card className="border-2 border-blue-200 bg-white p-6 shadow-xl">
              {applied ? (
                <div className="w-full py-4 px-4 bg-green-100 border-2 border-green-500 text-green-700 rounded-xl text-center font-bold mb-3">
                  <span className="text-xl">✓</span> Application Submitted!
                </div>
              ) : (
                <button
                  onClick={() => setApplied(true)}
                  className="w-full py-4 px-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all mb-3 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Apply Now
                </button>
              )}

              <button
                onClick={() => setSaved(!saved)}
                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-2 ${
                  saved
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <BookmarkPlus className="w-5 h-5" />
                {saved ? "Saved" : "Save Job"}
              </button>

              <button className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all mt-3">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </Card>

            {/* Company Info */}
            <Card className="border-2 border-blue-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">About {job.company}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                We're a leading tech company dedicated to creating innovative
                solutions that impact millions of users worldwide.
              </p>
              <Link
                href="#"
                className="text-blue-600 hover:text-purple-600 text-sm font-bold transition-colors inline-flex items-center gap-1"
              >
                Visit Company Website →
              </Link>
            </Card>

            {/* Similar Jobs */}
            <Card className="border-2 border-blue-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-linear-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-400 cursor-pointer transition-all"
                  >
                    <p className="text-gray-900 font-bold text-sm">
                      Position Title {idx}
                    </p>
                    <p className="text-gray-600 text-xs font-medium">Company Name</p>
                  </div>
                ))}
              </div>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
