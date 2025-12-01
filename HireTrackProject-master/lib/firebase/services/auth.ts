/**
 * Firebase Authentication Service
 * User authentication using Firebase Auth with Email/Password and Google OAuth
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../config';
import type { LoginCredentials, RegisterData, User } from '@/interface';

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update profile
    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    // Send verification email
    await sendEmailVerification(userCredential.user, {
      url: `${window.location.origin}/auth/login?verified=true`,
      handleCodeInApp: false,
    });

    // Create user document in Realtime Database
    const userData: User = {
      id: userCredential.user.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'recruiter', // Default role
      companyName: data.companyName,
    };

    await set(ref(database, `users/${userCredential.user.uid}`), userData);

    return userData;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(error.message || 'Failed to register user');
  }
};

/**
 * Login user
 */
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    // Get user data from Realtime Database
    const userRef = ref(database, `users/${userCredential.user.uid}`);
    const userSnap = await get(userRef);

    if (!userSnap.exists()) {
      throw new Error('User data not found');
    }

    return userSnap.val() as User;
  } catch (error: any) {
    console.error('Error logging in:', error);
    throw new Error(error.message || 'Failed to login');
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error logging out:', error);
    throw new Error(error.message || 'Failed to logout');
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return null;
    }

    const userRef = ref(database, `users/${currentUser.uid}`);
    const userSnap = await get(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.val() as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Get auth token
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return await currentUser.getIdToken();
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user already exists in database
    const userRef = ref(database, `users/${user.uid}`);
    const userSnap = await get(userRef);

    if (userSnap.exists()) {
      // User exists, return their data
      return userSnap.val() as User;
    }

    // New user, create their profile
    const displayNameParts = user.displayName?.split(' ') || ['', ''];
    const userData: User = {
      id: user.uid,
      email: user.email || '',
      firstName: displayNameParts[0],
      lastName: displayNameParts.slice(1).join(' ') || displayNameParts[0],
      role: 'recruiter',
      avatar: user.photoURL || undefined,
    };

    await set(userRef, userData);
    return userData;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/auth/login`,
      handleCodeInApp: false,
    });
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    if (currentUser.emailVerified) {
      throw new Error('Email is already verified');
    }

    await sendEmailVerification(currentUser, {
      url: `${window.location.origin}/auth/login?verified=true`,
      handleCodeInApp: false,
    });
  } catch (error: any) {
    console.error('Error resending verification email:', error);
    throw new Error(error.message || 'Failed to resend verification email');
  }
};
