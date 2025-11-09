/**
 * TypeScript Interfaces
 * Centralized type definitions for the application
 */

// ==================== AUTHENTICATION ====================
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'recruiter' | 'applicant';
  companyId?: string;
  avatar?: string;
}

// ==================== APPLICANTS ====================
export interface Applicant {
  id: number | string;
  initials: string;
  name: string;
  position: string;
  applicationDate: string;
  status: ApplicantStatus;
  email: string;
  location?: string;
  experience?: string;
  department?: string;
  resumeUrl?: string;
  phone?: string;
  coverLetter?: string;
  skills?: string[];
  education?: Education[];
  workHistory?: WorkHistory[];
}

export type ApplicantStatus = 'New' | 'Active' | 'Screening' | 'Interview' | 'Hired' | 'Rejected';

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface WorkHistory {
  company: string;
  position: string;
  duration: string;
}

export interface ApplicantFilters {
  status?: ApplicantStatus;
  department?: string;
  location?: string;
  experience?: string;
  search?: string;
}

export interface ApplicantListResponse {
  applicants: Applicant[];
  total: number;
  page: number;
  limit: number;
}

// ==================== POSITIONS ====================
export interface Position {
  id: number | string;
  title: string;
  department: string;
  location: string;
  type: PositionType;
  salary: string;
  experience: string;
  postedDate: string;
  applicants: number;
  status: PositionStatus;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  companyId?: string;
}

export type PositionType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
export type PositionStatus = 'active' | 'draft' | 'closed';

export interface PositionFilters {
  status?: PositionStatus;
  department?: string;
  location?: string;
  type?: PositionType;
  search?: string;
}

export interface PositionListResponse {
  positions: Position[];
  total: number;
  page: number;
  limit: number;
}

export interface CreatePositionData {
  title: string;
  department: string;
  location: string;
  type: PositionType;
  salary: string;
  experience: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
}

// ==================== ANALYTICS ====================
export interface AnalyticsStats {
  totalApplications: number;
  timeToHire: number; // in days
  activeJobs: number;
  costPerHire: number;
  change?: {
    totalApplications?: string;
    timeToHire?: string;
    activeJobs?: string;
    costPerHire?: string;
  };
}

export interface ApplicationsByDepartment {
  department: string;
  count: number;
  percentage: number;
}

export interface HiringTimeline {
  date: string;
  applications: number;
  interviews: number;
  hires: number;
}

export interface SourceQuality {
  source: string;
  applications: number;
  hires: number;
  conversionRate: number;
}

export interface AnalyticsResponse {
  stats: AnalyticsStats;
  applicationsByDepartment: ApplicationsByDepartment[];
  hiringTimeline: HiringTimeline[];
  sourceQuality: SourceQuality[];
}

// ==================== SCHEDULING ====================
export interface Interview {
  id: number | string;
  candidate: string;
  candidateId: string;
  position: string;
  positionId: string;
  date: string;
  time: string;
  type: InterviewType;
  interviewers: string[];
  interviewerIds: string[];
  status: InterviewStatus;
  location?: string;
  meetingLink?: string;
  notes?: string;
  duration?: number; // in minutes
}

export type InterviewType = 'video' | 'in-person' | 'phone';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface InterviewFilters {
  status?: InterviewStatus;
  type?: InterviewType;
  dateFrom?: string;
  dateTo?: string;
  candidateId?: string;
  positionId?: string;
}

export interface InterviewListResponse {
  interviews: Interview[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateInterviewData {
  candidateId: string;
  positionId: string;
  date: string;
  time: string;
  type: InterviewType;
  interviewerIds: string[];
  location?: string;
  meetingLink?: string;
  duration?: number;
  notes?: string;
}

// ==================== API RESPONSES ====================
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

