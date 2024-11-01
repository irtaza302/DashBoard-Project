import axios, { AxiosError } from 'axios';
import { ProfileFormData } from '../schemas/profile.schema';
import { toast } from 'react-hot-toast';
import { API_CONFIG } from '../config/api.config';

// Get the base URL based on environment
const baseURL = process.env.NODE_ENV === 'production' 
  ? '/api' // Use relative path for production
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: API_CONFIG.HEADERS,
  timeout: 30000 // Increased timeout to 30 seconds
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      toast.error('Resource not found');
    } else if (error.response?.status === 500) {
      toast.error('Server error occurred');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out');
    } else {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

export const profileApi = {
  create: async (data: Omit<ProfileFormData, 'id' | '_id'>): Promise<ProfileFormData> => {
    try {
      const response = await api.post<ProfileFormData>('/api/profiles', data);
      return response.data;
    } catch (error) {
      console.error('Create Profile Error:', error);
      throw error;
    }
  },
  
  getAll: async (): Promise<ProfileFormData[]> => {
    try {
      const response = await api.get<ProfileFormData[]>('/api/profiles');
      return response.data;
    } catch (error) {
      console.error('Get Profiles Error:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: Partial<Omit<ProfileFormData, 'id' | '_id'>>): Promise<ProfileFormData> => {
    try {
      const response = await api.put<ProfileFormData>(`/api/profiles/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/profiles/${id}`);
    } catch (error) {
      console.error('Delete Profile Error:', error);
      throw error;
    }
  }
}; 