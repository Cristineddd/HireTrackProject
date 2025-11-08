'use client';

import { useState, useCallback } from 'react';
import { httpService } from '@/services/HttpService';
import { API_ENDPOINTS } from '@/constants/api';
import type { AnalyticsResponse, AnalyticsStat, AnalyticsData } from '@/interfaces/api';

interface UseAnalyticsRequest {
  analytics: AnalyticsResponse | null;
  stats: AnalyticsStat[];
  data: AnalyticsData | null;
  fetchDashboard: (period?: string) => Promise<void>;
  getStats: (period?: string) => Promise<void>;
  getHiringTimeline: (startDate?: string, endDate?: string) => Promise<any | null>;
  getSourceQuality: (period?: string) => Promise<any | null>;
  getDepartmentStats: (department?: string) => Promise<any | null>;
  getReport: (format?: 'pdf' | 'csv' | 'json') => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  reset: () => void;
}

export const useAnalyticsRequest = (): UseAnalyticsRequest => {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [stats, setStats] = useState<AnalyticsStat[]>([]);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch analytics dashboard data
   */
  const fetchDashboard = useCallback(async (period: string = '30d'): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get<AnalyticsResponse>(
        `${API_ENDPOINTS.ANALYTICS.GET_DASHBOARD}?period=${period}`
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch dashboard');
      }

      const analyticsData = response.data;
      setAnalytics(analyticsData);
      setStats(analyticsData.stats);
      setData(analyticsData.data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch analytics dashboard.';
      setError(errorMessage);
      console.error('Fetch dashboard error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get statistics data
   */
  const getStats = useCallback(async (period: string = '30d'): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get<AnalyticsStat[]>(
        `${API_ENDPOINTS.ANALYTICS.GET_STATS}?period=${period}`
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch stats');
      }

      setStats(response.data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch statistics.';
      setError(errorMessage);
      console.error('Get stats error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get hiring timeline data
   */
  const getHiringTimeline = useCallback(
    async (startDate?: string, endDate?: string): Promise<any | null> => {
      try {
        setLoading(true);
        setError(null);

        let endpoint = API_ENDPOINTS.ANALYTICS.GET_HIRING_TIMELINE;
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const response = await httpService.get(endpoint);

        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch timeline');
        }

        return response.data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch hiring timeline.';
        setError(errorMessage);
        console.error('Get timeline error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Get source quality analysis
   */
  const getSourceQuality = useCallback(
    async (period: string = '30d'): Promise<any | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.get(
          `${API_ENDPOINTS.ANALYTICS.GET_SOURCE_QUALITY}?period=${period}`
        );

        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch source quality');
        }

        return response.data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch source quality data.';
        setError(errorMessage);
        console.error('Get source quality error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Get department-specific statistics
   */
  const getDepartmentStats = useCallback(
    async (department?: string): Promise<any | null> => {
      try {
        setLoading(true);
        setError(null);

        let endpoint = API_ENDPOINTS.ANALYTICS.GET_DEPARTMENT_STATS;
        if (department) {
          endpoint += `?department=${encodeURIComponent(department)}`;
        }

        const response = await httpService.get(endpoint);

        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch department stats');
        }

        return response.data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch department statistics.';
        setError(errorMessage);
        console.error('Get department stats error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

 
  const getReport = useCallback(
    async (format: 'pdf' | 'csv' | 'json' = 'pdf'): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.get(
          `${API_ENDPOINTS.ANALYTICS.GET_REPORT}?format=${format}`
        );

        if (!response.success) {
          throw new Error(response.error || 'Failed to generate report');
        }

        // Handle file download for PDF and CSV
        if (format !== 'json' && response.data instanceof Blob) {
          const url = URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;

          const timestamp = new Date().toISOString().split('T')[0];
          const fileName = `hiretrack-report-${timestamp}.${format === 'pdf' ? 'pdf' : 'csv'}`;

          link.download = fileName;
          link.click();
          URL.revokeObjectURL(url);
        }

        return true;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to generate report.';
        setError(errorMessage);
        console.error('Get report error:', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
    setAnalytics(null);
    setStats([]);
    setData(null);
    setError(null);
  }, []);

  return {
    analytics,
    stats,
    data,
    fetchDashboard,
    getStats,
    getHiringTimeline,
    getSourceQuality,
    getDepartmentStats,
    getReport,
    loading,
    error,
    clearError,
    reset,
  };
};

export default useAnalyticsRequest;
