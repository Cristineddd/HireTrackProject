/**
 * Applicants Hooks (Refined)
 * Production-ready custom hooks with caching, deduplication, retry logic, and React Query patterns
 * 
 * Features:
 * - Request deduplication & caching with configurable stale time
 * - Exponential backoff retry strategy
 * - Optimistic updates for better UX
 * - Batch operations support
 * - Type-safe error handling
 * - Invalidation patterns for related queries
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS, PAGINATION } from '@/constants';
import {
  queryCacheManager,
  generateCacheKey,
  retryWithBackoff,
  type CacheConfig,
} from './utils/queryCache';
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
  cacheConfig?: CacheConfig;
  enableOptimisticUpdates?: boolean;
}

interface UseApplicantsReturn {
  applicants: Applicant[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  fetchApplicants: (filters?: ApplicantFilters, pagination?: PaginationParams) => Promise<void>;
  getApplicant: (id: string | number) => Promise<ApiResponse<Applicant>>;
  updateApplicantStatus: (id: string | number, status: ApplicantStatus) => Promise<ApiResponse<Applicant>>;
  deleteApplicant: (id: string | number) => Promise<void>;
  deleteApplicants: (ids: (string | number)[]) => Promise<void>;
  exportApplicants: (filters?: ApplicantFilters) => Promise<Blob>;
  refetch: () => Promise<void>;
  invalidateCache: () => void;
}

export const useApplicants = (options: UseApplicantsOptions = {}): UseApplicantsReturn => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    filters,
    autoFetch = true,
    cacheConfig = { staleTime: 5 * 60 * 1000, retryCount: 2 },
    enableOptimisticUpdates = true,
  } = options;

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<ApplicantFilters | undefined>(filters);
  const [currentPagination, setCurrentPagination] = useState<PaginationParams>({ page, limit });
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Generate cache key for applicants list
   */
  const getCacheKey = useCallback((
    activeFilters?: ApplicantFilters,
    pagination?: PaginationParams
  ) => {
    return generateCacheKey('applicants', {
      page: pagination?.page || page,
      limit: pagination?.limit || limit,
      ...activeFilters,
    });
  }, [page, limit]);

  /**
   * Fetch applicants with caching, deduplication, and retry logic
   */
  const fetchApplicants = useCallback(async (
    newFilters?: ApplicantFilters,
    pagination?: PaginationParams
  ) => {
    const activeFilters = newFilters || currentFilters;
    const activePagination = pagination || currentPagination;
    const cacheKey = getCacheKey(activeFilters, activePagination);

    // Check cache first
    const cachedData = queryCacheManager.get<ApplicantListResponse>(cacheKey, cacheConfig);
    if (cachedData) {
      setApplicants(cachedData.applicants || []);
      setTotal(cachedData.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);
      return;
    }

    setIsFetching(true);
    setError(null);

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

      // Use retry with backoff
      const response = await retryWithBackoff(
        () => requestService.get<ApplicantListResponse>(
          API_ENDPOINTS.APPLICANTS.BASE,
          params
        ),
        {
          maxRetries: cacheConfig.retryCount,
          shouldRetry: (error) => !error.status || error.status >= 500,
        }
      );

      setApplicants(response.data.applicants || []);
      setTotal(response.data.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);

      // Cache the result
      queryCacheManager.set(cacheKey, response.data, cacheConfig);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch applicants';
      setError(errorMessage);
      setApplicants([]);
      setTotal(0);
    } finally {
      setIsFetching(false);
    }
  }, [currentFilters, currentPagination, cacheConfig, getCacheKey]);

  /**
   * Get single applicant with caching
   */
  const getApplicant = useCallback(async (id: string | number) => {
    const cacheKey = generateCacheKey(`applicant:${id}`);
    
    // Check cache
    const cached = queryCacheManager.get<Applicant>(cacheKey, cacheConfig);
    if (cached) {
      return { data: cached, status: 200 };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await retryWithBackoff(
        () => requestService.get<Applicant>(API_ENDPOINTS.APPLICANTS.BY_ID(id)),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.set(cacheKey, response.data, cacheConfig);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch applicant';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cacheConfig]);

  /**
   * Update applicant status with optimistic updates
   */
  const updateApplicantStatus = useCallback(async (
    id: string | number,
    status: ApplicantStatus
  ) => {
    setIsLoading(true);
    setError(null);

    // Optimistic update
    const previousApplicants = applicants;
    if (enableOptimisticUpdates) {
      setApplicants(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ));
    }

    try {
      const response = await retryWithBackoff(
        () => requestService.patch<Applicant>(
          API_ENDPOINTS.APPLICANTS.UPDATE_STATUS(id),
          { status }
        ),
        { maxRetries: cacheConfig.retryCount }
      );

      // Invalidate related caches
      queryCacheManager.invalidateByPattern('applicants');
      queryCacheManager.invalidate(generateCacheKey(`applicant:${id}`));

      return response;
    } catch (err: any) {
      // Rollback optimistic update
      if (enableOptimisticUpdates) {
        setApplicants(previousApplicants);
      }

      const errorMessage = err.message || 'Failed to update applicant status';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [applicants, cacheConfig, enableOptimisticUpdates]);

  /**
   * Delete single applicant
   */
  const deleteApplicant = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    // Optimistic update
    const previousApplicants = applicants;
    if (enableOptimisticUpdates) {
      setApplicants(prev => prev.filter(app => app.id !== id));
      setTotal(prev => prev - 1);
    }

    try {
      await retryWithBackoff(
        () => requestService.delete(API_ENDPOINTS.APPLICANTS.DELETE(id)),
        { maxRetries: cacheConfig.retryCount }
      );

      // Invalidate caches
      queryCacheManager.invalidateByPattern('applicants');
      queryCacheManager.invalidate(generateCacheKey(`applicant:${id}`));
    } catch (err: any) {
      // Rollback optimistic update
      if (enableOptimisticUpdates) {
        setApplicants(previousApplicants);
        setTotal(prev => prev + 1);
      }

      const errorMessage = err.message || 'Failed to delete applicant';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [applicants, cacheConfig, enableOptimisticUpdates]);

  /**
   * Delete multiple applicants in batch
   */
  const deleteApplicants = useCallback(async (ids: (string | number)[]) => {
    setIsLoading(true);
    setError(null);

    // Optimistic update
    const previousApplicants = applicants;
    if (enableOptimisticUpdates) {
      setApplicants(prev => prev.filter(app => !ids.includes(app.id)));
      setTotal(prev => Math.max(0, prev - ids.length));
    }

    try {
      const deletePromises = ids.map(id =>
        retryWithBackoff(
          () => requestService.delete(API_ENDPOINTS.APPLICANTS.DELETE(id)),
          { maxRetries: cacheConfig.retryCount }
        )
      );

      await Promise.all(deletePromises);

      // Invalidate caches
      queryCacheManager.invalidateByPattern('applicants');
      ids.forEach(id => {
        queryCacheManager.invalidate(generateCacheKey(`applicant:${id}`));
      });
    } catch (err: any) {
      // Rollback optimistic update
      if (enableOptimisticUpdates) {
        setApplicants(previousApplicants);
        setTotal(prev => prev + ids.length);
      }

      const errorMessage = err.message || 'Failed to delete applicants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [applicants, cacheConfig, enableOptimisticUpdates]);

  /**
   * Export applicants as CSV/Excel blob
   */
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
      const queryString = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString();
      const url = `${baseUrl}${API_ENDPOINTS.APPLICANTS.EXPORT}?${queryString}`;

      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const response = await fetch(url, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
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

  /**
   * Invalidate cache and refetch
   */
  const invalidateCache = useCallback(() => {
    queryCacheManager.invalidateByPattern('applicants');
  }, []);

  /**
   * Refetch current data
   */
  const refetch = useCallback(() => {
    return fetchApplicants(currentFilters, currentPagination);
  }, [fetchApplicants, currentFilters, currentPagination]);

  /**
   * Auto-fetch on mount or dependency changes
   */
  useEffect(() => {
    if (autoFetch) {
      fetchApplicants(filters, { page, limit });
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []); // Only run on mount

  return {
    applicants,
    total,
    isLoading,
    isFetching,
    error,
    fetchApplicants,
    getApplicant,
    updateApplicantStatus,
    deleteApplicant,
    deleteApplicants,
    exportApplicants,
    refetch,
    invalidateCache,
  };
};

