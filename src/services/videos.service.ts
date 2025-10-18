import apiClient from '../lib/api-client';

export interface Video {
  id: string;
  title: string | null;
  description: string | null;
  s3_key: string;
  file_url: string;
  thumbnail_s3_key: string;
  thumbnail_url: string;
  duration: number | null;
  file_size: bigint;
  mime_type: string;
  codec: string | null;
  width: number | null;
  height: number | null;
  bitrate: number | null;
  date_taken: string | null;
  location: string | null;
  tags: string[];
  kids_tagged: string[];
  view_count: number;
  likes_count: number;
  comments_count: number;
  album_id: string | null;
  kid_id: string | null;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
  album?: {
    id: string;
    title: string;
  };
  kid?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

export interface UploadVideoDto {
  title?: string;
  description?: string;
  kidId?: string;
  albumId?: string;
}

export interface UpdateVideoDto {
  title?: string;
  description?: string;
  kids_tagged?: string[];
  tags?: string[];
}

export interface VideosListResponse {
  data: Video[];
  total: number;
  limit: number;
  offset: number;
}

class VideosService {
  /**
   * Upload a video with progress tracking
   */
  async upload(
    file: File,
    data: UploadVideoDto,
    onProgress?: (progress: number) => void
  ): Promise<Video> {
    const formData = new FormData();
    formData.append('video', file);
    
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.kidId) formData.append('kidId', data.kidId);
    if (data.albumId) formData.append('albumId', data.albumId);

    const response = await apiClient.post<Video>('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  }

  /**
   * Get all videos for a kid
   */
  async getByKid(kidId: string): Promise<Video[]> {
    const response = await apiClient.get<Video[]>(`/videos/kid/${kidId}`);
    return response.data;
  }

  /**
   * Get all videos in an album
   */
  async getByAlbum(albumId: string): Promise<Video[]> {
    const response = await apiClient.get<Video[]>(`/videos/album/${albumId}`);
    return response.data;
  }

  /**
   * Get a single video by ID
   */
  async getById(id: string): Promise<Video> {
    const response = await apiClient.get<Video>(`/videos/${id}`);
    return response.data;
  }

  /**
   * Update video metadata
   */
  async update(id: string, data: UpdateVideoDto): Promise<Video> {
    const response = await apiClient.put<Video>(`/videos/${id}`, data);
    return response.data;
  }

  /**
   * Soft delete a video
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/videos/${id}`);
  }

  /**
   * Permanently delete a video (admin only)
   */
  async permanentDelete(id: string): Promise<void> {
    await apiClient.delete(`/videos/${id}/permanent`);
  }

  /**
   * Format video duration from seconds to HH:MM:SS or MM:SS
   */
  formatDuration(seconds: number | null): string {
    if (!seconds) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Format file size to human-readable format
   */
  formatFileSize(bytes: bigint | number): string {
    const size = typeof bytes === 'bigint' ? Number(bytes) : bytes;
    
    if (size === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    
    return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}

export const videosService = new VideosService();
