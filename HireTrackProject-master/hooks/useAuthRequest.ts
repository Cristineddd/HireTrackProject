/**
 * Authentication Hooks
 * Custom hooks for authentication-related API calls
 */

import { useState, useCallback } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS } from '@/constants';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  ApiResponse,
} from '@/interface';

interface UseAuthRequestReturn {
  login: (credentials: LoginCredentials) => Promise<ApiResponse<AuthResponse>>;
  register: (data: RegisterData) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<ApiResponse<User>>;
  isLoading: boolean;
  error: string | null;
}

export const useAuthRequest = (): UseAuthRequestReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      
      if (response.data?.token) {
        requestService.setAuthToken(response.data.token);
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );
      
      if (response.data?.token) {
        requestService.setAuthToken(response.data.token);
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await requestService.post(API_ENDPOINTS.AUTH.LOGOUT);
      requestService.removeAuthToken();
    } catch (err: any) {
      // Even if API call fails, remove token locally
      requestService.removeAuthToken();
      const errorMessage = err.message || 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.get<User>(API_ENDPOINTS.AUTH.ME);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get current user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    login,
    register,
    logout,
    getCurrentUser,
    isLoading,
    error,
  };
};

