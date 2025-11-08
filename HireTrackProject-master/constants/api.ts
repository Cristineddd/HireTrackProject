export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// ============ API Endpoints ============

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    GET_CURRENT_USER: '/auth/me',
  },

  // Jobs/Positions
  JOBS: {
    GET_ALL: '/jobs',
    GET_BY_ID: '/jobs/:id',
    CREATE: '/jobs',
    UPDATE: '/jobs/:id',
    DELETE: '/jobs/:id',
    SEARCH: '/jobs/search',
    GET_TRENDING: '/jobs/trending',
    GET_BY_DEPARTMENT: '/jobs/department/:department',
    CLOSE_JOB: '/jobs/:id/close',
    REOPEN_JOB: '/jobs/:id/reopen',
  },

  // Applicants
  APPLICANTS: {
    GET_ALL: '/applicants',
    GET_BY_ID: '/applicants/:id',
    GET_BY_JOB: '/applicants/job/:jobId',
    UPDATE: '/applicants/:id',
    DELETE: '/applicants/:id',
    UPDATE_STATUS: '/applicants/:id/status',
    GET_STATS: '/applicants/stats',
    EXPORT: '/applicants/export',
    BULK_UPDATE: '/applicants/bulk-update',
  },

  // Interviews/Scheduling
  INTERVIEWS: {
    GET_ALL: '/interviews',
    GET_BY_ID: '/interviews/:id',
    CREATE: '/interviews',
    UPDATE: '/interviews/:id',
    DELETE: '/interviews/:id',
    CANCEL: '/interviews/:id/cancel',
    RESCHEDULE: '/interviews/:id/reschedule',
    GET_CALENDAR: '/interviews/calendar',
    GET_BY_DATE: '/interviews/date/:date',
  },

  // Analytics
  ANALYTICS: {
    GET_DASHBOARD: '/analytics/dashboard',
    GET_STATS: '/analytics/stats',
    GET_HIRING_TIMELINE: '/analytics/hiring-timeline',
    GET_SOURCE_QUALITY: '/analytics/source-quality',
    GET_DEPARTMENT_STATS: '/analytics/department-stats',
    GET_REPORT: '/analytics/report',
  },

  // User Profile
  USER: {
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    UPDATE_AVATAR: '/user/avatar',
    GET_PREFERENCES: '/user/preferences',
    UPDATE_PREFERENCES: '/user/preferences',
  },

  // Company/Organization
  COMPANY: {
    GET_INFO: '/company/info',
    UPDATE_INFO: '/company/info',
    GET_TEAM: '/company/team',
    ADD_TEAM_MEMBER: '/company/team/add',
    REMOVE_TEAM_MEMBER: '/company/team/:userId/remove',
  },
} as const;

// ============ Job Type Constants ============

export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  FREELANCE: 'freelance',
  INTERNSHIP: 'internship',
} as const;

// ============ Application Status Constants ============

export const APPLICATION_STATUS = {
  NEW: 'new',
  ACTIVE: 'active',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  HIRED: 'hired',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
} as const;

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  [APPLICATION_STATUS.NEW]: 'New',
  [APPLICATION_STATUS.ACTIVE]: 'Active',
  [APPLICATION_STATUS.SCREENING]: 'Screening',
  [APPLICATION_STATUS.INTERVIEW]: 'Interview',
  [APPLICATION_STATUS.HIRED]: 'Hired',
  [APPLICATION_STATUS.REJECTED]: 'Rejected',
  [APPLICATION_STATUS.ARCHIVED]: 'Archived',
};

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
  [APPLICATION_STATUS.NEW]: 'bg-blue-100 text-blue-700',
  [APPLICATION_STATUS.ACTIVE]: 'bg-green-100 text-green-700',
  [APPLICATION_STATUS.SCREENING]: 'bg-amber-100 text-amber-700',
  [APPLICATION_STATUS.INTERVIEW]: 'bg-purple-100 text-purple-700',
  [APPLICATION_STATUS.HIRED]: 'bg-emerald-100 text-emerald-700',
  [APPLICATION_STATUS.REJECTED]: 'bg-rose-100 text-rose-700',
  [APPLICATION_STATUS.ARCHIVED]: 'bg-slate-100 text-slate-700',
};

// ============ Job Status Constants ============

export const JOB_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
} as const;

export const JOB_STATUS_LABELS: Record<string, string> = {
  [JOB_STATUS.ACTIVE]: 'Active',
  [JOB_STATUS.DRAFT]: 'Draft',
  [JOB_STATUS.CLOSED]: 'Closed',
  [JOB_STATUS.ARCHIVED]: 'Archived',
};

// ============ Interview Type Constants ============

export const INTERVIEW_TYPES = {
  VIDEO: 'video',
  IN_PERSON: 'in-person',
  PHONE: 'phone',
} as const;

export const INTERVIEW_TYPE_LABELS: Record<string, string> = {
  [INTERVIEW_TYPES.VIDEO]: 'Video Call',
  [INTERVIEW_TYPES.IN_PERSON]: 'In-person',
  [INTERVIEW_TYPES.PHONE]: 'Phone Call',
};

// ============ Interview Status Constants ============

export const INTERVIEW_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RESCHEDULED: 'rescheduled',
  NO_SHOW: 'no_show',
} as const;

export const INTERVIEW_STATUS_LABELS: Record<string, string> = {
  [INTERVIEW_STATUS.SCHEDULED]: 'Scheduled',
  [INTERVIEW_STATUS.COMPLETED]: 'Completed',
  [INTERVIEW_STATUS.CANCELLED]: 'Cancelled',
  [INTERVIEW_STATUS.RESCHEDULED]: 'Rescheduled',
  [INTERVIEW_STATUS.NO_SHOW]: 'No Show',
};

// ============ Account Type Constants ============

export const ACCOUNT_TYPES = {
  EMPLOYER: 'employer',
  CANDIDATE: 'candidate',
  ADMIN: 'admin',
} as const;

// ============ Department Constants ============

export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Support',
  'Other',
] as const;

// ============ Experience Levels ============

export const EXPERIENCE_LEVELS = [
  'Fresher',
  '1-2 years',
  '2-5 years',
  '5-10 years',
  '10+ years',
] as const;

// ============ Currency Constants ============

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  INR: 'INR',
  CAD: 'CAD',
  AUD: 'AUD',
} as const;

// ============ Validation Messages ============

export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORD_MISMATCH: 'Passwords do not match',
  REQUIRED_FIELD: 'This field is required',
  INVALID_URL: 'Please enter a valid URL',
} as const;

// ============ Storage Keys ============

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  PREFERENCES: 'user_preferences',
} as const;

// ============ Error Messages ============

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// ============ Success Messages ============

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  REGISTER_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Successfully logged out',
  PROFILE_UPDATED: 'Profile updated successfully',
  JOB_CREATED: 'Job posted successfully',
  JOB_UPDATED: 'Job updated successfully',
  JOB_DELETED: 'Job deleted successfully',
  APPLICANT_STATUS_UPDATED: 'Applicant status updated',
  INTERVIEW_SCHEDULED: 'Interview scheduled successfully',
  INTERVIEW_CANCELLED: 'Interview cancelled',
} as const;
