import apiClient from '../lib/api-client';

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

export interface UpdateProfileDto {
  display_name?: string;
  avatar_url?: string;
  language?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

class UsersService {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileDto): Promise<User> {
    const response = await apiClient.put<User>('/users/me', data);
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordDto): Promise<void> {
    await apiClient.put('/users/me/password', data);
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<{ url: string }>(
      '/users/me/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }
}

export const usersService = new UsersService();
