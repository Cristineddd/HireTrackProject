/**
 * Firebase Realtime Database - Positions Service  
 * CRUD operations for job positions using Realtime Database
 */

import { ref, push, set, get, update, remove } from 'firebase/database';
import { database } from '../config';
import type {
  Position,
  PositionFilters,
  PositionStatus,
  CreatePositionData,
  PaginationParams,
} from '@/interface';

const COLLECTION_PATH = 'positions';

/**
 * Fetch positions with filters and pagination
 */
export const getPositions = async (
  filters?: PositionFilters,
  pagination?: PaginationParams
) => {
  try {
    const positionsRef = ref(database, COLLECTION_PATH);
    const snapshot = await get(positionsRef);

    if (!snapshot.exists()) {
      return { positions: [], total: 0 };
    }

    const data = snapshot.val();
    let positions: Position[] = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    // Apply filters
    if (filters?.status) {
      positions = positions.filter((pos) => pos.status === filters.status);
    }
    if (filters?.department) {
      positions = positions.filter((pos) => pos.department === filters.department);
    }
    if (filters?.location) {
      positions = positions.filter((pos) => pos.location === filters.location);
    }
    if (filters?.type) {
      positions = positions.filter((pos) => pos.type === filters.type);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      positions = positions.filter(
        (pos) =>
          pos.title.toLowerCase().includes(searchLower) ||
          pos.department.toLowerCase().includes(searchLower) ||
          pos.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (pagination?.sortBy) {
      positions.sort((a, b) => {
        const aVal = (a as any)[pagination.sortBy!];
        const bVal = (b as any)[pagination.sortBy!];
        if (pagination.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    // Pagination
    const start = ((pagination?.page || 1) - 1) * (pagination?.limit || 10);
    const end = start + (pagination?.limit || 10);
    const paginatedPositions = positions.slice(start, end);

    return {
      positions: paginatedPositions,
      total: positions.length,
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
    const positionRef = ref(database, `${COLLECTION_PATH}/${id}`);
    const snapshot = await get(positionRef);

    if (!snapshot.exists()) {
      throw new Error('Position not found');
    }

    return {
      id,
      ...snapshot.val(),
    } as Position;
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
    const positionsRef = ref(database, COLLECTION_PATH);
    const newPositionRef = push(positionsRef);

    const dataToSave = {
      ...positionData,
      postedDate: new Date().toISOString(),
      applicants: 0,
      status: 'active' as PositionStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await set(newPositionRef, dataToSave);

    return {
      id: newPositionRef.key!,
      ...dataToSave,
    } as Position;
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
    const positionRef = ref(database, `${COLLECTION_PATH}/${id}`);

    await update(positionRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return await getPosition(id);
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
    const positionRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await remove(positionRef);
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
    const positionRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await update(positionRef, {
      status: 'closed',
      updatedAt: new Date().toISOString(),
    });

    return await getPosition(id);
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
    const positionRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await update(positionRef, {
      status: 'active',
      updatedAt: new Date().toISOString(),
    });

    return await getPosition(id);
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
    const applicantsRef = ref(database, 'applicants');
    const snapshot = await get(applicantsRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();
    const applicants = Object.keys(data)
      .map((key) => ({ id: key, ...data[key] }))
      .filter((app) => app.position === positionId);

    return applicants;
  } catch (error) {
    console.error('Error fetching position applicants:', error);
    throw new Error('Failed to fetch position applicants');
  }
};
