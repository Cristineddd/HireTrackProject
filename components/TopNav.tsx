"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Briefcase,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Heart
} from 'lucide-react';

interface TopNavProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ isOpen = false, onToggle }) => {
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
    { href: "/jobs/find", icon: <Search className="w-4 h-4" />, label: "Browse Jobs" },
    { href: "/applicants", icon: <Briefcase className="w-4 h-4" />, label: "My Applications" },
    { href: "/scheduling", icon: <MessageSquare className="w-4 h-4" />, label: "Messages" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left Side */}
            <div className="flex items-center gap-2">
              <img 
                src="/H.png" 
                alt="HireTrack Logo" 
                className="w-8 h-8 object-contain"
              />
              <h2 className="text-lg font-bold text-blue-600">HireTrack</h2>
            </div>

            {/* Right Side - Navigation + Logout */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Navigation Items */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-indigo-700 bg-indigo-50' 
                          : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'
                      }`}
                    >
                      <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-red-700 border border-red-200 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Removed */}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-slate-300/30 flex items-center justify-center z-60">
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

export default TopNav;

