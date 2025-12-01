/**
 * Query Cache & Deduplication Utilities
 * Implements caching strategy, request deduplication, and stale time management
 */

export interface CacheConfig {
  staleTime?: number; // ms before data is considered stale
  cacheTime?: number; // ms to keep unused data in cache
  retryCount?: number;
  retryDelay?: number; // ms between retries
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleAt: number;
}

/**
 * Query Cache Manager
 * Handles caching and invalidation of API responses
 */
export class QueryCacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private activeRequests: Map<string, Promise<any>> = new Map();

  /**
   * Get cached data if still valid
   */
  get<T>(key: string, config: CacheConfig = {}): T | null {
    const { staleTime = 5 * 60 * 1000 } = config; // 5 min default
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) return null;

    const now = Date.now();
    if (now < entry.staleAt) {
      return entry.data;
    }

    return null;
  }

  /**
   * Check if data is stale
   */
  isStale(key: string, config: CacheConfig = {}): boolean {
    const { staleTime = 5 * 60 * 1000 } = config;
    const entry = this.cache.get(key);

    if (!entry) return true;

    return Date.now() >= entry.staleAt;
  }

  /**
   * Set cache entry
   */
  set<T>(key: string, data: T, config: CacheConfig = {}): void {
    const { staleTime = 5 * 60 * 1000, cacheTime = 10 * 60 * 1000 } = config;
    const now = Date.now();

    this.cache.set(key, {
      data,
      timestamp: now,
      staleAt: now + staleTime,
    });

    // Auto-cleanup after cacheTime
    if (cacheTime > 0) {
      setTimeout(() => {
        this.cache.delete(key);
      }, cacheTime);
    }
  }

  /**
   * Invalidate specific cache key
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate cache by pattern (prefix matching)
   */
  invalidateByPattern(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.activeRequests.clear();
  }

  /**
   * Deduplicate requests - return existing promise if request is in-flight
   */
  deduplicate<T>(key: string, request: () => Promise<T>): Promise<T> {
    const requestKey = `req:${key}`;

    // Return existing promise if request is in-flight
    if (this.activeRequests.has(requestKey)) {
      return this.activeRequests.get(requestKey) as Promise<T>;
    }

    // Create new request
    const promise = request()
      .then((data) => {
        this.activeRequests.delete(requestKey);
        return data;
      })
      .catch((error) => {
        this.activeRequests.delete(requestKey);
        throw error;
      });

    this.activeRequests.set(requestKey, promise);
    return promise;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      activeRequests: this.activeRequests.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const queryCacheManager = new QueryCacheManager();

/**
 * Request Deduplication Hook
 * Prevents duplicate requests for the same data
 */
export class RequestDeduplicator {
  private pending: Map<string, Promise<any>> = new Map();

  /**
   * Execute request or return pending request if already in-flight
   */
  async execute<T>(key: string, executor: () => Promise<T>): Promise<T> {
    if (this.pending.has(key)) {
      return this.pending.get(key) as Promise<T>;
    }

    const promise = executor()
      .then((result) => {
        this.pending.delete(key);
        return result;
      })
      .catch((error) => {
        this.pending.delete(key);
        throw error;
      });

    this.pending.set(key, promise);
    return promise;
  }

  /**
   * Clear pending request
   */
  clear(key: string): void {
    this.pending.delete(key);
  }

  /**
   * Clear all pending requests
   */
  clearAll(): void {
    this.pending.clear();
  }
}

/**
 * Retry Strategy with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 100,
    maxDelay = 10000,
    shouldRetry = (error) => !error.status || error.status >= 500,
  } = config;

  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry if shouldn't retry
      if (!shouldRetry(error)) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Calculate exponential backoff
      const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Generate cache key from parameters
 */
export function generateCacheKey(
  prefix: string,
  params?: Record<string, any>
): string {
  if (!params || Object.keys(params).length === 0) {
    return prefix;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(params[key])}`)
    .join('&');

  return `${prefix}:${sortedParams}`;
}
