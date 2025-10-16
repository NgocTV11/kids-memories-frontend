import apiClient from '../lib/api-client';

export interface Album {
  id: string;
  created_by: string;
  kid_id: string | null;
  title: string;
  description: string | null;
  cover_photo_url: string | null;
  privacy_level: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  photos_count?: number;
  kid?: {
    id: string;
    name: string;
    profile_picture: string | null;
  };
}

export interface CreateAlbumDto {
  title: string;
  description?: string;
  kid_id?: string;
  privacy_level?: 'private' | 'family' | 'public';
  tags?: string[];
}

export interface UpdateAlbumDto {
  title?: string;
  description?: string;
  kid_id?: string;
  privacy_level?: 'private' | 'family' | 'public';
  tags?: string[];
}

export interface ShareAlbumDto {
  password?: string;
  expires_at?: string;
}

export interface SharedAlbum extends Album {
  share_token: string;
  password_hash: string | null;
  expires_at: string | null;
}

class AlbumsService {
  /**
   * Get all albums
   */
  async getAll(kidId?: string): Promise<Album[]> {
    const params = kidId ? { kid_id: kidId } : {};
    const response = await apiClient.get<Album[]>('/albums', { params });
    return response.data;
  }

  /**
   * Get album by ID
   */
  async getById(albumId: string): Promise<Album> {
    const response = await apiClient.get<Album>(`/albums/${albumId}`);
    return response.data;
  }

  /**
   * Create new album
   */
  async create(data: CreateAlbumDto): Promise<Album> {
    const response = await apiClient.post<Album>('/albums', data);
    return response.data;
  }

  /**
   * Update album
   */
  async update(albumId: string, data: UpdateAlbumDto): Promise<Album> {
    const response = await apiClient.put<Album>(`/albums/${albumId}`, data);
    return response.data;
  }

  /**
   * Delete album
   */
  async delete(albumId: string): Promise<void> {
    await apiClient.delete(`/albums/${albumId}`);
  }

  /**
   * Share album
   */
  async share(albumId: string, data: ShareAlbumDto): Promise<SharedAlbum> {
    const response = await apiClient.post<SharedAlbum>(`/albums/${albumId}/share`, data);
    return response.data;
  }

  /**
   * Get shared album (public access)
   */
  async getSharedAlbum(token: string, password?: string): Promise<Album> {
    const params = password ? { password } : {};
    const response = await apiClient.get<Album>(`/albums/shared/${token}`, { params });
    return response.data;
  }

  /**
   * Remove share
   */
  async removeShare(albumId: string): Promise<void> {
    await apiClient.delete(`/albums/${albumId}/share`);
  }
}

export const albumsService = new AlbumsService();
