import apiClient from '../lib/api-client';

export interface Milestone {
  id: string;
  kid_id: string;
  created_by: string;
  title: string;
  description: string | null;
  milestone_date: string;
  category: string;
  created_at: string;
  updated_at: string;
  photos_count?: number;
  kid?: {
    id: string;
    name: string;
    profile_picture: string | null;
    date_of_birth: string;
  };
  user?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
  photos?: Array<{
    id: string;
    file_url: string;
    thumbnail_url: string | null;
    medium_url: string | null;
    caption: string | null;
    date_taken: string | null;
  }>;
}

export interface CreateMilestoneDto {
  kid_id: string;
  title: string;
  description?: string;
  milestone_date: string;
  category: string;
  photo_ids?: string[];
}

export interface UpdateMilestoneDto {
  kid_id?: string;
  title?: string;
  description?: string;
  milestone_date?: string;
  category?: string;
  photo_ids?: string[];
}

export interface AttachPhotosDto {
  photo_ids: string[];
}

class MilestonesService {
  /**
   * Get all milestones
   */
  async getAll(kidId?: string): Promise<Milestone[]> {
    const params = kidId ? { kid_id: kidId } : {};
    const response = await apiClient.get<Milestone[]>('/milestones', { params });
    return response.data;
  }

  /**
   * Get milestone by ID
   */
  async getById(milestoneId: string): Promise<Milestone> {
    const response = await apiClient.get<Milestone>(`/milestones/${milestoneId}`);
    return response.data;
  }

  /**
   * Create new milestone
   */
  async create(data: CreateMilestoneDto): Promise<Milestone> {
    const response = await apiClient.post<Milestone>('/milestones', data);
    return response.data;
  }

  /**
   * Update milestone
   */
  async update(milestoneId: string, data: UpdateMilestoneDto): Promise<Milestone> {
    const response = await apiClient.put<Milestone>(`/milestones/${milestoneId}`, data);
    return response.data;
  }

  /**
   * Delete milestone
   */
  async delete(milestoneId: string): Promise<void> {
    await apiClient.delete(`/milestones/${milestoneId}`);
  }

  /**
   * Attach photos to milestone
   */
  async attachPhotos(milestoneId: string, photoIds: string[]): Promise<Milestone> {
    const response = await apiClient.post<Milestone>(
      `/milestones/${milestoneId}/photos`,
      { photo_ids: photoIds }
    );
    return response.data;
  }

  /**
   * Detach photos from milestone
   */
  async detachPhotos(milestoneId: string, photoIds: string[]): Promise<Milestone> {
    const response = await apiClient.delete(`/milestones/${milestoneId}/photos`, {
      data: { photo_ids: photoIds },
    });
    return response.data;
  }
}

export const milestonesService = new MilestonesService();
