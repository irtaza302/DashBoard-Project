export const API_CONSTANTS = {
  BASE_URL: {
    DEVELOPMENT: 'http://localhost:5000/api',
    PRODUCTION: process.env.API_URL || 'https://dash-board-project-api.vercel.app/api'
  },
  ENDPOINTS: {
    PROFILES: '/profiles',
  },
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const; 