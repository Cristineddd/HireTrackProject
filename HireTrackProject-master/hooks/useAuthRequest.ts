'use client';

import { useState, useCallback } from 'react';
import { httpService } from '@/services/HttpService';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/constants/api';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '@/interfaces/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface UseAuthRequest {
  login: (credentials: LoginCredentials) => Promise<AuthResponse | null>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse | null>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  getCurrentUser: () => Promise<User | null>;
  loading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
  clearError: () => void;
}

export const useAuthRequest = (): UseAuthRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Initialize auth state from local storage on mount
  const initializeAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            token,
            isAuthenticated: true,
          });
          httpService.setAuthToken(token);
        } catch (err) {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        }
      }
    }
  }, []);

  /**
   * Login user with email and password
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post<AuthResponse>(
          API_ENDPOINTS.AUTH.LOGIN,
          credentials
        );

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Login failed');
        }

        const { data } = response;

        // Store token and user data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));

        // Set auth token for future requests
        httpService.setAuthToken(data.token);

        // Update state
        setAuthState({
          user: {
            id: data.id,
            email: data.email,
            fullName: data.fullName,
            accountType: data.accountType,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: data.token,
          isAuthenticated: true,
        });

        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'Login failed. Please try again.';
        setError(errorMessage);
        console.error('Login error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (
      credentials: RegisterCredentials
    ): Promise<AuthResponse | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post<AuthResponse>(
          API_ENDPOINTS.AUTH.REGISTER,
          credentials
        );

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Registration failed');
        }

        const { data } = response;

        // Store token and user data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));

        // Set auth token for future requests
        httpService.setAuthToken(data.token);

        // Update state
        setAuthState({
          user: {
            id: data.id,
            email: data.email,
            fullName: data.fullName,
            accountType: data.accountType,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: data.token,
          isAuthenticated: true,
        });

        return data;
      } catch (err: any) {
        const errorMessage =
          err.message || 'Registration failed. Please try again.';
        setError(errorMessage);
        console.error('Registration error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      // Call logout endpoint
      await httpService.post(API_ENDPOINTS.AUTH.LOGOUT);

      // Clear storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);

      // Clear auth token
      httpService.clearAuthToken();

      // Reset state
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (err: any) {
      console.error('Logout error:', err);
      // Still clear local state even if server logout fails
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      httpService.clearAuthToken();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verify email with token
   */
  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.post(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        { token }
      );

      if (!response.success) {
        throw new Error(response.error || 'Email verification failed');
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Email verification failed.';
      setError(errorMessage);
      console.error('Email verification error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Request password reset
   */
  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post(
          API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
          { email }
        );

        if (!response.success) {
          throw new Error(response.error || 'Request failed');
        }

        return true;
      } catch (err: any) {
        const errorMessage =
          err.message || 'Failed to send reset link. Please try again.';
        setError(errorMessage);
        console.error('Forgot password error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Reset password with token
   */
  const resetPassword = useCallback(
    async (token: string, newPassword: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post(
          API_ENDPOINTS.AUTH.RESET_PASSWORD,
          { token, newPassword }
        );

        if (!response.success) {
          throw new Error(response.error || 'Password reset failed');
        }

        return true;
      } catch (err: any) {
        const errorMessage =
          err.message || 'Password reset failed. Please try again.';
        setError(errorMessage);
        console.error('Reset password error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Get current user data
   */
  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get<User>(
        API_ENDPOINTS.AUTH.GET_CURRENT_USER
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch user');
      }

      const user = response.data;
      setAuthState((prev) => ({
        ...prev,
        user,
      }));

      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

      return user;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch user data.';
      setError(errorMessage);
      console.error('Get current user error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    loading,
    error,
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    clearError,
  };
};

export default useAuthRequest;
