/**
 * Example: Integrated Hook Usage with Atomic Design
 * Demonstrates best practices for using refined hooks with component architecture
 */

import React, { useState, useCallback } from 'react';
import { useApplicants, usePositions, useAnalytics } from '@/hooks';
import type { ApplicantStatus, PositionStatus } from '@/interface';

// ============================================================================
// EXAMPLE 1: Applicants List with Filtering and Batch Operations
// ============================================================================

interface ApplicantsPageProps {
  initialStatus?: ApplicantStatus;
}

export const ApplicantsPage: React.FC<ApplicantsPageProps> = ({
  initialStatus = 'Screening',
}) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [localStatusFilter, setLocalStatusFilter] = useState(initialStatus);

  const {
    applicants,
    total,
    isLoading,
    isFetching,
    error,
    fetchApplicants,
    updateApplicantStatus,
    deleteApplicants,
    exportApplicants,
    refetch,
    invalidateCache,
  } = useApplicants({
    autoFetch: true,
    filters: { status: initialStatus },
    cacheConfig: {
      staleTime: 5 * 60 * 1000,  // 5 min
      retryCount: 2,
    },
    enableOptimisticUpdates: true,
  });

  /**
   * Handle status filter change with hook-based fetching
   */
  const handleStatusChange = useCallback(async (newStatus: ApplicantStatus) => {
    setLocalStatusFilter(newStatus);
    await fetchApplicants({ status: newStatus }, { page: 1, limit: 20 });
  }, [fetchApplicants]);

  /**
   * Handle batch delete with confirmation
   */
  const handleBatchDelete = useCallback(async () => {
    if (!window.confirm(`Delete ${selectedIds.length} applicants?`)) return;

    try {
      await deleteApplicants(selectedIds);
      setSelectedIds([]); // Clear selection
      refetch(); // Refresh list
    } catch (err) {
      console.error('Batch delete failed:', err);
    }
  }, [selectedIds, deleteApplicants, refetch]);

  /**
   * Export filtered applicants
   */
  const handleExport = useCallback(async () => {
    try {
      const blob = await exportApplicants({ status: localStatusFilter });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `applicants-${localStatusFilter}.csv`;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  }, [localStatusFilter, exportApplicants]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={() => invalidateCache()} />;

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applicants</h1>
        <div className="flex gap-2">
          <select
            value={localStatusFilter}
            onChange={(e) => handleStatusChange(e.target.value as ApplicantStatus)}
            className="px-3 py-2 border rounded"
            disabled={isFetching}
          >
            <option value="New">New</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
          </select>
          <button
            onClick={handleExport}
            disabled={isFetching || applicants.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Export
          </button>
        </div>
      </div>

      {/* Batch actions toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex gap-2 p-3 bg-blue-50 rounded">
          <span className="flex-1">{selectedIds.length} selected</span>
          <button
            onClick={handleBatchDelete}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Applicants list */}
      <div className="space-y-3">
        {applicants.map((applicant) => (
          <ApplicantItemWithHooks
            key={applicant.id}
            applicant={applicant}
            isSelected={selectedIds.includes(applicant.id)}
            onSelect={(id) => {
              setSelectedIds(prev =>
                prev.includes(id)
                  ? prev.filter(x => x !== id)
                  : [...prev, id]
              );
            }}
            onStatusChange={(status) => updateApplicantStatus(applicant.id, status)}
          />
        ))}
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-600">
        Showing {applicants.length} of {total} applicants
      </div>

      {/* Loading indicator for background fetches */}
      {isFetching && <span className="text-sm text-gray-500">Updating...</span>}
    </div>
  );
};

// ============================================================================
// EXAMPLE 2: Positions List with CRUD Operations
// ============================================================================

interface PositionsPageProps {
  onPositionCreated?: (id: string | number) => void;
}

export const PositionsPage: React.FC<PositionsPageProps> = ({
  onPositionCreated,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const {
    positions,
    isLoading,
    error,
    createPosition,
    updatePosition,
    deletePosition,
    closePosition,
    reopenPosition,
    invalidateCache,
  } = usePositions({
    autoFetch: true,
    cacheConfig: { staleTime: 5 * 60 * 1000 },
  });

  /**
   * Handle position creation
   */
  const handleCreatePosition = useCallback(async (formData: FormData) => {
    setIsCreating(true);
    try {
      const response = await createPosition({
        title: formData.get('title') as string,
        department: formData.get('department') as string,
        location: formData.get('location') as string,
        type: formData.get('type') as any,
        salary: formData.get('salary') as string,
        experience: formData.get('experience') as string,
        description: formData.get('description') as string,
      });

      onPositionCreated?.(response.data.id);

      // Reset form
      (document.getElementById('createForm') as HTMLFormElement)?.reset();
    } catch (err) {
      console.error('Creation failed:', err);
    } finally {
      setIsCreating(false);
    }
  }, [createPosition, onPositionCreated]);

  /**
   * Handle position close/reopen toggle
   */
  const handleStatusToggle = useCallback(async (positionId: string | number, currentStatus: PositionStatus) => {
    try {
      if (currentStatus === 'closed') {
        await reopenPosition(positionId);
      } else {
        await closePosition(positionId);
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  }, [closePosition, reopenPosition]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={invalidateCache} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Open Positions</h1>

      {/* Create Position Form */}
      <form id="createForm" onSubmit={(e) => {
        e.preventDefault();
        handleCreatePosition(new FormData(e.currentTarget));
      }} className="p-6 bg-white rounded-lg border space-y-4">
        <input name="title" placeholder="Position Title" required className="w-full px-3 py-2 border rounded" />
        <input name="department" placeholder="Department" required className="w-full px-3 py-2 border rounded" />
        <input name="location" placeholder="Location" required className="w-full px-3 py-2 border rounded" />
        <select name="type" required className="w-full px-3 py-2 border rounded">
          <option value="">Select Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
        <button type="submit" disabled={isCreating} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
          {isCreating ? 'Creating...' : 'Create Position'}
        </button>
      </form>

      {/* Positions Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            onStatusToggle={() => handleStatusToggle(position.id, position.status)}
            onDelete={() => deletePosition(position.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 3: Analytics Dashboard with Real-time Updates
// ============================================================================

interface AnalyticsDashboardProps {
  dateRangeStart?: string;
  dateRangeEnd?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  dateRangeStart,
  dateRangeEnd,
}) => {
  const {
    stats,
    applicationsByDepartment,
    hiringTimeline,
    sourceQuality,
    isLoading,
    error,
    fetchAnalytics,
  } = useAnalytics({
    autoFetch: true,
    dateRange: {
      startDate: dateRangeStart,
      endDate: dateRangeEnd,
    },
  });

  /**
   * Handle date range change
   */
  const handleDateRangeChange = useCallback(async (start: string, end: string) => {
    await fetchAnalytics({ startDate: start, endDate: end });
  }, [fetchAnalytics]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <DateRangeSelector onChange={handleDateRangeChange} />
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Total Applications" value={stats.totalApplications} />
          <StatCard label="Time to Hire" value={`${stats.timeToHire} days`} />
          <StatCard label="Active Jobs" value={stats.activeJobs} />
          <StatCard label="Cost per Hire" value={`$${stats.costPerHire}`} />
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Applications by Department" data={applicationsByDepartment} />
        <ChartCard title="Hiring Timeline" data={hiringTimeline} />
        <ChartCard title="Source Quality" data={sourceQuality} colSpan={2} />
      </div>
    </div>
  );
};

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

/**
 * Applicant item component with hooks integration
 */
const ApplicantItemWithHooks: React.FC<{
  applicant: any;
  isSelected: boolean;
  onSelect: (id: string | number) => void;
  onStatusChange: (status: ApplicantStatus) => void;
}> = ({ applicant, isSelected, onSelect, onStatusChange }) => {
  return (
    <div className={`p-4 border rounded flex items-center gap-4 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(applicant.id)}
        className="w-5 h-5"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{applicant.name}</h3>
        <p className="text-sm text-gray-600">{applicant.position}</p>
      </div>
      <select
        value={applicant.status}
        onChange={(e) => onStatusChange(e.target.value as ApplicantStatus)}
        className="px-3 py-1 border rounded text-sm"
      >
        <option value="New">New</option>
        <option value="Screening">Screening</option>
        <option value="Interview">Interview</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
};

/**
 * Position card component
 */
const PositionCard: React.FC<{
  position: any;
  onStatusToggle: () => void;
  onDelete: () => void;
}> = ({ position, onStatusToggle, onDelete }) => {
  return (
    <div className="p-4 border rounded space-y-3">
      <div>
        <h3 className="font-semibold text-lg">{position.title}</h3>
        <p className="text-sm text-gray-600">{position.department} • {position.location}</p>
      </div>
      <div className="flex gap-2 text-sm text-gray-600">
        <span>Type: {position.type}</span>
        <span>•</span>
        <span>{position.applicants} applicants</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onStatusToggle}
          className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
            position.status === 'closed'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {position.status === 'closed' ? 'Reopen' : 'Close'}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Placeholder components
const LoadingSpinner = () => <div className="text-center py-12">Loading...</div>;
const ErrorAlert = ({ message, onRetry }: any) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 space-y-2">
    <p>{message}</p>
    {onRetry && <button onClick={onRetry} className="text-red-600 underline">Retry</button>}
  </div>
);
const DateRangeSelector = ({ onChange }: any) => (
  <div className="flex gap-2">
    <input type="date" onChange={(e) => onChange(e.target.value, '')} className="px-3 py-2 border rounded" />
    <input type="date" onChange={(e) => onChange('', e.target.value)} className="px-3 py-2 border rounded" />
  </div>
);
const StatCard = ({ label, value }: any) => (
  <div className="p-4 bg-white border rounded">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);
const ChartCard = ({ title, data, colSpan }: any) => (
  <div className={`p-4 bg-white border rounded ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
    <h3 className="font-semibold mb-4">{title}</h3>
    <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
      Chart placeholder
    </div>
  </div>
);
