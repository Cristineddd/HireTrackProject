
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  // Don't render the sidebar on the root landing page to keep the hero full-bleed
  if (pathname === "/") return null;

  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:h-screen md:py-6 md:px-6 bg-white border-r">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">HT</div>
        <div>
          <h2 className="text-lg font-semibold">HireTrack</h2>
          <p className="text-xs text-slate-500">Hiring made simple & smart</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2 mb-6">
        <a href="/employer-dashboard" className="inline-block text-center rounded-md bg-indigo-600 text-white px-3 py-2 text-sm font-medium">Post a Job</a>
        <a href="/applicant-dashboard" className="inline-block text-center rounded-md border border-slate-200 text-slate-700 px-3 py-2 text-sm">Find Jobs</a>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="mt-4 space-y-1">
          <li>
            <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">🏠 <span>Home</span></Link>
          </li>
          <li>
            <Link href="/analytics" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">📊 <span>Analytics</span></Link>
          </li>
          <li>
            <Link href="/applicants" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-900 bg-slate-100">👥 <span>Applicants</span></Link>
          </li>
          <li>
            <Link href="/open-positions" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">📌 <span>Open Positions</span></Link>
          </li>
          <li>
            <Link href="/scheduling" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">📅 <span>Scheduling</span></Link>
          </li>
        </ul>
      </nav>

      <div className="mt-6 pt-4 border-t text-xs text-slate-500">
        <div className="mb-2">Trusted by 1000+ companies</div>
        <div className="flex gap-2">
          <img src="/logo-placeholder-1.png" alt="company" className="h-6 w-6 rounded" />
          <img src="/logo-placeholder-2.png" alt="company" className="h-6 w-6 rounded" />
          <img src="/logo-placeholder-3.png" alt="company" className="h-6 w-6 rounded" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
