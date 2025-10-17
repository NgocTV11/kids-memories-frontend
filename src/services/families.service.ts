import apiClient from '../lib/api-client';

export interface Family {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  owner?: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
  };
  members?: FamilyMember[];
  _count?: {
    members: number;
    kids: number;
    albums: number;
  };
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  status: 'pending' | 'active' | 'rejected';
  joined_at: string;
  user?: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
    role: string;
  };
}

export interface CreateFamilyDto {
  name: string;
  description?: string;
  avatar_url?: string;
}

export interface UpdateFamilyDto {
  name?: string;
  description?: string;
  avatar_url?: string;
}

export interface InviteMemberDto {
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  relationship?: string;
}

class FamiliesService {
  /**
   * Get all families for current user
   */
  async getAll(): Promise<Family[]> {
    const response = await apiClient.get<Family[]>('/families');
    return response.data;
  }

  /**
   * Get one family by ID
   */
  async getById(id: string): Promise<Family> {
    const response = await apiClient.get<Family>(`/families/${id}`);
    return response.data;
  }

  /**
   * Create new family
   */
  async create(data: CreateFamilyDto): Promise<Family> {
    const response = await apiClient.post<Family>('/families', data);
    return response.data;
  }

  /**
   * Update family
   */
  async update(id: string, data: UpdateFamilyDto): Promise<Family> {
    const response = await apiClient.put<Family>(`/families/${id}`, data);
    return response.data;
  }

  /**
   * Delete family
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/families/${id}`);
  }

  /**
   * Invite member to family
   */
  async inviteMember(familyId: string, data: InviteMemberDto): Promise<FamilyMember> {
    const response = await apiClient.post<FamilyMember>(`/families/${familyId}/members`, data);
    return response.data;
  }

  /**
   * Accept invitation
   */
  async acceptInvitation(familyId: string): Promise<FamilyMember> {
    const response = await apiClient.post<FamilyMember>(`/families/${familyId}/accept`);
    return response.data;
  }

  /**
   * Remove member from family
   */
  async removeMember(familyId: string, memberId: string): Promise<void> {
    await apiClient.delete(`/families/${familyId}/members/${memberId}`);
  }

  /**
   * Leave family
   */
  async leaveFamily(familyId: string): Promise<void> {
    await apiClient.post(`/families/${familyId}/leave`);
  }

  /**
   * Get my pending invitations
   */
  async getMyInvitations(): Promise<any[]> {
    const response = await apiClient.get('/families/invitations');
    return response.data;
  }
}

export const familiesService = new FamiliesService();
