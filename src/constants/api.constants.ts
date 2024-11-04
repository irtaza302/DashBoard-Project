export const API_CONSTANTS = {
  BASE_URL: {
    DEVELOPMENT: 'http://localhost:5000/api',
    PRODUCTION: '/api'
  },
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh'
    },
    PROFILES: {
      BASE: '/profiles',
      BY_ID: (id: string) => `/profiles/${id}`
    }
  },
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
    AUTHORIZATION: 'Bearer'
  },
  TIMEOUT: 10000,
  RETRY: {
    COUNT: 3,
    DELAY: 1000
  }
} as const; 