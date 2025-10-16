import apiClient from '../lib/api-client';

export interface Kid {
  id: string;
  created_by: string;
  name: string;
  date_of_birth: string;
  gender: string;
  profile_picture: string | null;
  bio: string | null;
  growth_data: GrowthData[];
  created_at: string;
  updated_at: string;
  age?: string;
}

export interface GrowthData {
  date: string;
  height?: number;
  weight?: number;
  note?: string;
}

export interface CreateKidDto {
  name: string;
  date_of_birth: string;
  gender: string;
  profile_picture?: string;
  bio?: string;
}

export interface UpdateKidDto {
  name?: string;
  date_of_birth?: string;
  gender?: string;
  profile_picture?: string;
  bio?: string;
}

export interface AddGrowthDataDto {
  date: string;
  height?: number;
  weight?: number;
  note?: string;
}

class KidsService {
  /**
   * Get all kids
   */
  async getAll(): Promise<Kid[]> {
    const response = await apiClient.get<Kid[]>('/kids');
    return response.data;
  }

  /**
   * Get kid by ID
   */
  async getById(kidId: string): Promise<Kid> {
    const response = await apiClient.get<Kid>(`/kids/${kidId}`);
    return response.data;
  }

  /**
   * Create new kid
   */
  async create(data: CreateKidDto): Promise<Kid> {
    const response = await apiClient.post<Kid>('/kids', data);
    return response.data;
  }

  /**
   * Update kid
   */
  async update(kidId: string, data: UpdateKidDto): Promise<Kid> {
    const response = await apiClient.put<Kid>(`/kids/${kidId}`, data);
    return response.data;
  }

  /**
   * Delete kid
   */
  async delete(kidId: string): Promise<void> {
    await apiClient.delete(`/kids/${kidId}`);
  }

  /**
   * Add growth data
   */
  async addGrowthData(kidId: string, data: AddGrowthDataDto): Promise<Kid> {
    const response = await apiClient.post<Kid>(`/kids/${kidId}/growth`, data);
    return response.data;
  }

  /**
   * Get growth history
   */
  async getGrowthHistory(kidId: string): Promise<GrowthData[]> {
    const response = await apiClient.get<GrowthData[]>(`/kids/${kidId}/growth`);
    return response.data;
  }
}

export const kidsService = new KidsService();
