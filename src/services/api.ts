import axios from 'axios';
import { ProfileFormData } from '../schemas/profile.schema';
import { API_CONFIG } from '../config/api.config';

// Get the base URL based on environment
const baseURL = process.env.NODE_ENV === 'production' 
  ? '' // Empty string for production (will use relative paths)
  : 'http://localhost:5000';

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
  error => {
    console.error('API Error:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
);

export const profileApi = {
  create: async (data: ProfileFormData) => {
    try {
      const response = await api.post('/api/profiles', data);
      return response.data;
    } catch (error) {
      console.error('Create Profile Error:', error);
      throw error;
    }
  },
  
  getAll: async () => {
    try {
      const response = await api.get('/api/profiles');
      return response.data;
    } catch (error) {
      console.error('Get Profiles Error:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: Partial<ProfileFormData>) => {
    try {
      const response = await api.put(`/api/profiles/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      await api.delete(`/api/profiles/${id}`);
    } catch (error) {
      console.error('Delete Profile Error:', error);
      throw error;
    }
  }
}; 