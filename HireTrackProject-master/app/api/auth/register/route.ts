import { NextRequest, NextResponse } from 'next/server';

/**
 * Register a new user via third-party API
 * POST /api/auth/register
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, fullName } = body;

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if using mock mode (for testing)
    const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
    
    if (USE_MOCK) {
      // Mock response for testing
      const mockUserId = 'user_' + Date.now();
      const mockToken = 'mock_jwt_' + Date.now();
      
      return NextResponse.json({
        message: 'Registration successful. Please check your email to verify your account.',
        user: {
          id: mockUserId,
          email: email,
          fullName: fullName,
        },
        token: mockToken,
      }, { status: 201 });
    }

    // TODO: Replace with your actual third-party API endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_KEY || '',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        fullName,
        role: 'recruiter',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Registration failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
