"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { NotificationProvider } from "@/components/NotificationProvider";

// Lazy load TopNav to reduce initial bundle size
const TopNav = dynamic(() => import("@/components/TopNav"), {
  ssr: false,
  loading: () => null,
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show nav on home page and auth pages
  const isAuthPage = pathname?.startsWith("/auth");
  const isHomePage = pathname === "/";
  const showLayout = !isHomePage && !isAuthPage;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <NotificationProvider>
      {showLayout && (
        <>
          {/* Top Navigation */}
          <TopNav isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />

          {/* Main Content Area - with top padding for fixed nav */}
          <main className="w-full overflow-y-auto overflow-x-hidden pt-16">
            {children}
          </main>
        </>
      )}

      {/* Full-screen content for home and auth pages */}
      {!showLayout && (
        <main className="w-full min-h-screen overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      )}
    </NotificationProvider>
  );
}
