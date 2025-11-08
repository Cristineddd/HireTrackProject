'use client';

import { useState, useCallback } from 'react';
import { httpService } from '@/services/HttpService';
import { API_ENDPOINTS } from '@/constants/api';
import type {
  JobPosition,
  CreateJobDTO,
  UpdateJobDTO,
  PaginatedResponse,
} from '@/interfaces/api';

interface UseJobsRequest {
  jobs: JobPosition[];
  job: JobPosition | null;
  total: number;
  page: number;
  limit: number;
  fetchJobs: (page?: number, limit?: number) => Promise<void>;
  fetchJobById: (id: string) => Promise<JobPosition | null>;
  searchJobs: (query: string) => Promise<void>;
  createJob: (data: CreateJobDTO) => Promise<JobPosition | null>;
  updateJob: (id: string, data: UpdateJobDTO) => Promise<JobPosition | null>;
  deleteJob: (id: string) => Promise<boolean>;
  closeJob: (id: string) => Promise<boolean>;
  reopenJob: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  reset: () => void;
}

export const useJobsRequest = (): UseJobsRequest => {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [job, setJob] = useState<JobPosition | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all jobs with pagination
   */
  const fetchJobs = useCallback(
    async (pageNum: number = 1, pageLimit: number = 10): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.get<PaginatedResponse<JobPosition>>(
          `${API_ENDPOINTS.JOBS.GET_ALL}?page=${pageNum}&limit=${pageLimit}`
        );

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch jobs');
        }

        const { data, total: totalJobs } = response.data;
        setJobs(data);
        setTotal(totalJobs);
        setPage(pageNum);
        setLimit(pageLimit);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch jobs.';
        setError(errorMessage);
        console.error('Fetch jobs error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Fetch single job by ID
   */
  const fetchJobById = useCallback(
    async (id: string): Promise<JobPosition | null> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.JOBS.GET_BY_ID.replace(':id', id);
        const response = await httpService.get<JobPosition>(endpoint);

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to fetch job');
        }

        setJob(response.data);
        return response.data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch job details.';
        setError(errorMessage);
        console.error('Fetch job error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Search jobs by query
   */
  const searchJobs = useCallback(async (query: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get<PaginatedResponse<JobPosition>>(
        `${API_ENDPOINTS.JOBS.SEARCH}?q=${encodeURIComponent(query)}`
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Search failed');
      }

      const { data, total: totalResults } = response.data;
      setJobs(data);
      setTotal(totalResults);
    } catch (err: any) {
      const errorMessage = err.message || 'Search failed.';
      setError(errorMessage);
      console.error('Search jobs error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new job position
   */
  const createJob = useCallback(
    async (data: CreateJobDTO): Promise<JobPosition | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await httpService.post<JobPosition>(
          API_ENDPOINTS.JOBS.CREATE,
          data
        );

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to create job');
        }

        const newJob = response.data;
        setJobs((prev) => [newJob, ...prev]);
        setTotal((prev) => prev + 1);

        return newJob;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to create job.';
        setError(errorMessage);
        console.error('Create job error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Update job position
   */
  const updateJob = useCallback(
    async (id: string, data: UpdateJobDTO): Promise<JobPosition | null> => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = API_ENDPOINTS.JOBS.UPDATE.replace(':id', id);
        const response = await httpService.put<JobPosition>(endpoint, data);

        if (!response.success || !response.data) {
          throw new Error(response.error || 'Failed to update job');
        }

        const updatedJob = response.data;

        // Update jobs list
        setJobs((prev) =>
          prev.map((job) => (job.id === id ? updatedJob : job))
        );

        // Update single job if viewing it
        if (job?.id === id) {
          setJob(updatedJob);
        }

        return updatedJob;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to update job.';
        setError(errorMessage);
        console.error('Update job error:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [job]
  );

  /**
   * Delete job position
   */
  const deleteJob = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINTS.JOBS.DELETE.replace(':id', id);
      const response = await httpService.delete(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete job');
      }

      // Remove from jobs list
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setTotal((prev) => prev - 1);

      // Clear single job view if it was deleted
      if (job?.id === id) {
        setJob(null);
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete job.';
      setError(errorMessage);
      console.error('Delete job error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [job]);

  /**
   * Close job position
   */
  const closeJob = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINTS.JOBS.CLOSE_JOB.replace(':id', id);
      const response = await httpService.post(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to close job');
      }

      // Update jobs list
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status: 'closed' } : job))
      );

      // Update single job if viewing it
      if (job?.id === id) {
        setJob((prev) => (prev ? { ...prev, status: 'closed' } : null));
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to close job.';
      setError(errorMessage);
      console.error('Close job error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [job]);

  /**
   * Reopen job position
   */
  const reopenJob = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINTS.JOBS.REOPEN_JOB.replace(':id', id);
      const response = await httpService.post(endpoint);

      if (!response.success) {
        throw new Error(response.error || 'Failed to reopen job');
      }

      // Update jobs list
      setJobs((prev) =>
        prev.map((job) => (job.id === id ? { ...job, status: 'active' } : job))
      );

      // Update single job if viewing it
      if (job?.id === id) {
        setJob((prev) => (prev ? { ...prev, status: 'active' } : null));
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reopen job.';
      setError(errorMessage);
      console.error('Reopen job error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [job]);

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
    setJobs([]);
    setJob(null);
    setTotal(0);
    setPage(1);
    setLimit(10);
    setError(null);
  }, []);

  return {
    jobs,
    job,
    total,
    page,
    limit,
    fetchJobs,
    fetchJobById,
    searchJobs,
    createJob,
    updateJob,
    deleteJob,
    closeJob,
    reopenJob,
    loading,
    error,
    clearError,
    reset,
  };
};

export default useJobsRequest;
