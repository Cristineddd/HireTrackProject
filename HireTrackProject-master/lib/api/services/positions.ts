/**
 * Third-Party API - Positions Service
 * CRUD operations for job positions using REST API
 */

import type {
  Position,
  PositionFilters,
  PositionStatus,
  CreatePositionData,
  PaginationParams,
} from '@/interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

/**
 * Get auth token from localStorage
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

/**
 * Fetch positions with filters and pagination
 */
export const getPositions = async (
  filters?: PositionFilters,
  pagination?: PaginationParams
) => {
  try {
    const token = getAuthToken();
    const params = new URLSearchParams();
    
    if (filters?.status) params.append('status', filters.status);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.search) params.append('search', filters.search);
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    if (pagination?.sortBy) params.append('sortBy', pagination.sortBy);
    if (pagination?.sortOrder) params.append('sortOrder', pagination.sortOrder);

    const response = await fetch(`${API_URL}/positions?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch positions');
    }

    const data = await response.json();
    return {
      positions: data.positions || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw new Error('Failed to fetch positions');
  }
};

/**
 * Get a single position by ID
 */
export const getPosition = async (id: string): Promise<Position> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Position not found');
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error('Error fetching position:', error);
    throw error;
  }
};

/**
 * Create a new position
 */
export const createPosition = async (
  positionData: CreatePositionData
): Promise<Position> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(positionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create position');
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error('Error creating position:', error);
    throw new Error('Failed to create position');
  }
};

/**
 * Update a position
 */
export const updatePosition = async (
  id: string,
  data: Partial<CreatePositionData>
): Promise<Position> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update position');
    }

    const result = await response.json();
    return result.position;
  } catch (error) {
    console.error('Error updating position:', error);
    throw new Error('Failed to update position');
  }
};

/**
 * Delete a position
 */
export const deletePosition = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete position');
    }
  } catch (error) {
    console.error('Error deleting position:', error);
    throw new Error('Failed to delete position');
  }
};

/**
 * Close a position
 */
export const closePosition = async (id: string): Promise<Position> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${id}/close`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to close position');
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error('Error closing position:', error);
    throw new Error('Failed to close position');
  }
};

/**
 * Reopen a position
 */
export const reopenPosition = async (id: string): Promise<Position> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${id}/reopen`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to reopen position');
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error('Error reopening position:', error);
    throw new Error('Failed to reopen position');
  }
};

/**
 * Get applicants for a position
 */
export const getPositionApplicants = async (positionId: string) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/positions/${positionId}/applicants`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch position applicants');
    }

    const data = await response.json();
    return data.applicants || [];
  } catch (error) {
    console.error('Error fetching position applicants:', error);
    throw new Error('Failed to fetch position applicants');
  }
};
