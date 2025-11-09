/**
 * Analytics Hooks
 * Custom hooks for analytics-related API calls
 */

import { useState, useCallback, useEffect } from 'react';
import { requestService } from '@/service/RequestService';
import { API_ENDPOINTS } from '@/constants';
import type {
  AnalyticsResponse,
  AnalyticsStats,
  ApplicationsByDepartment,
  HiringTimeline,
  SourceQuality,
  ApiResponse,
} from '@/interface';

interface UseAnalyticsOptions {
  autoFetch?: boolean;
  dateRange?: {
    startDate?: string;
    endDate?: string;
  };
}

interface UseAnalyticsReturn {
  stats: AnalyticsStats | null;
  applicationsByDepartment: ApplicationsByDepartment[];
  hiringTimeline: HiringTimeline[];
  sourceQuality: SourceQuality[];
  isLoading: boolean;
  error: string | null;
  fetchAnalytics: (dateRange?: { startDate?: string; endDate?: string }) => Promise<void>;
  fetchStats: () => Promise<ApiResponse<AnalyticsStats>>;
  fetchDepartmentData: () => Promise<ApiResponse<ApplicationsByDepartment[]>>;
  fetchTimelineData: () => Promise<ApiResponse<HiringTimeline[]>>;
  fetchSourceData: () => Promise<ApiResponse<SourceQuality[]>>;
  refetch: () => Promise<void>;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const { autoFetch = true, dateRange } = options;

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [applicationsByDepartment, setApplicationsByDepartment] = useState<ApplicationsByDepartment[]>([]);
  const [hiringTimeline, setHiringTimeline] = useState<HiringTimeline[]>([]);
  const [sourceQuality, setSourceQuality] = useState<SourceQuality[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDateRange, setCurrentDateRange] = useState(dateRange);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string> = {};
      if (currentDateRange?.startDate) params.startDate = currentDateRange.startDate;
      if (currentDateRange?.endDate) params.endDate = currentDateRange.endDate;

      const response = await requestService.get<AnalyticsStats>(
        API_ENDPOINTS.ANALYTICS.STATS,
        params
      );
      
      setStats(response.data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch analytics stats';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentDateRange]);

  const fetchDepartmentData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string> = {};
      if (currentDateRange?.startDate) params.startDate = currentDateRange.startDate;
      if (currentDateRange?.endDate) params.endDate = currentDateRange.endDate;

      const response = await requestService.get<ApplicationsByDepartment[]>(
        API_ENDPOINTS.ANALYTICS.DEPARTMENT,
        params
      );
      
      setApplicationsByDepartment(response.data || []);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch department data';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentDateRange]);

  const fetchTimelineData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string> = {};
      if (currentDateRange?.startDate) params.startDate = currentDateRange.startDate;
      if (currentDateRange?.endDate) params.endDate = currentDateRange.endDate;

      const response = await requestService.get<HiringTimeline[]>(
        API_ENDPOINTS.ANALYTICS.TIMELINE,
        params
      );
      
      setHiringTimeline(response.data || []);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch timeline data';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentDateRange]);

  const fetchSourceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, string> = {};
      if (currentDateRange?.startDate) params.startDate = currentDateRange.startDate;
      if (currentDateRange?.endDate) params.endDate = currentDateRange.endDate;

      const response = await requestService.get<SourceQuality[]>(
        API_ENDPOINTS.ANALYTICS.SOURCE,
        params
      );
      
      setSourceQuality(response.data || []);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch source data';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentDateRange]);

  const fetchAnalytics = useCallback(async (newDateRange?: { startDate?: string; endDate?: string }) => {
    const activeDateRange = newDateRange || currentDateRange;
    setCurrentDateRange(activeDateRange);
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all analytics data in parallel
      await Promise.all([
        fetchStats(),
        fetchDepartmentData(),
        fetchTimelineData(),
        fetchSourceData(),
      ]);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch analytics';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [fetchStats, fetchDepartmentData, fetchTimelineData, fetchSourceData, currentDateRange]);

  const refetch = useCallback(() => {
    return fetchAnalytics(currentDateRange);
  }, [fetchAnalytics, currentDateRange]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchAnalytics(dateRange);
    }
  }, []); // Only run on mount

  return {
    stats,
    applicationsByDepartment,
    hiringTimeline,
    sourceQuality,
    isLoading,
    error,
    fetchAnalytics,
    fetchStats,
    fetchDepartmentData,
    fetchTimelineData,
    fetchSourceData,
    refetch,
  };
};

