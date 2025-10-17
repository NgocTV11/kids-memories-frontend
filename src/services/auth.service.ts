import apiClient, { setTokens, clearTokens } from '../lib/api-client';

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  role: string;
  language: string;
  created_at: string;
  last_login: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
  display_name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    // Save tokens
    setTokens(response.data.access_token, response.data.refresh_token);
    
    return response.data;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    // Save tokens
    setTokens(response.data.access_token, response.data.refresh_token);
    
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear tokens
    clearTokens();
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    
    // Save new tokens
    setTokens(response.data.access_token, response.data.refresh_token);
    
    return response.data;
  }

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<{ message: string; resetUrl?: string }> {
    const response = await apiClient.post<{ message: string; resetUrl?: string }>(
      '/auth/forgot-password',
      { email }
    );
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>(
      '/auth/reset-password',
      { token, password }
    );
    return response.data;
  }
}

export const authService = new AuthService();
