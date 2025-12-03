"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  LogOut,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface PostedJob {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  applicants: number;
  views: number;
}

const PostJobPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [postedJobs, setPostedJobs] = useState<PostedJob[]>([]);
  const [step, setStep] = useState<"list" | "form">("list");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "Full-time",
    requirements: "",
    benefits: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock posted jobs
  const mockPostedJobs: PostedJob[] = [
    {
      id: "1",
      title: "Senior Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      postedDate: "2 weeks ago",
      applicants: 24,
      views: 342,
    },
    {
      id: "2",
      title: "UI/UX Designer",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $110,000",
      postedDate: "1 week ago",
      applicants: 15,
      views: 210,
    },
  ];

  useEffect(() => {
    // Check if user is logged in and is employer
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.userType !== "employer") {
        router.push("/jobs/find");
      }
      setUser(parsedUser);
      setPostedJobs(mockPostedJobs);
    }
    setLoading(false);
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary range is required";
    if (!formData.requirements.trim())
      newErrors.requirements = "Requirements are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newJob: PostedJob = {
        id: String(Date.now()),
        title: formData.title,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        postedDate: "just now",
        applicants: 0,
        views: 0,
      };

      setPostedJobs((prev) => [newJob, ...prev]);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        type: "Full-time",
        requirements: "",
        benefits: "",
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setStep("list");
      }, 3000);
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-16 lg:sticky lg:top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Post a Job</h1>
              <p className="text-sm text-slate-400">
                {user?.company || "Company"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 sm:py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-400">
              Job posted successfully! Redirecting...
            </p>
          </div>
        )}

        {step === "list" ? (
          <>
            {/* Posted Jobs List */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Your Posted Jobs
                </h2>
                <p className="text-slate-400">
                  Manage and view your job postings
                </p>
              </div>
              <button
                onClick={() => setStep("form")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Post New Job
              </button>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-4">
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border-0 bg-slate-800 hover:bg-slate-700/50 transition-all duration-300 p-6 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="text-sm text-slate-400">
                            📍 {job.location}
                          </div>
                          <div className="text-sm text-slate-400">
                            💼 {job.type}
                          </div>
                          <div className="text-sm text-slate-400">
                            💰 {job.salary}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">
                          Posted {job.postedDate}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-6 text-right">
                        <div>
                          <div className="text-2xl font-bold text-emerald-400">
                            {job.applicants}
                          </div>
                          <div className="text-xs text-slate-400">
                            Applicants
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            {job.views}
                          </div>
                          <div className="text-xs text-slate-400">Views</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="border-0 bg-slate-800 p-12">
                  <div className="text-center">
                    <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">
                      No jobs posted yet
                    </h3>
                    <p className="text-slate-500 mb-6">
                      Start by posting your first job
                    </p>
                    <button
                      onClick={() => setStep("form")}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      Post a Job Now
                    </button>
                  </div>
                </Card>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Job Form */}
            <div className="mb-8">
              <button
                onClick={() => setStep("list")}
                className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors mb-6"
              >
                ← Back to Jobs
              </button>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create New Job Posting
                </h2>
                <p className="text-slate-400">
                  Fill in the details about your job opening
                </p>
              </div>
            </div>

            <Card className="border-0 bg-slate-800 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Developer"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.title ? "border-red-500" : "border-slate-600"
                    }`}
                    disabled={submitting}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Location & Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., San Francisco, CA"
                      className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.location ? "border-red-500" : "border-slate-600"
                      }`}
                      disabled={submitting}
                    />
                    {errors.location && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Job Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={submitting}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., $80,000 - $120,000"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.salary ? "border-red-500" : "border-slate-600"
                    }`}
                    disabled={submitting}
                  />
                  {errors.salary && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.salary}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the job role, responsibilities, and expectations..."
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      errors.description ? "border-red-500" : "border-slate-600"
                    }`}
                    disabled={submitting}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List required qualifications and skills (one per line)..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      errors.requirements
                        ? "border-red-500"
                        : "border-slate-600"
                    }`}
                    disabled={submitting}
                  />
                  {errors.requirements && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.requirements}
                    </p>
                  )}
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Benefits
                  </label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="List job benefits (one per line)..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    disabled={submitting}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        Publish Job
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("list")}
                    disabled={submitting}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PostJobPage;
