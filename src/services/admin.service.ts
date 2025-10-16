import apiClient from '../lib/api-client';

export interface AdminStats {
  totalUsers: number;
  totalFamilies: number;
  totalKids: number;
  totalAlbums: number;
  totalPhotos: number;
  totalMilestones: number;
  recentUsers: Array<{
    id: string;
    email: string;
    display_name: string;
    avatar_url: string | null;
    created_at: string;
  }>;
}

export interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
  last_login: string | null;
  _count?: {
    owned_families?: number;
    kids: number;
    albums: number;
    photos: number;
  };
}

export interface AdminFamily {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  created_at: string;
  owner: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
  };
  _count: {
    members: number;
    kids: number;
    albums: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class AdminService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  }

  /**
   * Get all users
   */
  async getAllUsers(page: number = 1, limit: number = 20): Promise<PaginatedResponse<AdminUser>> {
    const response = await apiClient.get<PaginatedResponse<AdminUser>>('/admin/users', {
      params: { page, limit },
    });
    return response.data;
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: string): Promise<AdminUser> {
    const response = await apiClient.put<AdminUser>(`/admin/users/${userId}/role`, { role });
    return response.data;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
  }

  /**
   * Get all families
   */
  async getAllFamilies(page: number = 1, limit: number = 20): Promise<PaginatedResponse<AdminFamily>> {
    const response = await apiClient.get<PaginatedResponse<AdminFamily>>('/admin/families', {
      params: { page, limit },
    });
    return response.data;
  }
}

export const adminService = new AdminService();
