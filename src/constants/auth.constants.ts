export const AUTH_MESSAGES = {
  WELCOME_BACK: 'Welcome back',
  LOGIN_SUBTITLE: 'Please enter your credentials to access your account',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Invalid email format',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN: 'Password must be at least 6 characters',
  FORGOT_PASSWORD: 'Forgot password?',
  LOGIN: 'Login',
  NO_ACCOUNT: "Don't have an account?",
  SIGN_UP: 'Sign up'
} as const;

export const AUTH_CONFIG = {
  API_ENDPOINTS: {
    LOGIN: '/api/auth/login',
  },
  PASSWORD_MIN_LENGTH: 6
} as const; 