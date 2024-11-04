export const API_CONSTANTS = {
  BASE_URL: {
    DEVELOPMENT: 'http://localhost:5000/api',
    PRODUCTION: '/api'
  },
  ENDPOINTS: {
    PROFILES: {
      BASE: '/profiles',
      BY_ID: (id: string) => `/profiles/${id}`
    }
  },
  TIMEOUT: 10000
} as const; 