import apiClient from '../lib/api-client';

export interface Photo {
  id: string;
  album_id: string;
  uploaded_by: string;
  file_url: string;
  thumbnail_url: string | null;
  medium_url: string | null;
  caption: string | null;
  date_taken: string | null;
  exif_data: Record<string, any>;
  kids_tagged: string[];
  tags: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  album?: {
    id: string;
    title: string;
  };
  user?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

export interface UploadPhotoDto {
  caption?: string;
  date_taken?: string;
  kids_tagged?: string[];
  tags?: string[];
}

export interface UpdatePhotoDto {
  caption?: string;
  date_taken?: string;
  kids_tagged?: string[];
  tags?: string[];
}

export interface PhotosListResponse {
  data: Photo[];
  total: number;
  limit: number;
  offset: number;
}

class PhotosService {
  /**
   * Upload photo
   */
  async upload(
    albumId: string,
    file: File,
    data: UploadPhotoDto = {}
  ): Promise<Photo> {
    const formData = new FormData();
    formData.append('photo', file);
    
    if (data.caption) formData.append('caption', data.caption);
    if (data.date_taken) formData.append('date_taken', data.date_taken);
    if (data.kids_tagged) formData.append('kids_tagged', JSON.stringify(data.kids_tagged));
    if (data.tags) formData.append('tags', JSON.stringify(data.tags));

    const response = await apiClient.post<Photo>(
      `/photos/upload?album_id=${albumId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  }

  /**
   * Get all photos
   */
  async getAll(
    albumId?: string,
    kidId?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<PhotosListResponse> {
    const params: any = { limit, offset };
    if (albumId) params.album_id = albumId;
    if (kidId) params.kid_id = kidId;

    const response = await apiClient.get<PhotosListResponse>('/photos', { params });
    return response.data;
  }

  /**
   * Get photo by ID
   */
  async getById(photoId: string): Promise<Photo> {
    const response = await apiClient.get<Photo>(`/photos/${photoId}`);
    return response.data;
  }

  /**
   * Update photo
   */
  async update(photoId: string, data: UpdatePhotoDto): Promise<Photo> {
    const response = await apiClient.put<Photo>(`/photos/${photoId}`, data);
    return response.data;
  }

  /**
   * Delete photo
   */
  async delete(photoId: string): Promise<void> {
    await apiClient.delete(`/photos/${photoId}`);
  }

  /**
   * Tag kids in photo
   */
  async tagKids(photoId: string, kidsTagged: string[]): Promise<Photo> {
    const response = await apiClient.post<Photo>(`/photos/${photoId}/tag-kids`, {
      kids_tagged: kidsTagged,
    });
    return response.data;
  }

  /**
   * Like photo
   */
  async like(photoId: string): Promise<{ message: string; liked: boolean }> {
    const response = await apiClient.post(`/photos/${photoId}/like`);
    return response.data;
  }

  /**
   * Unlike photo
   */
  async unlike(photoId: string): Promise<{ message: string; liked: boolean }> {
    const response = await apiClient.delete(`/photos/${photoId}/like`);
    return response.data;
  }

  /**
   * Check if user liked photo
   */
  async checkIfLiked(photoId: string): Promise<boolean> {
    try {
      const response = await apiClient.get<{ isLiked: boolean }>(`/photos/${photoId}/like/check`);
      return response.data.isLiked;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get photo comments
   */
  async getComments(photoId: string): Promise<PhotoComment[]> {
    const response = await apiClient.get<PhotoComment[]>(`/photos/${photoId}/comments`);
    return response.data;
  }

  /**
   * Add comment to photo
   */
  async addComment(photoId: string, content: string): Promise<PhotoComment> {
    const response = await apiClient.post<PhotoComment>(`/photos/${photoId}/comments`, {
      content,
    });
    return response.data;
  }

  /**
   * Delete comment
   */
  async deleteComment(photoId: string, commentId: string): Promise<void> {
    await apiClient.delete(`/photos/${photoId}/comments/${commentId}`);
  }

  /**
   * Track photo view
   */
  async trackView(photoId: string): Promise<void> {
    try {
      await apiClient.post(`/photos/${photoId}/views`);
    } catch (error) {
      // Silently fail - view tracking is not critical
      console.warn('Failed to track view:', error);
    }
  }
}

export interface PhotoComment {
  id: string;
  photo_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

export const photosService = new PhotosService();
