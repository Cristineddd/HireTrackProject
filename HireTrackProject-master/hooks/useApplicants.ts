/**
 * Applicants Hooks
 * Custom hooks for applicant-related API calls
 */

import { useState, useCallback, useEffect } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS, PAGINATION } from '@/constants';
import type {
  Applicant,
  ApplicantFilters,
  ApplicantListResponse,
  ApplicantStatus,
  PaginationParams,
  ApiResponse,
} from '@/interface';

interface UseApplicantsOptions extends PaginationParams {
  filters?: ApplicantFilters;
  autoFetch?: boolean;
}

interface UseApplicantsReturn {
  applicants: Applicant[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchApplicants: (filters?: ApplicantFilters, pagination?: PaginationParams) => Promise<void>;
  getApplicant: (id: string | number) => Promise<ApiResponse<Applicant>>;
  updateApplicantStatus: (id: string | number, status: ApplicantStatus) => Promise<ApiResponse<Applicant>>;
  deleteApplicant: (id: string | number) => Promise<void>;
  exportApplicants: (filters?: ApplicantFilters) => Promise<Blob>;
  refetch: () => Promise<void>;
}

export const useApplicants = (options: UseApplicantsOptions = {}) => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    filters,
    autoFetch = true,
  } = options;

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<ApplicantFilters | undefined>(filters);
  const [currentPagination, setCurrentPagination] = useState<PaginationParams>({ page, limit });

  const fetchApplicants = useCallback(async (
    newFilters?: ApplicantFilters,
    pagination?: PaginationParams
  ) => {
    setIsLoading(true);
    setError(null);
    
    const activeFilters = newFilters || currentFilters;
    const activePagination = pagination || currentPagination;
    
    try {
      const params: Record<string, string | number> = {
        page: activePagination.page || PAGINATION.DEFAULT_PAGE,
        limit: activePagination.limit || PAGINATION.DEFAULT_LIMIT,
      };

      if (activeFilters?.status) params.status = activeFilters.status;
      if (activeFilters?.department) params.department = activeFilters.department;
      if (activeFilters?.location) params.location = activeFilters.location;
      if (activeFilters?.experience) params.experience = activeFilters.experience;
      if (activeFilters?.search) params.search = activeFilters.search;
      if (activePagination.sortBy) params.sortBy = activePagination.sortBy;
      if (activePagination.sortOrder) params.sortOrder = activePagination.sortOrder;

      const response = await requestService.get<ApplicantListResponse>(
        API_ENDPOINTS.APPLICANTS.BASE,
        params
      );

      setApplicants(response.data.applicants || []);
      setTotal(response.data.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch applicants';
      setError(errorMessage);
      setApplicants([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters, currentPagination]);

  const getApplicant = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.get<Applicant>(
        API_ENDPOINTS.APPLICANTS.BY_ID(id)
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch applicant';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateApplicantStatus = useCallback(async (
    id: string | number,
    status: ApplicantStatus
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.patch<Applicant>(
        API_ENDPOINTS.APPLICANTS.UPDATE_STATUS(id),
        { status }
      );
      
      // Update local state
      setApplicants(prev => prev.map(applicant =>
        applicant.id === id ? { ...applicant, status } : applicant
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update applicant status';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteApplicant = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await requestService.delete(API_ENDPOINTS.APPLICANTS.DELETE(id));
      
      // Update local state
      setApplicants(prev => prev.filter(applicant => applicant.id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete applicant';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const exportApplicants = useCallback(async (exportFilters?: ApplicantFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string | number> = {};
      const activeFilters = exportFilters || currentFilters;
      
      if (activeFilters?.status) params.status = activeFilters.status;
      if (activeFilters?.department) params.department = activeFilters.department;
      if (activeFilters?.location) params.location = activeFilters.location;
      if (activeFilters?.search) params.search = activeFilters.search;

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      const queryString = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString();
      const url = `${baseUrl}${API_ENDPOINTS.APPLICANTS.EXPORT}?${queryString}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) throw new Error('Export failed');
      
      return await response.blob();
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to export applicants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters]);

  const refetch = useCallback(() => {
    return fetchApplicants(currentFilters, currentPagination);
  }, [fetchApplicants, currentFilters, currentPagination]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchApplicants(filters, { page, limit });
    }
  }, []); // Only run on mount

  return {
    applicants,
    total,
    isLoading,
    error,
    fetchApplicants,
    getApplicant,
    updateApplicantStatus,
    deleteApplicant,
    exportApplicants,
    refetch,
  };
};

