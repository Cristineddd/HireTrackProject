import { NextRequest, NextResponse } from 'next/server';

/**
 * Send password reset email via third-party API
 * POST /api/auth/reset-password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual third-party API endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
    
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY || '',
      },
      body: JSON.stringify({
        email,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/login`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to send reset email' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Password reset email sent successfully',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
