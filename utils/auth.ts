/**
 * Authentication Utilities
 * Handles synchronization between localStorage and cookies for middleware support
 */

import { User } from './localStorage';

/**
 * Set a cookie with the user data
 */
export const setAuthCookie = (user: User): void => {
  if (typeof window === 'undefined') return;
  
  const cookieValue = JSON.stringify(user);
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  
  document.cookie = `user=${encodeURIComponent(cookieValue)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

/**
 * Remove the auth cookie
 */
export const removeAuthCookie = (): void => {
  if (typeof window === 'undefined') return;
  
  document.cookie = 'user=; path=/; max-age=0';
};

/**
 * Get the auth cookie value
 */
export const getAuthCookie = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
  
  if (!userCookie) return null;
  
  try {
    const cookieValue = userCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch {
    return null;
  }
};

/**
 * Login function that sets both localStorage and cookie
 */
export const login = (user: User): void => {
  if (typeof window === 'undefined') return;
  
  // Set localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  // Set cookie for middleware
  setAuthCookie(user);
};

/**
 * Logout function that clears both localStorage and cookie
 */
export const logout = (): void => {
  if (typeof window === 'undefined') return;
  
  // Clear localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('savedJobs');
  localStorage.removeItem('applications');
  localStorage.removeItem('postedJobs');
  
  // Clear cookie
  removeAuthCookie();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const user = getAuthCookie() || localStorage.getItem('user');
  return !!user;
};

/**
 * Get current user from cookie or localStorage
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  // Try cookie first (for middleware sync)
  const cookieUser = getAuthCookie();
  if (cookieUser) return cookieUser;
  
  // Fallback to localStorage
  const localUser = localStorage.getItem('user');
  if (localUser) {
    try {
      return JSON.parse(localUser);
    } catch {
      return null;
    }
  }
  
  return null;
};
