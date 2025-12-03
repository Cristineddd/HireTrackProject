/**
 * Enhanced Next.js Middleware
 * 
 * Features:
 * - Advanced authentication checks
 * - Cookie-based auth token sync
 * - Role-based access control
 * - Security headers
 * - Request logging
 * - Performance optimized
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protected routes requiring authentication
 */
const PROTECTED_ROUTES = [
  '/jobs/post',
  '/applicants',
  '/analytics',
  '/scheduling',
  '/open-positions',
  '/dashboard',
];

/**
 * Employer-only routes
 */
const EMPLOYER_ROUTES = [
  '/jobs/post',
  '/analytics',
  '/open-positions',
];

/**
 * Applicant-only routes
 */
const APPLICANT_ROUTES = [
  '/jobs/find',
  '/applicants',
  '/scheduling',
  '/my-applications',
  '/saved-jobs',
];

/**
 * Public routes (don't require auth)
 */
const PUBLIC_ROUTES = [
  '/',
  '/jobs',
  '/auth/login',
  '/auth/signup',
  '/api',
  '/sitemap.xml',
  '/robots.txt',
];

/**
 * Parse and validate user cookie
 */
function parseUserCookie(value: string | undefined) {
  if (!value) return null;
  
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (error) {
    console.error('Failed to parse user cookie:', error);
    return null;
  }
}

/**
 * Check if route is protected
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if route is public
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Get the appropriate dashboard URL based on user type
 */
function getDashboardUrl(userType: string): string {
  return userType === 'employer' ? '/jobs/post' : '/jobs/find';
}

/**
 * Main middleware handler
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Get authentication info from cookies or localStorage
  const userCookie = request.cookies.get('user');
  const isAuthenticated = !!userCookie;

  let user = null;
  if (userCookie) {
    user = parseUserCookie(userCookie.value);
  }

  /**
   * 1. Redirect unauthenticated users from protected routes
   */
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * 2. Redirect authenticated users away from auth pages
   */
  if (pathname.startsWith('/auth') && isAuthenticated) {
    const dashboard = getDashboardUrl(user?.userType || 'applicant');
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  /**
   * 3. Role-based access control - APPLICANT ONLY FOR NOW
   */
  if (isAuthenticated && user) {
    // For now, only allow applicants - redirect any employer to home
    if (user.userType === 'employer') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  /**
   * 4. Add security headers
   */
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );
  
  // Content Security Policy (adjust as needed)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'"
  );
  
  // Permissions policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  /**
   * 5. Add authentication headers for client-side access
   */
  if (isAuthenticated) {
    response.headers.set('X-Authenticated', 'true');
    
    if (user) {
      response.headers.set('X-User-Type', user.userType);
      response.headers.set('X-User-ID', user.id);
    }
  }

  /**
   * 6. Performance headers
   */
  response.headers.set(
    'Cache-Control',
    'public, max-age=3600, must-revalidate'
  );
  
  response.headers.set(
    'X-DNS-Prefetch-Control',
    'on'
  );

  return response;
}

/**
 * Configure which routes trigger middleware
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     * - public assets and static files
     */
    '/((?!api|_next/static|_next/image|public|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

/**
 * Middleware configuration options
 */
export const preferredRegion = 'auto';
