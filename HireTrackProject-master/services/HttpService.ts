
export interface RequestConfig {
  headers?: Record<string, string>;
  credentials?: 'include' | 'omit' | 'same-origin';
  timeout?: number;
}

export interface HttpResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string | null;
  status: number;
  message?: string;
}

export interface HttpError {
  message: string;
  status: number;
  data?: any;
}

class HttpService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number = 30000; // 30 seconds

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set authorization token in headers
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization token from headers
   */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Get full URL with base URL
   */
  private getFullUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Handle response parsing and error checking
   */
  private async handleResponse<T>(response: Response): Promise<HttpResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: any = null;

    if (contentType?.includes('application/json')) {
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse JSON response:', error);
      }
    } else if (contentType?.includes('text')) {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP ${response.status}`;
      throw {
        message: errorMessage,
        status: response.status,
        data: data,
      } as HttpError;
    }

    return {
      success: true,
      data: data as T,
      status: response.status,
      message: data?.message || 'Success',
    };
  }

  /**
   * GET Request
   */
  async get<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.getFullUrl(endpoint);
      const response = await fetch(url, {
        method: 'GET',
        headers: { ...this.defaultHeaders, ...config?.headers },
        credentials: config?.credentials || 'include',
        signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * POST Request
   */
  async post<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.getFullUrl(endpoint);
      const response = await fetch(url, {
        method: 'POST',
        headers: { ...this.defaultHeaders, ...config?.headers },
        credentials: config?.credentials || 'include',
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PUT Request
   */
  async put<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.getFullUrl(endpoint);
      const response = await fetch(url, {
        method: 'PUT',
        headers: { ...this.defaultHeaders, ...config?.headers },
        credentials: config?.credentials || 'include',
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * DELETE Request
   */
  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.getFullUrl(endpoint);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { ...this.defaultHeaders, ...config?.headers },
        credentials: config?.credentials || 'include',
        signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PATCH Request
   */
  async patch<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.getFullUrl(endpoint);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { ...this.defaultHeaders, ...config?.headers },
        credentials: config?.credentials || 'include',
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle errors uniformly
   */
  private handleError(error: any): HttpResponse<any> {
    console.error('HTTP Request Error:', error);

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
        status: 0,
      };
    }

    if (error?.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timeout. Please try again.',
        status: 408,
      };
    }

    if (error?.status) {
      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    return {
      success: false,
      error: error?.message || 'An unexpected error occurred',
      status: 500,
    };
  }
}

// Export singleton instance
export const httpService = new HttpService();
export default HttpService;
