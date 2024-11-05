export const API_CONSTANTS = {
  BASE_URL: {
    DEVELOPMENT: 'http://localhost:5000/api',
    PRODUCTION: 'https://dash-board-project-uoxr508z7-irtaza-maliks-projects.vercel.app/api'
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