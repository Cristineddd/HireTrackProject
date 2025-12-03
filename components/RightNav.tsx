"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Briefcase,
  Calendar,
  LogOut,
  MessageSquare,
  Home
} from 'lucide-react';

interface RightNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const RightNav: React.FC<RightNavProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  // Don't render the nav on auth pages and root landing page
  if (pathname === "/" || pathname.startsWith("/auth/")) return null;

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Force redirect to login page
    window.location.href = "/auth/login";
  };

  const navItems = [
    { href: "/jobs/find", icon: <Search className="w-5 h-5" />, label: "Browse Jobs" },
    { href: "/applicants", icon: <Briefcase className="w-5 h-5" />, label: "My Applications" },
    { href: "/scheduling", icon: <MessageSquare className="w-5 h-5" />, label: "Messages" }
  ];

  return (
    <>
      {/* Right Side Navigation - Desktop */}
      <nav className="hidden lg:flex fixed right-0 top-0 h-screen w-80 bg-white border-l border-slate-200 shadow-lg flex-col z-40">
        {/* Logo Area */}
        <div className="border-b border-slate-200 p-6">
          <img 
            src="/HT.svg" 
            alt="HireTrack Logo" 
            className="w-10 h-10 object-contain mb-3"
          />
          <h2 className="text-xl font-bold text-blue-600">HireTrack</h2>
          <p className="text-xs text-slate-600 font-medium mt-1">Hiring made simple & smart</p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-indigo-700 bg-indigo-50 border-l-4 border-indigo-600' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-200 p-4 space-y-2">
          <Link
            href="/jobs/find"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Explore Jobs</span>
          </Link>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-red-200 text-red-700 text-sm font-medium hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Right Slide-in */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={onClose}
          />
          
          {/* Mobile Nav Panel */}
          <nav className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-40 flex flex-col lg:hidden overflow-y-auto">
            {/* Logo Area */}
            <div className="border-b border-slate-200 p-6">
              <img 
                src="/HT.svg" 
                alt="HireTrack Logo" 
                className="w-10 h-10 object-contain mb-3"
              />
              <h2 className="text-xl font-bold text-blue-600">HireTrack</h2>
              <p className="text-xs text-slate-600 font-medium mt-1">Hiring made simple & smart</p>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-6 px-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-indigo-700 bg-indigo-50 border-l-4 border-indigo-600' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-slate-200 p-4 space-y-2">
              <Link
                href="/jobs/find"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Explore Jobs</span>
              </Link>
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-red-200 text-red-700 text-sm font-medium hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-slate-300/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confirm Logout</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to logout? You'll need to sign in again to access your account.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightNav;
