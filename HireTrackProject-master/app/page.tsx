"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";

const LandingPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      if (user.userType === "employer") {
        router.push("/jobs/post");
      } else {
        router.push("/jobs/find");
      }
    } else {
      router.push("/auth/signup");
    }
  };

  const features = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Easy Job Posting",
      description:
        "Post jobs in minutes with our intuitive job posting interface",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Matching",
      description:
        "Find the perfect candidates that match your job requirements",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Hiring",
      description: "Streamline your recruitment process and hire faster",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">HireTrack</span>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-slate-400">
                {user?.userType === "employer" ? "👔" : "👨‍💼"} {user?.fullName || "User"}
              </span>
              <Link
                href={
                  user?.userType === "employer" ? "/jobs/post" : "/jobs/find"
                }
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-6 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-slate-300">
            Welcome to HireTrack - Your Recruitment Solution
          </span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Talent
          </span>{" "}
          or{" "}
          <span className="bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Job
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Connect employers with talented professionals. Whether you're hiring
          or looking for opportunities, HireTrack makes it simple and fast.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href="#features"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-2">5K+</div>
            <div className="text-slate-400 text-sm">Job Listings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">10K+</div>
            <div className="text-slate-400 text-sm">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">2K+</div>
            <div className="text-slate-400 text-sm">Successful Hires</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose HireTrack?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We provide the tools and platform to make hiring easier and faster
            for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-all group"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-linear-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-12 mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            How It Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Job Seekers */}
            <div>
              <h4 className="text-xl font-semibold text-emerald-400 mb-6">
                For Job Seekers
              </h4>
              <div className="space-y-4">
                {[
                  "Sign up for free account",
                  "Browse available job listings",
                  "Apply to jobs with one click",
                  "Track your applications",
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Employers */}
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-6">
                For Employers
              </h4>
              <div className="space-y-4">
                {[
                  "Create company account",
                  "Post job openings",
                  "Review candidate applications",
                  "Manage hiring process",
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/50">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-8">
            Join thousands of job seekers and employers using HireTrack
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group mx-auto"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2024 HireTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
