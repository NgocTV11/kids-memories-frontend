import apiClient from '@/lib/api-client';

export interface Stats {
  kids: number;
  albums: number;
  photos: number;
  milestones: number;
  families: number;
}

class StatsService {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<Stats> {
    const response = await apiClient.get<Stats>('/stats');
    return response.data;
  }
}

export const statsService = new StatsService();
