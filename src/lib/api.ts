const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI server

export interface Profile {
  latitude: number;
  longitude: number;
  depth: number;
  temperature?: number;
  salinity?: number;
}

export interface PlotResponse {
  image_base64: string;
}

export interface QueryResponse {
  query: string;
  results: Profile[];
  error?: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Get sample profiles
  async getProfilesSample(limit: number = 10): Promise<Profile[]> {
    return this.request<Profile[]>(`/profiles/sample?limit=${limit}`);
  }

  // Query profiles by parameters
  async queryProfiles(params: {
    parameter?: string;
    lat_min?: number;
    lat_max?: number;
    lon_min?: number;
    lon_max?: number;
    limit?: number;
  }): Promise<Profile[]> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<Profile[]>(`/profiles/query?${queryParams}`);
  }

  // Get trajectory data
  async getTrajectorySample(limit: number = 10): Promise<any[]> {
    return this.request<any[]>(`/trajectories/sample?limit=${limit}`);
  }

  // Get metadata
  async getMetadataSample(limit: number = 10): Promise<any[]> {
    return this.request<any[]>(`/metadata/sample?limit=${limit}`);
  }

  // Natural language query
  async naturalLanguageQuery(question: string): Promise<QueryResponse> {
    return this.request<QueryResponse>('/nl_query', {
      method: 'POST',
      body: JSON.stringify(question),
    });
  }

  // Get plot data
  async getPlot(params: {
    parameter?: string;
    lat_min?: number;
    lat_max?: number;
    lon_min?: number;
    lon_max?: number;
    limit?: number;
  }): Promise<PlotResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<PlotResponse>(`/profiles/plot?${queryParams}`);
  }

  // Health check
  async healthCheck(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/');
  }
}

export const apiClient = new ApiClient();