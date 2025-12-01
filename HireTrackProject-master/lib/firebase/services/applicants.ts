/**
 * Firebase Realtime Database - Applicants Service
 * CRUD operations for applicants using Realtime Database
 */

import { ref, push, set, get, update, remove } from 'firebase/database';
import { database } from '../config';
import type {
  Applicant,
  ApplicantFilters,
  ApplicantStatus,
  PaginationParams,
} from '@/interface';

const COLLECTION_PATH = 'applicants';

/**
 * Fetch applicants with filters
 */
export const getApplicants = async (
  filters?: ApplicantFilters,
  pagination?: PaginationParams
) => {
  try {
    const applicantsRef = ref(database, COLLECTION_PATH);
    const snapshot = await get(applicantsRef);

    if (!snapshot.exists()) {
      return { applicants: [], total: 0 };
    }

    const data = snapshot.val();
    let applicants: Applicant[] = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    // Apply filters
    if (filters?.status) {
      applicants = applicants.filter((app) => app.status === filters.status);
    }
    if (filters?.department) {
      applicants = applicants.filter((app) => app.department === filters.department);
    }
    if (filters?.location) {
      applicants = applicants.filter((app) => app.location === filters.location);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      applicants = applicants.filter(
        (app) =>
          app.name.toLowerCase().includes(searchLower) ||
          app.email.toLowerCase().includes(searchLower) ||
          app.position.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (pagination?.sortBy) {
      applicants.sort((a, b) => {
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
    const paginatedApplicants = applicants.slice(start, end);

    return {
      applicants: paginatedApplicants,
      total: applicants.length,
    };
  } catch (error) {
    console.error('Error fetching applicants:', error);
    throw new Error('Failed to fetch applicants');
  }
};

/**
 * Get a single applicant by ID
 */
export const getApplicant = async (id: string): Promise<Applicant> => {
  try {
    const applicantRef = ref(database, `${COLLECTION_PATH}/${id}`);
    const snapshot = await get(applicantRef);

    if (!snapshot.exists()) {
      throw new Error('Applicant not found');
    }

    return {
      id,
      ...snapshot.val(),
    } as Applicant;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    throw error;
  }
};

/**
 * Create a new applicant
 */
export const createApplicant = async (
  applicantData: Omit<Applicant, 'id'>
): Promise<Applicant> => {
  try {
    const applicantsRef = ref(database, COLLECTION_PATH);
    const newApplicantRef = push(applicantsRef);
    
    const dataToSave = {
      ...applicantData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await set(newApplicantRef, dataToSave);

    return {
      id: newApplicantRef.key!,
      ...dataToSave,
    } as Applicant;
  } catch (error) {
    console.error('Error creating applicant:', error);
    throw new Error('Failed to create applicant');
  }
};

/**
 * Update applicant status
 */
export const updateApplicantStatus = async (
  id: string,
  status: ApplicantStatus
): Promise<Applicant> => {
  try {
    const applicantRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await update(applicantRef, {
      status,
      updatedAt: new Date().toISOString(),
    });

    return await getApplicant(id);
  } catch (error) {
    console.error('Error updating applicant status:', error);
    throw new Error('Failed to update applicant status');
  }
};

/**
 * Update applicant data
 */
export const updateApplicant = async (
  id: string,
  data: Partial<Applicant>
): Promise<Applicant> => {
  try {
    const applicantRef = ref(database, `${COLLECTION_PATH}/${id}`);
    const updateData = { ...data };
    delete (updateData as any).id;

    await update(applicantRef, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });

    return await getApplicant(id);
  } catch (error) {
    console.error('Error updating applicant:', error);
    throw new Error('Failed to update applicant');
  }
};

/**
 * Delete an applicant
 */
export const deleteApplicant = async (id: string): Promise<void> => {
  try {
    const applicantRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await remove(applicantRef);
  } catch (error) {
    console.error('Error deleting applicant:', error);
    throw new Error('Failed to delete applicant');
  }
};

/**
 * Delete multiple applicants
 */
export const deleteApplicants = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map((id) => deleteApplicant(id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting applicants:', error);
    throw new Error('Failed to delete applicants');
  }
};
