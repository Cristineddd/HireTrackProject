/**
 * Firebase Realtime Database - Interviews/Scheduling Service
 * CRUD operations for interviews using Realtime Database
 */

import { ref, push, set, get, update, remove } from 'firebase/database';
import { database } from '../config';
import type {
  Interview,
  InterviewFilters,
  InterviewStatus,
  CreateInterviewData,
  PaginationParams,
} from '@/interface';

const COLLECTION_PATH = 'interviews';

/**
 * Fetch interviews with filters and pagination
 */
export const getInterviews = async (
  filters?: InterviewFilters,
  pagination?: PaginationParams
) => {
  try {
    const interviewsRef = ref(database, COLLECTION_PATH);
    const snapshot = await get(interviewsRef);

    if (!snapshot.exists()) {
      return { interviews: [], total: 0 };
    }

    const data = snapshot.val();
    let interviews: Interview[] = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    // Apply filters
    if (filters?.status) {
      interviews = interviews.filter((int) => int.status === filters.status);
    }
    if (filters?.type) {
      interviews = interviews.filter((int) => int.type === filters.type);
    }
    if (filters?.candidateId) {
      interviews = interviews.filter((int) => int.candidateId === filters.candidateId);
    }
    if (filters?.positionId) {
      interviews = interviews.filter((int) => int.positionId === filters.positionId);
    }
    if (filters?.dateFrom || filters?.dateTo) {
      interviews = interviews.filter((interview) => {
        const interviewDate = new Date(interview.date);
        if (filters.dateFrom && interviewDate < new Date(filters.dateFrom)) {
          return false;
        }
        if (filters.dateTo && interviewDate > new Date(filters.dateTo)) {
          return false;
        }
        return true;
      });
    }

    // Sort
    if (pagination?.sortBy) {
      interviews.sort((a, b) => {
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
    const paginatedInterviews = interviews.slice(start, end);

    return {
      interviews: paginatedInterviews,
      total: interviews.length,
    };
  } catch (error) {
    console.error('Error fetching interviews:', error);
    throw new Error('Failed to fetch interviews');
  }
};

/**
 * Get a single interview by ID
 */
export const getInterview = async (id: string): Promise<Interview> => {
  try {
    const interviewRef = ref(database, `${COLLECTION_PATH}/${id}`);
    const snapshot = await get(interviewRef);

    if (!snapshot.exists()) {
      throw new Error('Interview not found');
    }

    return {
      id,
      ...snapshot.val(),
    } as Interview;
  } catch (error) {
    console.error('Error fetching interview:', error);
    throw error;
  }
};

/**
 * Create a new interview
 */
export const createInterview = async (
  interviewData: CreateInterviewData
): Promise<Interview> => {
  try {
    // Fetch candidate and position names
    const candidateRef = ref(database, `applicants/${interviewData.candidateId}`);
    const positionRef = ref(database, `positions/${interviewData.positionId}`);
    
    const [candidateSnap, positionSnap] = await Promise.all([
      get(candidateRef),
      get(positionRef),
    ]);

    const interviewsRef = ref(database, COLLECTION_PATH);
    const newInterviewRef = push(interviewsRef);

    const dataToSave = {
      ...interviewData,
      candidate: candidateSnap.exists() ? candidateSnap.val().name : 'Unknown',
      position: positionSnap.exists() ? positionSnap.val().title : 'Unknown',
      interviewers: [], // Will be populated if we fetch interviewer names
      status: 'scheduled' as InterviewStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await set(newInterviewRef, dataToSave);

    return {
      id: newInterviewRef.key!,
      ...dataToSave,
    } as Interview;
  } catch (error) {
    console.error('Error creating interview:', error);
    throw new Error('Failed to create interview');
  }
};

/**
 * Update an interview
 */
export const updateInterview = async (
  id: string,
  data: Partial<CreateInterviewData>
): Promise<Interview> => {
  try {
    const interviewRef = ref(database, `${COLLECTION_PATH}/${id}`);

    await update(interviewRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return await getInterview(id);
  } catch (error) {
    console.error('Error updating interview:', error);
    throw new Error('Failed to update interview');
  }
};

/**
 * Delete an interview
 */
export const deleteInterview = async (id: string): Promise<void> => {
  try {
    const interviewRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await remove(interviewRef);
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw new Error('Failed to delete interview');
  }
};

/**
 * Reschedule an interview
 */
export const rescheduleInterview = async (
  id: string,
  date: string,
  time: string
): Promise<Interview> => {
  try {
    const interviewRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await update(interviewRef, {
      date,
      time,
      status: 'rescheduled',
      updatedAt: new Date().toISOString(),
    });

    return await getInterview(id);
  } catch (error) {
    console.error('Error rescheduling interview:', error);
    throw new Error('Failed to reschedule interview');
  }
};

/**
 * Cancel an interview
 */
export const cancelInterview = async (id: string): Promise<Interview> => {
  try {
    const interviewRef = ref(database, `${COLLECTION_PATH}/${id}`);
    await update(interviewRef, {
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    });

    return await getInterview(id);
  } catch (error) {
    console.error('Error canceling interview:', error);
    throw new Error('Failed to cancel interview');
  }
};
