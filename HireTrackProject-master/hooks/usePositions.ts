/**
 * Positions Hooks (Refined)
 * Production-ready custom hooks with caching, deduplication, retry logic, and React Query patterns
 * 
 * Features:
 * - Request deduplication & caching
 * - Exponential backoff retry strategy  
 * - Optimistic updates for CRUD operations
 * - Cache invalidation patterns
 * - Position status tracking (active, draft, closed)
 * - Applicant relationship fetching
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
  Position,
  PositionFilters,
  PositionListResponse,
  CreatePositionData,
  PaginationParams,
  ApiResponse,
} from '@/interface';

interface UsePositionsOptions extends PaginationParams {
  filters?: PositionFilters;
  autoFetch?: boolean;
  cacheConfig?: CacheConfig;
  enableOptimisticUpdates?: boolean;
}

interface UsePositionsReturn {
  positions: Position[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  fetchPositions: (filters?: PositionFilters, pagination?: PaginationParams) => Promise<void>;
  getPosition: (id: string | number) => Promise<ApiResponse<Position>>;
  createPosition: (data: CreatePositionData) => Promise<ApiResponse<Position>>;
  updatePosition: (id: string | number, data: Partial<CreatePositionData>) => Promise<ApiResponse<Position>>;
  deletePosition: (id: string | number) => Promise<void>;
  closePosition: (id: string | number) => Promise<ApiResponse<Position>>;
  reopenPosition: (id: string | number) => Promise<ApiResponse<Position>>;
  getPositionApplicants: (id: string | number) => Promise<ApiResponse<any[]>>;
  refetch: () => Promise<void>;
  invalidateCache: () => void;
}

export const usePositions = (options: UsePositionsOptions = {}): UsePositionsReturn => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    filters,
    autoFetch = true,
    cacheConfig = { staleTime: 5 * 60 * 1000, retryCount: 2 },
    enableOptimisticUpdates = true,
  } = options;

  const [positions, setPositions] = useState<Position[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<PositionFilters | undefined>(filters);
  const [currentPagination, setCurrentPagination] = useState<PaginationParams>({ page, limit });
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Generate cache key for positions list
   */
  const getCacheKey = useCallback((
    activeFilters?: PositionFilters,
    pagination?: PaginationParams
  ) => {
    return generateCacheKey('positions', {
      page: pagination?.page || page,
      limit: pagination?.limit || limit,
      ...activeFilters,
    });
  }, [page, limit]);

  /**
   * Fetch positions with caching and retry logic
   */
  const fetchPositions = useCallback(async (
    newFilters?: PositionFilters,
    pagination?: PaginationParams
  ) => {
    const activeFilters = newFilters || currentFilters;
    const activePagination = pagination || currentPagination;
    const cacheKey = getCacheKey(activeFilters, activePagination);

    // Check cache
    const cachedData = queryCacheManager.get<PositionListResponse>(cacheKey, cacheConfig);
    if (cachedData) {
      setPositions(cachedData.positions || []);
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
      if (activeFilters?.type) params.type = activeFilters.type;
      if (activeFilters?.search) params.search = activeFilters.search;
      if (activePagination.sortBy) params.sortBy = activePagination.sortBy;
      if (activePagination.sortOrder) params.sortOrder = activePagination.sortOrder;

      const response = await retryWithBackoff(
        () => requestService.get<PositionListResponse>(
          API_ENDPOINTS.POSITIONS.BASE,
          params
        ),
        { maxRetries: cacheConfig.retryCount }
      );

      setPositions(response.data.positions || []);
      setTotal(response.data.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);

      queryCacheManager.set(cacheKey, response.data, cacheConfig);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch positions';
      setError(errorMessage);
      setPositions([]);
      setTotal(0);
    } finally {
      setIsFetching(false);
    }
  }, [currentFilters, currentPagination, cacheConfig, getCacheKey]);

  /**
   * Get single position with caching
   */
  const getPosition = useCallback(async (id: string | number) => {
    const cacheKey = generateCacheKey(`position:${id}`);

    const cached = queryCacheManager.get<Position>(cacheKey, cacheConfig);
    if (cached) {
      return { data: cached, status: 200 };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await retryWithBackoff(
        () => requestService.get<Position>(API_ENDPOINTS.POSITIONS.BY_ID(id)),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.set(cacheKey, response.data, cacheConfig);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cacheConfig]);

  /**
   * Create new position
   */
  const createPosition = useCallback(async (data: CreatePositionData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await retryWithBackoff(
        () => requestService.post<Position>(API_ENDPOINTS.POSITIONS.BASE, data),
        { maxRetries: cacheConfig.retryCount }
      );

      // Optimistic update
      setPositions(prev => [response.data, ...prev]);
      setTotal(prev => prev + 1);

      // Invalidate cache
      queryCacheManager.invalidateByPattern('positions');

      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cacheConfig]);

  /**
   * Update position with optimistic updates
   */
  const updatePosition = useCallback(async (
    id: string | number,
    data: Partial<CreatePositionData>
  ) => {
    setIsLoading(true);
    setError(null);

    const previousPositions = positions;
    if (enableOptimisticUpdates) {
      setPositions(prev => prev.map(pos =>
        pos.id === id ? { ...pos, ...data } : pos
      ));
    }

    try {
      const response = await retryWithBackoff(
        () => requestService.put<Position>(API_ENDPOINTS.POSITIONS.UPDATE(id), data),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.invalidateByPattern('positions');
      queryCacheManager.invalidate(generateCacheKey(`position:${id}`));

      return response;
    } catch (err: any) {
      if (enableOptimisticUpdates) {
        setPositions(previousPositions);
      }

      const errorMessage = err.message || 'Failed to update position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [positions, cacheConfig, enableOptimisticUpdates]);

  /**
   * Delete position
   */
  const deletePosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    const previousPositions = positions;
    if (enableOptimisticUpdates) {
      setPositions(prev => prev.filter(pos => pos.id !== id));
      setTotal(prev => prev - 1);
    }

    try {
      await retryWithBackoff(
        () => requestService.delete(API_ENDPOINTS.POSITIONS.DELETE(id)),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.invalidateByPattern('positions');
      queryCacheManager.invalidate(generateCacheKey(`position:${id}`));
    } catch (err: any) {
      if (enableOptimisticUpdates) {
        setPositions(previousPositions);
        setTotal(prev => prev + 1);
      }

      const errorMessage = err.message || 'Failed to delete position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [positions, cacheConfig, enableOptimisticUpdates]);

  /**
   * Close position (change status to closed)
   */
  const closePosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    const previousPositions = positions;
    if (enableOptimisticUpdates) {
      setPositions(prev => prev.map(pos =>
        pos.id === id ? { ...pos, status: 'closed' } : pos
      ));
    }

    try {
      const response = await retryWithBackoff(
        () => requestService.patch<Position>(
          API_ENDPOINTS.POSITIONS.CLOSE(id),
          { status: 'closed' }
        ),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.invalidateByPattern('positions');
      queryCacheManager.invalidate(generateCacheKey(`position:${id}`));

      return response;
    } catch (err: any) {
      if (enableOptimisticUpdates) {
        setPositions(previousPositions);
      }

      const errorMessage = err.message || 'Failed to close position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [positions, cacheConfig, enableOptimisticUpdates]);

  /**
   * Reopen position (change status from closed to active)
   */
  const reopenPosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    const previousPositions = positions;
    if (enableOptimisticUpdates) {
      setPositions(prev => prev.map(pos =>
        pos.id === id ? { ...pos, status: 'active' } : pos
      ));
    }

    try {
      const response = await retryWithBackoff(
        () => requestService.patch<Position>(
          API_ENDPOINTS.POSITIONS.REOPEN(id),
          { status: 'active' }
        ),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.invalidateByPattern('positions');
      queryCacheManager.invalidate(generateCacheKey(`position:${id}`));

      return response;
    } catch (err: any) {
      if (enableOptimisticUpdates) {
        setPositions(previousPositions);
      }

      const errorMessage = err.message || 'Failed to reopen position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [positions, cacheConfig, enableOptimisticUpdates]);

  /**
   * Get applicants for a specific position
   */
  const getPositionApplicants = useCallback(async (id: string | number) => {
    const cacheKey = generateCacheKey(`position:${id}:applicants`);

    const cached = queryCacheManager.get<any[]>(cacheKey, cacheConfig);
    if (cached) {
      return { data: cached, status: 200 };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await retryWithBackoff(
        () => requestService.get<any[]>(API_ENDPOINTS.POSITIONS.APPLICANTS(id)),
        { maxRetries: cacheConfig.retryCount }
      );

      queryCacheManager.set(cacheKey, response.data || [], cacheConfig);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch position applicants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cacheConfig]);

  /**
   * Invalidate cache
   */
  const invalidateCache = useCallback(() => {
    queryCacheManager.invalidateByPattern('positions');
  }, []);

  /**
   * Refetch current data
   */
  const refetch = useCallback(() => {
    return fetchPositions(currentFilters, currentPagination);
  }, [fetchPositions, currentFilters, currentPagination]);

  /**
   * Auto-fetch on mount
   */
  useEffect(() => {
    if (autoFetch) {
      fetchPositions(filters, { page, limit });
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    positions,
    total,
    isLoading,
    isFetching,
    error,
    fetchPositions,
    getPosition,
    createPosition,
    updatePosition,
    deletePosition,
    closePosition,
    reopenPosition,
    getPositionApplicants,
    refetch,
    invalidateCache,
  };
};

