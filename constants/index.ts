/**
 * Constants
 * Static data and configuration values
 */

// Export mock data
export * from './mockData';

// ==================== API ENDPOINTS ====================
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Applicants
  APPLICANTS: {
    BASE: '/applicants',
    BY_ID: (id: string | number) => `/applicants/${id}`,
    UPDATE: (id: string) => `/applicants/${id}`,
    DELETE: (id: string | number) => `/applicants/${id}`,
    UPDATE_STATUS: (id: string | number) => `/applicants/${id}/status`,
    EXPORT: '/applicants/export',
  },
  
  // Positions
  POSITIONS: {
    BASE: '/positions',
    BY_ID: (id: string | number) => `/positions/${id}`,
    UPDATE: (id: string | number) => `/positions/${id}`,
    DELETE: (id: string | number) => `/positions/${id}`,
    APPLICANTS: (id: string | number) => `/positions/${id}/applicants`,
    CLOSE: (id: string | number) => `/positions/${id}/close`,
    REOPEN: (id: string | number) => `/positions/${id}/reopen`,
  },
  
  // Analytics
  ANALYTICS: {
    BASE: '/analytics',
    STATS: '/analytics/stats',
    DEPARTMENT: '/analytics/department',
    TIMELINE: '/analytics/timeline',
    SOURCE: '/analytics/source',
  },
  
  // Scheduling
  SCHEDULING: {
    BASE: '/interviews',
    BY_ID: (id: string | number) => `/interviews/${id}`,
    UPDATE: (id: string | number) => `/interviews/${id}`,
    DELETE: (id: string | number) => `/interviews/${id}`,
    RESCHEDULE: (id: string | number) => `/interviews/${id}/reschedule`,
    CANCEL: (id: string | number) => `/interviews/${id}/cancel`,
  },
} as const;

// ==================== APPLICANT STATUS ====================
export const APPLICANT_STATUS = {
  NEW: 'New',
  ACTIVE: 'Active',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
} as const;

export const APPLICANT_STATUS_OPTIONS = [
  { value: 'New', label: 'New' },
  { value: 'Active', label: 'Active' },
  { value: 'Screening', label: 'Screening' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Hired', label: 'Hired' },
  { value: 'Rejected', label: 'Rejected' },
] as const;

// ==================== POSITION STATUS ====================
export const POSITION_STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  CLOSED: 'closed',
} as const;

export const POSITION_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'closed', label: 'Closed' },
] as const;

// ==================== POSITION TYPE ====================
export const POSITION_TYPE = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
  REMOTE: 'Remote',
} as const;

export const POSITION_TYPE_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Remote', label: 'Remote' },
] as const;

// ==================== INTERVIEW TYPE ====================
export const INTERVIEW_TYPE = {
  VIDEO: 'video',
  IN_PERSON: 'in-person',
  PHONE: 'phone',
} as const;

export const INTERVIEW_TYPE_OPTIONS = [
  { value: 'video', label: 'Video Call' },
  { value: 'in-person', label: 'In-person' },
  { value: 'phone', label: 'Phone Call' },
] as const;

// ==================== INTERVIEW STATUS ====================
export const INTERVIEW_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RESCHEDULED: 'rescheduled',
} as const;

export const INTERVIEW_STATUS_OPTIONS = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'rescheduled', label: 'Rescheduled' },
] as const;

// ==================== DEPARTMENTS ====================
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Analytics',
  'Customer Support',
] as const;

// ==================== PAGINATION ====================
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// ==================== DATE FORMATS ====================
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
} as const;

// ==================== STATUS COLORS ====================
export const STATUS_COLORS = {
  applicant: {
    New: 'bg-blue-100 text-blue-700 border-blue-200',
    Active: 'bg-green-100 text-green-700 border-green-200',
    Screening: 'bg-amber-100 text-amber-700 border-amber-200',
    Interview: 'bg-purple-100 text-purple-700 border-purple-200',
    Hired: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  },
  position: {
    active: 'bg-emerald-100 text-emerald-700',
    draft: 'bg-slate-100 text-slate-700',
    closed: 'bg-rose-100 text-rose-700',
  },
  interview: {
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-rose-100 text-rose-700',
    rescheduled: 'bg-amber-100 text-amber-700',
  },
} as const;

