import { NextRequest, NextResponse } from 'next/server';

/**
 * Login user via third-party API
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
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
    // Try both NEXT_PUBLIC_USE_MOCK and NODE_ENV to determine mock mode
    const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || 
                     process.env.NODE_ENV === 'development' ||
                     !process.env.NEXT_PUBLIC_API_URL;
    
    if (USE_MOCK) {
      // Mock response for testing - accept any credentials
      const mockUserId = 'user_' + Date.now();
      const mockToken = 'mock_jwt_' + Date.now();
      
      console.log('🔐 Using mock authentication');
      
      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: mockUserId,
          email: email,
          fullName: email.split('@')[0],
          firstName: 'Test',
          lastName: 'User',
        },
        token: mockToken,
      }, { status: 200 });
    }

    // TODO: Replace with your actual third-party API endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_KEY || '',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { message: data.message || 'Invalid credentials' },
          { status: response.status }
        );
      }

      // Return user data and auth token
      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        },
        token: data.token, // JWT token from API
      }, { status: 200 });
    } catch (fetchError: any) {
      console.error('External API error:', fetchError.message);
      // Provide helpful error message
      return NextResponse.json(
        { message: 'External API unavailable. Please configure a valid API endpoint.' },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
