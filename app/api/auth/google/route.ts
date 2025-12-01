import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth authentication redirect
 * GET /api/auth/google
 */
export async function GET(request: NextRequest) {
  try {
    // For development/testing, always use mock callback
    const callbackUrl = new URL('/api/auth/google/callback', request.url);
    callbackUrl.searchParams.set('mock', 'true');
    return NextResponse.redirect(callbackUrl.toString());
  } catch (error: any) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', request.url));
  }
}
