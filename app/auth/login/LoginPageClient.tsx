"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { login } from "@/utils/auth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // Login with API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`Server error: ${text.substring(0, 100)}`);
        }
      } catch (parseError: any) {
        throw new Error(parseError.message || 'Failed to parse server response');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data in localStorage
      const userData = {
        email: data.user.email,
        userType: "applicant" as const,
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
        fullName: data.user.fullName,
      };
      login(userData);

      // Store auth token
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // Redirect to find jobs page
      router.push("/jobs/find");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };



  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!resetEmail || !resetEmail.includes("@")) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setResetSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#2B75EE] via-[#2B75EE] to-[#1F5DD3] p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-40 -mb-40 animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/3 rounded-full blur-3xl" />
        
        {/* Top Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl font-black text-white">HireTrack</h1>
              <p className="text-white/70 text-sm">Your Recruitment Success Partner</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome Back! 👋
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Sign in to access your recruitment dashboard and manage your hiring pipeline efficiently.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/70 text-sm">Active Jobs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/70 text-sm">Companies</div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Smart Matching</div>
                  <div className="text-white/70 text-sm">AI-powered candidate recommendations</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Real-time Updates</div>
                  <div className="text-white/70 text-sm">Instant notifications for applications</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Analytics Dashboard</div>
                  <div className="text-white/70 text-sm">Track your hiring performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="relative z-10 text-white/60 text-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[#22C365] rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
          © 2024 HireTrack. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#F9FAFB] min-h-screen lg:min-h-0 lg:w-1/2">
        <div className="w-full max-w-md mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-[#6F7C90] hover:text-[#2B75EE] font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Top Branding - Mobile */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-left">
                <h1 className="text-2xl font-black text-[#1D2530]">HireTrack</h1>
                <p className="text-[#6F7C90] text-xs">Your Recruitment Success Partner</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#1D2530] mb-2">Welcome Back</h2>
            <p className="text-[#6F7C90]">Sign in to your HireTrack account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#1D2530] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BAC4CE]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#DFE3E9] rounded-xl text-[#1D2530] placeholder-[#95A0AF] focus:outline-none focus:ring-2 focus:ring-[#2B75EE] focus:border-[#2B75EE] transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#1D2530] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BAC4CE]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-[#DFE3E9] rounded-xl text-[#1D2530] placeholder-[#95A0AF] focus:outline-none focus:ring-2 focus:ring-[#2B75EE] focus:border-[#2B75EE] transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BAC4CE] hover:text-[#2B75EE] transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#6F7C90] hover:text-[#1D2530] cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-[#DFE3E9] rounded cursor-pointer accent-[#2B75EE]"
                  disabled={loading}
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setResetEmail(email);
                  setResetSuccess(false);
                  setError("");
                }}
                className="text-[#2B75EE] hover:text-[#1F5DD3] font-semibold transition-colors"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2B75EE] hover:bg-[#1F5DD3] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#2B75EE]/30 hover:shadow-xl hover:shadow-[#2B75EE]/40"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>


          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-[#6F7C90]">
            <p>
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#2B75EE] hover:text-[#1F5DD3] font-bold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {resetSuccess ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#1D2530] mb-2">
                  Check Your Email
                </h2>
                <p className="text-[#6F7C90] mb-6">
                  We've sent a password reset link to <strong className="text-[#1D2530]">{resetEmail}</strong>
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSuccess(false);
                  }}
                  className="w-full bg-[#2B75EE] hover:bg-[#1F5DD3] text-white font-bold py-3 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#1D2530] mb-2">
                  Reset Password
                </h2>
                <p className="text-[#6F7C90] mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1D2530] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BAC4CE]" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#DFE3E9] rounded-xl text-[#1D2530] placeholder-[#95A0AF] focus:outline-none focus:ring-2 focus:ring-[#2B75EE] focus:border-[#2B75EE] transition-all"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setError("");
                      }}
                      className="flex-1 bg-[#F1F3F5] hover:bg-[#DFE3E9] text-[#1D2530] font-semibold py-3 rounded-xl transition-all"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#2B75EE] hover:bg-[#1F5DD3] text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;