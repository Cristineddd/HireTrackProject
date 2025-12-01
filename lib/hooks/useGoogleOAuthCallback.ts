/**
 * Client-side utility to handle Google OAuth callback
 * This handles storing the mock/real auth data from OAuth redirect
 */

export function useGoogleOAuthCallback() {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const fullName = searchParams.get('fullName');
  const loginSource = searchParams.get('loginSource');

  if (token && email && loginSource === 'google') {
    // Store auth data
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userFullName', fullName || '');
    
    // Store login info
    const userData = {
      fullName: fullName || email,
      email: email,
      userType: "applicant" as const,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
      loginSource: 'google',
    };
    
    // Import the login utility
    import('@/utils/auth').then(({ login }) => {
      login(userData);
    });

    return { token, email, fullName, loginSource };
  }

  return null;
}

/**
 * Check if there's pending OAuth data in URL
 */
export function hasPendingOAuthData(): boolean {
  if (typeof window === 'undefined') return false;
  const searchParams = new URLSearchParams(window.location.search);
  return !!searchParams.get('token') && !!searchParams.get('loginSource');
}
