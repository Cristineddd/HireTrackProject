'use client';

import { useState } from 'react';
import { PositionType } from '@/interface';

export interface AdvancedFiltersProps {
  onFilterChange: (filters: {
    search?: string;
    location?: string;
    type?: PositionType;
    department?: string;
  }) => void;
  currentFilters: {
    search?: string;
    location?: string;
    type?: string;
    department?: string;
  };
}

const POSITION_TYPES: PositionType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote',
];

const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
];

const LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Remote',
  'London, UK',
  'Toronto, CA',
];

export default function AdvancedFilters({ onFilterChange, currentFilters }: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    search: currentFilters?.search || '',
    location: currentFilters?.location || '',
    type: currentFilters?.type || '',
    department: currentFilters?.department || '',
  });

  const handleChange = (field: string, value: string) => {
    const updatedFilters = {
      ...localFilters,
      [field]: value,
    };

    setLocalFilters(updatedFilters);

    // Call parent with typed filters
    onFilterChange({
      search: updatedFilters.search || undefined,
      location: updatedFilters.location || undefined,
      type: (updatedFilters.type as PositionType) || undefined,
      department: updatedFilters.department || undefined,
    });
  };

  const handleReset = () => {
    setLocalFilters({
      search: '',
      location: '',
      type: '',
      department: '',
    });

    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

      {/* Job Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Job Type
        </label>
        <div className="space-y-2">
          <option value="">All Types</option>
          {POSITION_TYPES.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.type === type}
                onChange={(e) =>
                  handleChange('type', e.target.checked ? type : '')
                }
                className="rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Location
        </label>
        <select
          value={localFilters.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Department
        </label>
        <select
          value={localFilters.department}
          onChange={(e) => handleChange('department', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
      >
        Reset Filters
      </button>
    </div>
  );
}
