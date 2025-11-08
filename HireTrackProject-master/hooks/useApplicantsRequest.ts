'use client';

import { useState, useCallback } from 'react';
import { httpService } from '@/services/HttpService';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  Applicant,
  ApplicantFilters,
  ApplicantListResponse,
  UpdateApplicantDTO,
} from '@/interfaces/api';

interface UseApplicantsRequest {
  applicants: Applicant[];
  applicant: Applicant | null;
  total: number;
  page: number;
  limit: number;
  filters: ApplicantFilters;
  fetchApplicants: (filters?: ApplicantFilters) => Promise<void>;
  fetchApplicantById: (id: string) => Promise<Applicant | null>;
  fetchByJobPosition: (jobId: string) => Promise<void>;
  updateApplicant: (id: string, data: UpdateApplicantDTO) => Promise<Applicant | null>;
  updateStatus: (id: string, status: string) => Promise<boolean>;
  deleteApplicant: (id: string) => Promise<boolean>;
  bulkUpdateStatus: (ids: string[], status: string) => Promise<boolean>;
  exportApplicants: () => Promise<boolean>;
  getStats: () => Promise<any | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  reset: () => void;
}

export const useApplicantsRequest = (): UseApplicantsRequest => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<ApplicantFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Build query string from filters
   */
  const buildQueryString = useCallback((filterObj: ApplicantFilters): string => {
    const params = new URLSearchParams();

    if (filterObj.status) params.append('status', filterObj.status);
    if (filterObj.department) params.append('department', filterObj.department);
    if (filterObj.position) params.append('position', filterObj.position);
    if (filterObj.searchTerm)
      params.append('search', filterObj.searchTerm);
    if (filterObj.page) params.append('page', filterObj.page.toString());
    if (filterObj.limit) params.append('limit', filterObj.limit.toString());

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }, []);

  /**
   * Fetch applicants with filters
   */
  const fetchApplicants = useCallback(
    async (newFilters?: ApplicantFilters): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const filterToUse = newFilters || filters;
        const pageNum = filterToUse.page || 1;
        const pageLimit = filterToUse.limit || 10;

        const queryString = buildQueryString({
          ...filterToUse,
          page: pageNum,
          limit: pageLimit,
        });

        const response = await httpService.get<ApplicantListResponse>(
          `${API_ENDPOINTS.APPLICANTS.GET_ALL}${queryString}`
        );

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch applicants');
        }

        const { data, total: totalApplicants } = response.data;
        setApplicants(data);
        setTotal(totalApplicants);
        setPage(pageNum);
        setLimit(pageLimit);
        setFilters(filterToUse);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch applicants.';
        setError(errorMessage);
        console.error('Fetch applicants error:', err);
      } finally {
        setLoading(false);
      }
    },
    [filters, buildQueryString]
  );

  /**
   * Fetch single applicant by ID
   */
  const fetchApplicantById = useCallback(
    async (id: string): Promise<Applicant | null> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.APPLICANTS.GET_BY_ID.replace(':id', id);
        const response = await httpService.get<Applicant>(endpoint);

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch applicant');
        }

        setApplicant(response.data);
        return response.data;
      } catch (err: any) {
        const errorMessage =
          err.message || 'Failed to fetch applicant details.';
        setError(errorMessage);
        console.error('Fetch applicant error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Fetch applicants by job position
   */
  const fetchByJobPosition = useCallback(
    async (jobId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.APPLICANTS.GET_BY_JOB.replace(
          ':jobId',
          jobId
        );
        const response = await httpService.get<ApplicantListResponse>(endpoint);

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch applicants');
        }

        const { data, total: totalApplicants } = response.data;
        setApplicants(data);
        setTotal(totalApplicants);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch applicants.';
        setError(errorMessage);
        console.error('Fetch applicants by job error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Update applicant details
   */
  const updateApplicant = useCallback(
    async (id: string, data: UpdateApplicantDTO): Promise<Applicant | null> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.APPLICANTS.UPDATE.replace(':id', id);
        const response = await httpService.put<Applicant>(endpoint, data);

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to update applicant');
        }

        const updatedApplicant = response.data;

        // Update applicants list
        setApplicants((prev) =>
          prev.map((app) => (app.id === id ? updatedApplicant : app))
        );

        // Update single applicant if viewing it
        if (applicant?.id === id) {
          setApplicant(updatedApplicant);
        }

        return updatedApplicant;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to update applicant.';
        setError(errorMessage);
        console.error('Update applicant error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [applicant]
  );

  /**
   * Update applicant status
   */
  const updateStatus = useCallback(
    async (id: string, status: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.APPLICANTS.UPDATE_STATUS.replace(
          ':id',
          id
        );
        const response = await httpService.put(endpoint, { status });

        if (!response.success) {
          throw new Error(response.error || 'Failed to update status');
        }

        // Update applicants list
        setApplicants((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: status as any } : app))
        );

        // Update single applicant if viewing it
        if (applicant?.id === id) {
          setApplicant((prev) => (prev ? { ...prev, status: status as any } : null));
        }

        return true;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to update status.';
        setError(errorMessage);
        console.error('Update status error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [applicant]
  );

  /**
   * Delete applicant
   */
  const deleteApplicant = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINTS.APPLICANTS.DELETE.replace(':id', id);
      const response = await httpService.delete(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete applicant');
      }

      // Remove from applicants list
      setApplicants((prev) => prev.filter((app) => app.id !== id));
      setTotal((prev) => prev - 1);

      // Clear single applicant view if it was deleted
      if (applicant?.id === id) {
        setApplicant(null);
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete applicant.';
      setError(errorMessage);
      console.error('Delete applicant error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [applicant]);

  /**
   * Bulk update applicants status
   */
  const bulkUpdateStatus = useCallback(
    async (ids: string[], status: string): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post(
          API_ENDPOINTS.APPLICANTS.BULK_UPDATE,
          { ids, status }
        );

        if (!response.success) {
          throw new Error(response.error || 'Failed to update applicants');
        }

        // Update applicants list
        setApplicants((prev) =>
          prev.map((app) =>
            ids.includes(app.id) ? { ...app, status: status as any } : app
          )
        );

        return true;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to bulk update applicants.';
        setError(errorMessage);
        console.error('Bulk update error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Export applicants
   */
  const exportApplicants = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get(API_ENDPOINTS.APPLICANTS.EXPORT);

      if (!response.success) {
        throw new Error(response.error || 'Failed to export');
      }

      // Trigger download if there's a blob
      if (response.data instanceof Blob) {
        const url = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = `applicants-${new Date().toISOString()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to export applicants.';
      setError(errorMessage);
      console.error('Export error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get applicants statistics
   */
  const getStats = useCallback(async (): Promise<any | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get(API_ENDPOINTS.APPLICANTS.GET_STATS);

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch stats');
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch statistics.';
      setError(errorMessage);
      console.error('Get stats error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setApplicants([]);
    setApplicant(null);
    setTotal(0);
    setPage(1);
    setLimit(10);
    setFilters({});
    setError(null);
  }, []);

  return {
    applicants,
    applicant,
    total,
    page,
    limit,
    filters,
    fetchApplicants,
    fetchApplicantById,
    fetchByJobPosition,
    updateApplicant,
    updateStatus,
    deleteApplicant,
    bulkUpdateStatus,
    exportApplicants,
    getStats,
    loading,
    error,
    clearError,
    reset,
  };
};

export default useApplicantsRequest;
