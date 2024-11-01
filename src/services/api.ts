import axios from 'axios';
import { ProfileFormData } from '../schemas/profile.schema';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
  headers: API_CONFIG.HEADERS,
  timeout: API_CONFIG.TIMEOUT
});

export const profileApi = {
  create: async (data: ProfileFormData) => {
    const response = await api.post('/api/profiles', data);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/api/profiles');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/api/profiles/${id}`);
    return response.data;
  },
  
  update: async (id: string, data: Partial<ProfileFormData>) => {
    const response = await api.put(`/api/profiles/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/api/profiles/${id}`);
  }
}; 