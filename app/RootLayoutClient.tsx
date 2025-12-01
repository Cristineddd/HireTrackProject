"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { NotificationProvider } from "@/components/NotificationProvider";

// Lazy load Sidebar to reduce initial bundle size
const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  ssr: false,
  loading: () => null,
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show mobile header on home page
  const showMobileHeader = pathname !== "/";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <NotificationProvider>
      {showMobileHeader && (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-indigo-700">HireTrack</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </header>
      )}
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={`flex-1 ${showMobileHeader ? 'pt-16 lg:pt-0' : ''}`}>
          {children}
        </main>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </NotificationProvider>
  );
}
