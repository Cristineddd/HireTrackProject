import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Authentication and Route Protection
 * 
 * This middleware handles:
 * - Authentication checks for protected routes
 * - Redirects based on user authentication state
 * - Route-based access control
 */

// Define protected routes that require authentication
const protectedRoutes = [
  '/jobs/post',
  '/applicants',
  '/analytics',
  '/scheduling',
  '/open-positions',
];

// Define auth routes (login/signup)
const authRoutes = ['/auth/login', '/auth/signup'];

// Define employer-only routes
const employerOnlyRoutes = [
  '/jobs/post',
];

// Define applicant-only routes
const applicantOnlyRoutes = ['/jobs/find'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get user data from cookies or headers
  // Since we're using localStorage, we'll need to handle this on the client
  // For now, we'll use a cookie-based approach for middleware
  const userCookie = request.cookies.get('user');
  const isAuthenticated = !!userCookie;
  
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Failed to parse user cookie:', error);
    }
  }

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if current path is an employer-only route
  const isEmployerRoute = employerOnlyRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if current path is an applicant-only route
  const isApplicantRoute = applicantOnlyRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    // Redirect based on user type
    if (user?.userType === 'employer') {
      return NextResponse.redirect(new URL('/jobs/post', request.url));
    } else {
      return NextResponse.redirect(new URL('/jobs/find', request.url));
    }
  }

  // Role-based access control
  if (isAuthenticated && user) {
    // Redirect applicants trying to access employer routes
    if (isEmployerRoute && user.userType === 'applicant') {
      return NextResponse.redirect(new URL('/jobs/find', request.url));
    }

    // Redirect employers trying to access applicant routes
    if (isApplicantRoute && user.userType === 'employer') {
      return NextResponse.redirect(new URL('/jobs/post', request.url));
    }
  }

  // Add security headers
  const response = NextResponse.next();
  
  // Add custom headers for security
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add user info to response headers if authenticated (for client access)
  if (isAuthenticated && user) {
    response.headers.set('X-User-Type', user.userType);
    response.headers.set('X-User-Authenticated', 'true');
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
