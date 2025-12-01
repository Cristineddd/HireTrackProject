/**
 * LocalStorage Utility
 * Centralized localStorage management with type safety
 */

export interface User {
  email: string;
  fullName?: string;
  company?: string;
  userType: 'applicant' | 'employer';
  isLoggedIn: boolean;
  loginTime: string;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}

export interface Application {
  jobId: string;
  appliedAt: string;
  status: 'pending' | 'viewed' | 'interviewing' | 'rejected' | 'accepted';
}

// Storage Keys
const STORAGE_KEYS = {
  USER: 'user',
  SAVED_JOBS: 'savedJobs',
  APPLICATIONS: 'applications',
  POSTED_JOBS: 'postedJobs',
  PREFERENCES: 'userPreferences',
} as const;

// Helper function to safely parse JSON
const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

// User Management
export const userStorage = {
  get: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return safeParse(user, null);
  },

  set: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  remove: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  isLoggedIn: (): boolean => {
    const user = userStorage.get();
    return user?.isLoggedIn ?? false;
  },

  getUserType: (): 'applicant' | 'employer' | null => {
    const user = userStorage.get();
    return user?.userType ?? null;
  },
};

// Saved Jobs Management (for applicants)
export const savedJobsStorage = {
  get: (): SavedJob[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
    return safeParse(saved, []);
  },

  add: (jobId: string): void => {
    if (typeof window === 'undefined') return;
    const saved = savedJobsStorage.get();
    if (!saved.find(job => job.jobId === jobId)) {
      saved.push({ jobId, savedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(saved));
    }
  },

  remove: (jobId: string): void => {
    if (typeof window === 'undefined') return;
    const saved = savedJobsStorage.get();
    const filtered = saved.filter(job => job.jobId !== jobId);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(filtered));
  },

  isSaved: (jobId: string): boolean => {
    const saved = savedJobsStorage.get();
    return saved.some(job => job.jobId === jobId);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.SAVED_JOBS);
  },
};

// Applications Management
export const applicationsStorage = {
  get: (): Application[] => {
    if (typeof window === 'undefined') return [];
    const apps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return safeParse(apps, []);
  },

  add: (jobId: string): void => {
    if (typeof window === 'undefined') return;
    const apps = applicationsStorage.get();
    if (!apps.find(app => app.jobId === jobId)) {
      apps.push({
        jobId,
        appliedAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },

  updateStatus: (jobId: string, status: Application['status']): void => {
    if (typeof window === 'undefined') return;
    const apps = applicationsStorage.get();
    const app = apps.find(a => a.jobId === jobId);
    if (app) {
      app.status = status;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },

  hasApplied: (jobId: string): boolean => {
    const apps = applicationsStorage.get();
    return apps.some(app => app.jobId === jobId);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
  },
};

// Posted Jobs Management (for employers)
export const postedJobsStorage = {
  get: (): any[] => {
    if (typeof window === 'undefined') return [];
    const jobs = localStorage.getItem(STORAGE_KEYS.POSTED_JOBS);
    return safeParse(jobs, []);
  },

  add: (job: any): void => {
    if (typeof window === 'undefined') return;
    const jobs = postedJobsStorage.get();
    jobs.unshift(job);
    localStorage.setItem(STORAGE_KEYS.POSTED_JOBS, JSON.stringify(jobs));
  },

  update: (jobId: string, updates: Partial<any>): void => {
    if (typeof window === 'undefined') return;
    const jobs = postedJobsStorage.get();
    const index = jobs.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.POSTED_JOBS, JSON.stringify(jobs));
    }
  },

  remove: (jobId: string): void => {
    if (typeof window === 'undefined') return;
    const jobs = postedJobsStorage.get();
    const filtered = jobs.filter(j => j.id !== jobId);
    localStorage.setItem(STORAGE_KEYS.POSTED_JOBS, JSON.stringify(filtered));
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.POSTED_JOBS);
  },
};

// User Preferences
export const preferencesStorage = {
  get: (): Record<string, any> => {
    if (typeof window === 'undefined') return {};
    const prefs = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return safeParse(prefs, {});
  },

  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return;
    const prefs = preferencesStorage.get();
    prefs[key] = value;
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  },

  get value(): any {
    return (key: string) => {
      const prefs = preferencesStorage.get();
      return prefs[key];
    };
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
  },
};

// Clear all app data
export const clearAllStorage = (): void => {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
