"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle,
  Zap,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Target,
  FileText,
  Search,
  MapPin,
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
      router.push("/jobs/find");
    } else {
      router.push("/auth/signup");
    }
  };

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search & Browse",
      description:
        "Find curated job listings tailored to your skills and experience",
      color: "from-blue-600 to-blue-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Apply Instantly",
      description:
        "Apply to your favorite jobs with just one click",
      color: "from-blue-600 to-blue-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor all your applications in real-time from one dashboard",
      color: "from-blue-600 to-blue-500",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Employers",
      description: "All companies are verified and trusted",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Response",
      description: "Get feedback from employers within 24 hours",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Top Opportunities",
      description: "Access premium job listings from leading companies",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'HireTrack',
            description: 'Modern recruitment platform connecting talented professionals with top companies',
            url: 'https://hiretrack.app',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      {/* Navigation */}
      <nav role="navigation" aria-label="Main" className="w-full px-4 lg:px-16 xl:px-24 py-4 lg:py-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 group cursor-pointer shrink-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 transition-all group-hover:scale-105">
            <Image 
              src="/Logo.png" 
              alt="HireTrack Logo" 
              width={40}
              height={40}
              className="w-full h-full object-contain" 
              priority
            />
          </div>
          <span className="text-base lg:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">HireTrack</span>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-slate-400 text-sm lg:text-base truncate">
                👨‍💼 {user?.fullName || "Job Seeker"}
              </span>
              <Link
                href="/jobs/find"
                className="px-3 lg:px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors text-sm lg:text-base font-medium whitespace-nowrap"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 lg:px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                href="/auth/login"
                className="px-3 lg:px-6 py-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base whitespace-nowrap"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section role="region" aria-label="Hero" className="w-full px-4 lg:px-16 xl:px-24 py-20 text-center relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden">
          <Image
            src="/Hiretrack.jpg"
            alt="HireTrack hero background showing recruitment platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/60 rounded-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform">
              Job
            </span>
            <br />
            with{" "}
            <span className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform">
              HireTrack
            </span>
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover thousands of exciting job opportunities tailored to your skills and career goals. Apply instantly, track your applications, and land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="#features"
              className="px-8 py-4 bg-white/90 hover:bg-white border-2 border-blue-300 hover:border-blue-500 text-blue-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-4 lg:px-16 xl:px-24 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Why Choose HireTrack?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            We provide the fastest and easiest way to find your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border-2 border-blue-200 rounded-2xl hover:border-blue-500 hover:shadow-2xl transition-all group hover:scale-105 hover:-translate-y-1"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 bg-linear-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="shrink-0 w-12 h-12 rounded-lg bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-lg">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                <p className="text-sm text-gray-700">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-linear-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-3">
              How It Works
            </h3>
            <p className="text-gray-700 font-medium">Simple steps to get you started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 max-w-2xl mx-auto">
            {/* For Job Seekers */}
            <div>
              <h4 className="text-xl font-black text-blue-600 mb-6">
                Get Started in 4 Simple Steps
              </h4>
              <div className="space-y-4">
                {[
                  "Sign up for your free account",
                  "Build your professional profile",
                  "Browse and apply to jobs",
                  "Get hired and start your new role",
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 border-2 border-blue-500">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 lg:px-16 xl:px-24 py-20 text-center relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative bg-linear-to-br from-white via-blue-50 to-blue-100/50 border-2 border-blue-300 rounded-3xl p-16 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border-2 border-blue-400 mb-6 shadow-md">
            <Star className="w-4 h-4 text-blue-600 fill-current" />
            <span className="text-sm text-blue-700 font-bold">Join Now</span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of professionals who've found their perfect job through HireTrack
          </p>
          <button
            onClick={handleGetStarted}
            className="px-10 py-5 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-3 group mx-auto shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 border-t border-blue-700 py-12">
        <div className="w-full px-4 lg:px-16 xl:px-24 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
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
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
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
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
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
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-blue-200 text-sm">
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

          <div className="border-t border-blue-700 pt-8 text-center text-blue-200 text-sm">
            <p>&copy; 2025 HireTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
