/**
 * Positions Hooks
 * Custom hooks for position/job-related API calls
 */

import { useState, useCallback, useEffect } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS, PAGINATION } from '@/constants';
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
}

interface UsePositionsReturn {
  positions: Position[];
  total: number;
  isLoading: boolean;
  error: string | null;
  fetchPositions: (filters?: PositionFilters, pagination?: PaginationParams) => Promise<void>;
  getPosition: (id: string | number) => Promise<ApiResponse<Position>>;
  createPosition: (data: CreatePositionData) => Promise<ApiResponse<Position>>;
  updatePosition: (id: string | number, data: Partial<CreatePositionData>) => Promise<ApiResponse<Position>>;
  deletePosition: (id: string | number) => Promise<void>;
  closePosition: (id: string | number) => Promise<ApiResponse<Position>>;
  getPositionApplicants: (id: string | number) => Promise<ApiResponse<any[]>>;
  refetch: () => Promise<void>;
}

export const usePositions = (options: UsePositionsOptions = {}) => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    filters,
    autoFetch = true,
  } = options;

  const [positions, setPositions] = useState<Position[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<PositionFilters | undefined>(filters);
  const [currentPagination, setCurrentPagination] = useState<PaginationParams>({ page, limit });

  const fetchPositions = useCallback(async (
    newFilters?: PositionFilters,
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
      if (activeFilters?.type) params.type = activeFilters.type;
      if (activeFilters?.search) params.search = activeFilters.search;
      if (activePagination.sortBy) params.sortBy = activePagination.sortBy;
      if (activePagination.sortOrder) params.sortOrder = activePagination.sortOrder;

      const response = await requestService.get<PositionListResponse>(
        API_ENDPOINTS.POSITIONS.BASE,
        params
      );

      setPositions(response.data.positions || []);
      setTotal(response.data.total || 0);
      setCurrentFilters(activeFilters);
      setCurrentPagination(activePagination);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch positions';
      setError(errorMessage);
      setPositions([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters, currentPagination]);

  const getPosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.get<Position>(
        API_ENDPOINTS.POSITIONS.BY_ID(id)
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPosition = useCallback(async (data: CreatePositionData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.post<Position>(
        API_ENDPOINTS.POSITIONS.BASE,
        data
      );
      
      // Add to local state
      setPositions(prev => [response.data, ...prev]);
      setTotal(prev => prev + 1);
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePosition = useCallback(async (
    id: string | number,
    data: Partial<CreatePositionData>
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.put<Position>(
        API_ENDPOINTS.POSITIONS.UPDATE(id),
        data
      );
      
      // Update local state
      setPositions(prev => prev.map(position =>
        position.id === id ? { ...position, ...response.data } : position
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await requestService.delete(API_ENDPOINTS.POSITIONS.DELETE(id));
      
      // Update local state
      setPositions(prev => prev.filter(position => position.id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closePosition = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.patch<Position>(
        API_ENDPOINTS.POSITIONS.CLOSE(id),
        { status: 'closed' }
      );
      
      // Update local state
      setPositions(prev => prev.map(position =>
        position.id === id ? { ...position, status: 'closed' } : position
      ));
      
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to close position';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPositionApplicants = useCallback(async (id: string | number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await requestService.get<any[]>(
        API_ENDPOINTS.POSITIONS.APPLICANTS(id)
      );
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch position applicants';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchPositions(currentFilters, currentPagination);
  }, [fetchPositions, currentFilters, currentPagination]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchPositions(filters, { page, limit });
    }
  }, []); // Only run on mount

  return {
    positions,
    total,
    isLoading,
    error,
    fetchPositions,
    getPosition,
    createPosition,
    updatePosition,
    deletePosition,
    closePosition,
    getPositionApplicants,
    refetch,
  };
};

