/**
 * Third-Party API - Applicants Service
 * CRUD operations for applicants using REST API
 */

import type {
  Applicant,
  ApplicantFilters,
  ApplicantStatus,
  PaginationParams,
} from '@/interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

/**
 * Get auth token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

/**
 * Fetch applicants with filters
 */
export const getApplicants = async (
  filters?: ApplicantFilters,
  pagination?: PaginationParams
) => {
  try {
    const token = getAuthToken();
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.search) params.append('search', filters.search);
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    if (pagination?.sortBy) params.append('sortBy', pagination.sortBy);
    if (pagination?.sortOrder) params.append('sortOrder', pagination.sortOrder);

    const response = await fetch(`${API_URL}/applicants?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applicants');
    }

    const data = await response.json();
    return {
      applicants: data.applicants || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Error fetching applicants:', error);
    throw new Error('Failed to fetch applicants');
  }
};

/**
 * Get a single applicant by ID
 */
export const getApplicant = async (id: string): Promise<Applicant> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/applicants/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Applicant not found');
    }

    const data = await response.json();
    return data.applicant;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    throw error;
  }
};

/**
 * Create a new applicant
 */
export const createApplicant = async (
  applicantData: Omit<Applicant, 'id'>
): Promise<Applicant> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(applicantData),
    });

    if (!response.ok) {
      throw new Error('Failed to create applicant');
    }

    const data = await response.json();
    return data.applicant;
  } catch (error) {
    console.error('Error creating applicant:', error);
    throw new Error('Failed to create applicant');
  }
};

/**
 * Update applicant status
 */
export const updateApplicantStatus = async (
  id: string,
  status: ApplicantStatus
): Promise<Applicant> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/applicants/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update applicant status');
    }

    const data = await response.json();
    return data.applicant;
  } catch (error) {
    console.error('Error updating applicant status:', error);
    throw new Error('Failed to update applicant status');
  }
};

/**
 * Update applicant data
 */
export const updateApplicant = async (
  id: string,
  data: Partial<Applicant>
): Promise<Applicant> => {
  try {
    const token = getAuthToken();
    const updateData = { ...data };
    delete (updateData as any).id;

    const response = await fetch(`${API_URL}/applicants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update applicant');
    }

    const result = await response.json();
    return result.applicant;
  } catch (error) {
    console.error('Error updating applicant:', error);
    throw new Error('Failed to update applicant');
  }
};

/**
 * Delete an applicant
 */
export const deleteApplicant = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/applicants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete applicant');
    }
  } catch (error) {
    console.error('Error deleting applicant:', error);
    throw new Error('Failed to delete applicant');
  }
};

/**
 * Delete multiple applicants
 */
export const deleteApplicants = async (ids: string[]): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/applicants/batch-delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete applicants');
    }
  } catch (error) {
    console.error('Error deleting applicants:', error);
    throw new Error('Failed to delete applicants');
  }
};
