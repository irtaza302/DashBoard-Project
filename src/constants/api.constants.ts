export const API_CONSTANTS = {
  BASE_URL: {
    DEVELOPMENT: 'http://localhost:5000/api',
    PRODUCTION: 'https://dash-board-project-ten.vercel.app/api'
  },
  ENDPOINTS: {
    PROFILES: '/profiles',
  },
  TIMEOUT: 10000
} as const; 