
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// framer-motion removed per user request
import { 
  Home,
  BarChart2,
  Users,
  Briefcase,
  Calendar,
  PlusCircle,
  Search,
  Building2
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  // Don't render the sidebar on the root landing page to keep the hero full-bleed
  if (pathname === "/") return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex flex-col w-[280px] py-4 px-4 sm:py-6 sm:px-6 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-80
      mobile-sidebar">
      <div className="flex items-center gap-4 mb-8">
     
        <div>
          <h2 className="text-xl font-bold text-indigo-700">
            HireTrack
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Hiring made simple & smart
          </p>
        </div>
  </div>

      {/* Enhanced CTAs */}
      <div className="flex flex-col gap-3 mb-8">
        <Link 
          href="/open-positions" 
          className="group relative flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-3 text-sm font-medium shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post a Job</span>
          <div className="absolute right-4 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
            <Building2 className="w-3 h-3" />
          </div>
        </Link>
        <Link 
          href="/applicants" 
          className="group flex items-center gap-2 rounded-xl border-2 border-slate-200 text-slate-700 px-4 py-3 text-sm font-medium hover:border-indigo-100 hover:bg-indigo-50/50 transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          <span>Find Jobs</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">
          Main Menu
        </div>
        <ul className="space-y-2 px-2">
          {[
            { href: "/analytics", icon: <Home className="w-5 h-5" />, label: "Home" },
            { href: "/analytics", icon: <BarChart2 className="w-5 h-5" />, label: "Analytics" },
            { href: "/applicants", icon: <Users className="w-5 h-5" />, label: "Applicants" },
            { href: "/open-positions", icon: <Briefcase className="w-5 h-5" />, label: "Open Positions" },
            { href: "/scheduling", icon: <Calendar className="w-5 h-5" />, label: "Scheduling" }
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
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
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3">
            <div className="text-sm font-medium text-slate-900">
              1,000+ Companies Trust Us
            </div>
          </div>
          <div className="space-y-2">
            {['Company 1', 'Company 2', 'Company 3'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-sm text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
