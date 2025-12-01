"use client";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import "./globals.css";
import { NotificationProvider } from "@/components/NotificationProvider";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show mobile header on home page and auth pages
  const isAuthPage = pathname?.startsWith("/auth");
  const showMobileHeader = pathname !== "/" && !isAuthPage;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
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
          <div className="flex w-full">
            {!isAuthPage && (
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            )}
            <main className={`flex-1 w-full ${showMobileHeader ? 'pt-16 lg:pt-0' : ''}`}>
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
      </body>
    </html>
  );
}
