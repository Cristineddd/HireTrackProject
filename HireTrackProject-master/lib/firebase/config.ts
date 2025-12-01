/**
 * Firebase Configuration
 * Using Realtime Database (no billing required)
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyARucc8GA_qOZ4AHwIp9GckVkYohaE8VmQ",
  authDomain: "hiretrck.firebaseapp.com",
  databaseURL: "https://hiretrck-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hiretrck",
  storageBucket: "hiretrck.firebasestorage.app",
  messagingSenderId: "120314474116",
  appId: "1:120314474116:web:789e4cd7a26a6c678f5cd1",
  measurementId: "G-1SPFRP7CFD"
};

// Initialize Firebase only once
let app: FirebaseApp;
let auth: Auth;
let database: Database;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);
  storage = getStorage(app);
  
  // Analytics only works in browser
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  database = getDatabase(app);
  storage = getStorage(app);
  
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
}

export { app, auth, database, storage, analytics };
