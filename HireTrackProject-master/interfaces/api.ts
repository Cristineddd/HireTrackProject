export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  company?: string;
  accountType: 'employer' | 'candidate';
}

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  token: string;
  refreshToken?: string;
  accountType: 'employer' | 'candidate';
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  company?: string;
  accountType: 'employer' | 'candidate';
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ Job Position Interfaces ============

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  postedDate: string;
  applicants: number;
  status: 'active' | 'draft' | 'closed';
  description: string;
  requirements: string[];
  benefits: string[];
  employerId: string;
}

export interface CreateJobDTO {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface UpdateJobDTO extends Partial<CreateJobDTO> {
  status?: 'active' | 'draft' | 'closed';
}

// ============ Applicant Interfaces ============

export interface Applicant {
  id: string;
  name: string;
  email: string;
  position: string;
  applicationDate: string;
  status: 'new' | 'active' | 'screening' | 'interview' | 'hired' | 'rejected';
  location?: string;
  experience?: string;
  department?: string;
  resumeUrl?: string;
  phone?: string;
  rating?: number;
  notes?: string;
  jobPositionId: string;
  userId: string;
}

export interface ApplicantFilters {
  status?: string;
  department?: string;
  position?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface ApplicantListResponse {
  data: Applicant[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UpdateApplicantDTO {
  status?: string;
  rating?: number;
  notes?: string;
}

// ============ Interview/Scheduling Interfaces ============

export interface Interview {
  id: string;
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  meetingLink?: string;
  applicantId: string;
}

export interface CreateInterviewDTO {
  applicantId: string;
  date: string;
  time: string;
  type: 'video' | 'in-person' | 'phone';
  interviewers: string[];
  meetingLink?: string;
}

export interface UpdateInterviewDTO extends Partial<CreateInterviewDTO> {
  status?: string;
  notes?: string;
}

// ============ Analytics Interfaces ============

export interface AnalyticsStat {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon?: string;
}

export interface AnalyticsData {
  totalApplications: number;
  timeToHire: number;
  activeJobs: number;
  costPerHire: number;
  applicationsByDepartment: Record<string, number>;
  applicationsBySource: Record<string, number>;
  hiringTimeline: Array<{ date: string; count: number }>;
  sourceQuality: Record<string, { total: number; hired: number }>;
}

export interface AnalyticsResponse {
  stats: AnalyticsStat[];
  data: AnalyticsData;
  period: {
    startDate: string;
    endDate: string;
  };
}

// ============ Pagination Interfaces ============

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// ============ Generic Response Interfaces ============

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  timestamp: string;
}
