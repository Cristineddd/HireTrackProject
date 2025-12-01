
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  Home,
  BarChart2,
  Users,
  Briefcase,
  Calendar,
  PlusCircle,
  Search,
  Building2,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  // Don't render the sidebar on auth pages and root landing page
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

  const confirmLogout = () => {
    handleLogout();
  };

  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 py-4 px-4 sm:py-6 sm:px-6 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:static lg:w-72 lg:inset-auto lg:z-auto lg:transform-none lg:h-screen overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>
      <div className="flex items-center gap-3 mb-6">
        <img 
          src="/HT.svg" 
          alt="HireTrack Logo" 
          className="w-10 h-10 object-contain"
        />
        <div>
          <h2 className="text-xl font-bold text-indigo-700">
            HireTrack
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Hiring made simple & smart
          </p>
        </div>
      </div>

      {/* Logout Button - Top Right */}
      <div className="mb-6">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 text-red-700 px-4 py-2 text-sm font-medium hover:border-red-300 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Enhanced CTAs */}
      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Find Jobs button clicked!');
            window.location.href = '/jobs/find';
          }}
          className="group flex items-center gap-2 rounded-xl border-2 border-slate-200 text-slate-700 px-4 py-3 text-sm font-medium hover:border-indigo-100 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span>Find Jobs</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">
          Main Menu
        </div>
        <ul className="space-y-2 px-2">
          {[
            { href: "/jobs/find", icon: <Search className="w-5 h-5" />, label: "Browse Jobs" },
            { href: "/applicants", icon: <Users className="w-5 h-5" />, label: "My Applications" },
            { href: "/scheduling", icon: <Calendar className="w-5 h-5" />, label: "Messages" }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked!', item.href);
                    window.location.href = item.href;
                  }}
                  className={`w-full relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? 'text-indigo-700 bg-indigo-50 border border-indigo-100' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  <span className={`${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      </aside>

      {/* Logout Confirmation Modal - Outside Sidebar */}
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
                onClick={confirmLogout}
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

export default Sidebar;
