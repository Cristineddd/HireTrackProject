import React from "react";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero */}
      <header className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-sky-600 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[30px_30px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              End-to-End<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-200 to-white">Job Hiring Portal</span>
            </h1>
            
            <p className="mt-6 text-xl lg:text-2xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Complete applicant tracking system for employers and job seekers. Streamline recruitment from job posting to candidate selection with real-time tracking.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white! text-indigo-700! hover:bg-indigo-50! shadow-xl hover:shadow-2xl transition-all text-lg font-bold px-8 py-6">
                Post a Job
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white! text-white! bg-white/10 hover:bg-white/20 backdrop-blur-sm text-lg font-bold px-8 py-6">
                Find Jobs
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Complete Hiring Solution
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need for end-to-end recruitment management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              📝
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Job Posting & Management</h3>
            <p className="text-slate-600 leading-relaxed">
              Create, edit, and manage job postings in real-time. Reach qualified candidates efficiently.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-sky-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Applicant Tracking System</h3>
            <p className="text-slate-600 leading-relaxed">
              Track candidates through every stage: applied, shortlisted, interviewed, and hired.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Resume Screening & Ranking</h3>
            <p className="text-slate-600 leading-relaxed">
              Automated candidate sorting and ranking to save time for your HR team.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-green-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Communication Tools</h3>
            <p className="text-slate-600 leading-relaxed">
              Built-in messaging and email notifications for seamless applicant-employer communication.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Analytics Dashboard</h3>
            <p className="text-slate-600 leading-relaxed">
              Recruitment insights: time-to-fill, candidate sources, and comprehensive HR metrics.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl hover:shadow-rose-100 hover:-translate-y-1 transition-all duration-300 bg-white">
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">
              📱
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile-Friendly Access</h3>
            <p className="text-slate-600 leading-relaxed">
              Responsive interface accessible on desktop and mobile for both employers and applicants.
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-indigo-700 to-sky-600 py-20 lg:py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[30px_30px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Hiring?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white! text-indigo-700! hover:bg-indigo-50! shadow-xl hover:shadow-2xl transition-all text-lg font-bold px-8 py-6">
                Start Hiring Today →
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white! text-white! bg-white/10 hover:bg-white/20 backdrop-blur-sm text-lg font-bold px-8 py-6">
                Browse Open Positions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[30px_30px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Brand Section */}
          <div className="text-center mb-12">
            <div className="mb-4">
              <img src="/H.png" alt="HireTrack Logo" className="h-16 w-auto mx-auto" />
            </div>
            <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
              End-to-end job hiring portal with integrated applicant tracking.
              Connecting talent with opportunity.
            </p>
          </div>



          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-slate-400">© 2025 HireTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;