import { apiClient } from '../config';

export interface AboutStats {
  id: number;
  number: string;
  label: string;
  order: number;
}

export interface AboutTeam {
  id: number;
  name: string;
  role: string;
  description: string;
  icon: string;
  order: number;
}

export interface AboutValues {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export const aboutApi = {
  // Stats
  stats: {
    async getAll(): Promise<AboutStats[]> {
      const response = await apiClient.get<AboutStats[]>('/about/stats');
      return response.data;
    },
  },

  // Team
  team: {
    async getAll(): Promise<AboutTeam[]> {
      const response = await apiClient.get<AboutTeam[]>('/about/team');
      return response.data;
    },
  },

  // Values
  values: {
    async getAll(): Promise<AboutValues[]> {
      const response = await apiClient.get<AboutValues[]>('/about/values');
      return response.data;
    },
  },
};

