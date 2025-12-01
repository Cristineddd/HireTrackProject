/**
 * Scheduling Hooks
 * Custom hooks for interview scheduling-related API calls
 */

import { useState, useCallback, useEffect } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS, PAGINATION } from '@/constants';
import type {
  Interview,
  InterviewFilters,
  InterviewListResponse,
  CreateInterviewData,
  PaginationParams,
  ApiResponse,
} from '@/interface';

interface UseSchedulingOptions extends PaginationParams {
  filters?: InterviewFilters;
  autoFetch?: boolean;
}

interface UseSchedulingReturn {
  interviews: Interview[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchInterviews: (filters?: InterviewFilters, pagination?: PaginationParams) => Promise<void>;
  getInterview: (id: string | number) => Promise<ApiResponse<Interview>>;
  createInterview: (data: CreateInterviewData) => Promise<ApiResponse<Interview>>;
  updateInterview: (id: string | number, data: Partial<CreateInterviewData>) => Promise<ApiResponse<Interview>>;
  deleteInterview: (id: string | number) => Promise<void>;
  rescheduleInterview: (id: string | number, date: string, time: string) => Promise<ApiResponse<Interview>>;
  cancelInterview: (id: string | number) => Promise<ApiResponse<Interview>>;
  refetch: () => Promise<void>;
}

export const useScheduling = (options: UseSchedulingOptions = {}) => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    filters,
    autoFetch = true,
  } = options;

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<InterviewFilters | undefined>(filters);
  const [currentPagination, setCurrentPagination] = useState<PaginationParams>({ page, limit });

  const fetchInterviews = useCallback(async (
    newFilters?: InterviewFilters,
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
      if (activeFilters?.type) params.type = activeFilters.type;
      if (activeFilters?.dateFrom) params.dateFrom = activeFilters.dateFrom;
      if (activeFilters?.dateTo) params.dateTo = activeFilters.dateTo;
      if (activeFilters?.candidateId) params.candidateId = activeFilters.candidateId;
      if (activeFilters?.positionId) params.positionId = activeFilters.positionId;
      if (activePagination.sortBy) params.sortBy = activePagination.sortBy;
      if (activePagination.sortOrder) params.sortOrder = activePagination.sortOrder;

      const response = await requestService.get<InterviewListResponse>(
        API_ENDPOINTS.SCHEDULING.BASE,
        params
      );

      setInterviews(response.data.interviews || []);
      setTotal(response.data.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch interviews';
      setError(errorMessage);
      setInterviews([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters, currentPagination]);

  const getInterview = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.get<Interview>(
        API_ENDPOINTS.SCHEDULING.BY_ID(id)
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createInterview = useCallback(async (data: CreateInterviewData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.post<Interview>(
        API_ENDPOINTS.SCHEDULING.BASE,
        data
      );
      
      // Add to local state
      setInterviews(prev => [response.data, ...prev]);
      setTotal(prev => prev + 1);
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateInterview = useCallback(async (
    id: string | number,
    data: Partial<CreateInterviewData>
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.put<Interview>(
        API_ENDPOINTS.SCHEDULING.UPDATE(id),
        data
      );
      
      // Update local state
      setInterviews(prev => prev.map(interview =>
        interview.id === id ? { ...interview, ...response.data } : interview
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteInterview = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await requestService.delete(API_ENDPOINTS.SCHEDULING.DELETE(id));
      
      // Update local state
      setInterviews(prev => prev.filter(interview => interview.id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const rescheduleInterview = useCallback(async (
    id: string | number,
    date: string,
    time: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.patch<Interview>(
        API_ENDPOINTS.SCHEDULING.RESCHEDULE(id),
        { date, time, status: 'rescheduled' }
      );
      
      // Update local state
      setInterviews(prev => prev.map(interview =>
        interview.id === id ? { ...interview, ...response.data } : interview
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reschedule interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelInterview = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.patch<Interview>(
        API_ENDPOINTS.SCHEDULING.CANCEL(id),
        { status: 'cancelled' }
      );
      
      // Update local state
      setInterviews(prev => prev.map(interview =>
        interview.id === id ? { ...interview, status: 'cancelled' } : interview
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to cancel interview';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchInterviews(currentFilters, currentPagination);
  }, [fetchInterviews, currentFilters, currentPagination]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchInterviews(filters, { page, limit });
    }
  }, []); // Only run on mount

  return {
    interviews,
    total,
    isLoading,
    error,
    fetchInterviews,
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview,
    rescheduleInterview,
    cancelInterview,
    refetch,
  };
};

