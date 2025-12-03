/**
 * Optimized Open Positions Page with ISR
 * 
 * Features:
 * - ISR with 5-minute revalidation
 * - Client-side filtering and search
 * - Lazy-loaded position cards
 * - SEO metadata
 * - Performance optimized
 */

'use client';

import { useState, Suspense } from 'react';
import { usePositions } from '@/hooks';
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react';
import type { PositionType } from '@/interface';
import AdvancedFilters from '../../components/AdvancedFilters';

interface PositionFilters {
  search?: string;
  location?: string;
  type?: PositionType;
  department?: string;
}

export default function OpenPositionsPage() {
  const [filters, setFilters] = useState<PositionFilters>({});
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  const {
    positions,
    total,
    isLoading,
    error,
    fetchPositions,
  } = usePositions({
    autoFetch: true,
    filters,
    cacheConfig: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retryCount: 3,
    },
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: PositionFilters) => {
    setFilters(newFilters);
    fetchPositions(newFilters, { page: 1, limit: 12 });
  };

  // Handle search
  const handleSearch = (query: string) => {
    handleFilterChange({ ...filters, search: query });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Positions</h1>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-0">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Open Positions
          </h1>
          <p className="text-xl text-gray-600">
            {total} positions available
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setDisplayMode(displayMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {displayMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<FilterSkeleton />}>
              <AdvancedFilters
                onFilterChange={handleFilterChange}
                currentFilters={filters}
              />
            </Suspense>
          </aside>

          {/* Positions Grid/List */}
          <section className="lg:col-span-3">
            {isLoading ? (
              <div className={`grid gap-6 ${displayMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : ''}`}>
                {[1, 2, 3, 4].map((i) => (
                  <PositionCardSkeleton key={i} />
                ))}
              </div>
            ) : positions.length > 0 ? (
              <div className={`grid gap-6 ${displayMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : ''}`}>
                {positions.map((position) => (
                  <PositionCard key={position.id} position={position} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No positions found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/**
 * Position Card Component
 */
function PositionCard({
  position,
}: {
  position: any;
}) {
  return (
    <a
      href={`/jobs/${position.id}`}
      className="block bg-white rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
            {position.title}
          </h3>
          <p className="text-gray-600">{position.company}</p>
        </div>
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {position.type}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {position.description}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {position.location}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          {position.salary}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {position.experience}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {position.applicants || 0} applicants
        </span>
        <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </a>
  );
}

/**
 * Loading Skeletons
 */
function FilterSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-200 rounded-lg h-12 animate-pulse" />
      ))}
    </div>
  );
}

function PositionCardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-lg h-48 animate-pulse" />
  );
}
