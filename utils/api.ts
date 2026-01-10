import { secureApiCall } from './security';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;

    // Add Authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await secureApiCall(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    age: number;
    gender: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async me() {
    return this.request('/auth/me');
  }

  async forgotPassword(email: string) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  // Profile endpoints
  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async updateSettings(settingsData: any) {
    return this.request('/auth/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  }

  // Message endpoints
  async sendMessage(matchId: string, message: { content: string; type?: string }) {
    return this.request('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ matchId, message }),
    });
  }

  async getMessages(matchId: string) {
    return this.request(`/messages/${matchId}`);
  }

  // Escort endpoints
  async getEscorts(params?: Record<string, string>) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request('/escorts' + queryString);
  }

  async getEscortById(id: string) {
    return this.request(`/escorts/${id}`);
  }

  async createEscortProfile(profileData: any) {
    return this.request('/escorts/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async bookEscort(escortId: string, bookingData: any) {
    return this.request(`/escorts/book/${escortId}`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;