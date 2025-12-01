import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth callback handler
 * GET /api/auth/google/callback
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const isMock = searchParams.get('mock') === 'true';

    if (error || (!code && !isMock)) {
      return NextResponse.redirect('/auth/login?error=oauth_failed');
    }

    // Mock data for development/testing
    if (isMock) {
      const mockUser = {
        email: 'demo@google.com',
        fullName: 'Demo User',
        firstName: 'Demo',
        lastName: 'User',
        avatar: 'https://lh3.googleusercontent.com/a-/default-user-avatar',
      };
      const mockToken = 'mock_jwt_token_' + Date.now();

      // Create redirect URL with user data
      const baseUrl = new URL(request.url).origin;
      const redirectUrl = new URL('/jobs/find', baseUrl);
      redirectUrl.searchParams.set('token', mockToken);
      redirectUrl.searchParams.set('email', mockUser.email);
      redirectUrl.searchParams.set('fullName', mockUser.fullName);
      redirectUrl.searchParams.set('loginSource', 'google');

      return NextResponse.redirect(redirectUrl.toString());
    }

    // Production: Exchange code for tokens with your backend API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
    
    const response = await fetch(`${API_URL}/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY || '',
      },
      body: JSON.stringify({
        code,
        redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/google/callback`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', request.url));
    }

    // Create redirect URL with user data
    const baseUrl = new URL(request.url).origin;
    const redirectUrl = new URL('/jobs/find', baseUrl);
    redirectUrl.searchParams.set('token', data.token);
    redirectUrl.searchParams.set('email', data.user.email);
    redirectUrl.searchParams.set('fullName', data.user.fullName);
    redirectUrl.searchParams.set('loginSource', 'google');

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error: any) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect('/auth/login?error=oauth_failed');
  }
}
