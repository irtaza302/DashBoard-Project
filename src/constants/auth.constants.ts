export const AUTH_CONSTANTS = {
  ROUTES: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    DASHBOARD: '/dashboard',
  },
  
  MESSAGES: {
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Login failed',
    LOGIN_ERROR: 'Invalid credentials',
    INVALID_CREDENTIALS: 'Invalid email or password',
    NETWORK_ERROR: 'Network error. Please try again',
    SESSION_EXPIRED: 'Your session has expired. Please login again',
    LOGOUT_SUCCESS: 'Logged out successfully'
  },

  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
    PASSWORD_PATTERN: 'Password must contain at least one number and one letter',
  },

  SOCIAL_AUTH: {
    GOOGLE: {
      PROVIDER: 'google',
      ICON: '/icons/google.svg',
      LABEL: 'Continue with Google',
    },
    GITHUB: {
      PROVIDER: 'github',
      ICON: '/icons/github.svg',
      LABEL: 'Continue with GitHub',
    },
  },

  UI: {
    LOADING_TEXT: 'Signing in...',
    BUTTON_TEXT: 'Sign in',
    REMEMBER_ME: 'Remember me',
    FORGOT_PASSWORD: 'Forgot password?',
    SIGNUP_PROMPT: "Don't have an account?",
    SIGNUP_LINK: 'Sign up now',
    WELCOME_TITLE: 'Welcome Back!',
    WELCOME_SUBTITLE: 'Sign in to access your dashboard and manage your profiles efficiently',
    FORM_TITLE: 'Sign in',
    FORM_SUBTITLE: 'Enter your credentials to access your account',
    OR_CONTINUE_WITH: 'Or continue with',
  },

  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    REMEMBER_ME: 'remember_me',
  },

  API_ENDPOINTS: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    VERIFY_TOKEN: '/api/auth/verify-token',
  },

  TOKEN: {
    EXPIRY_TIME: 3600, // in seconds
    REFRESH_THRESHOLD: 300, // refresh token 5 minutes before expiry
  },

  DEFAULT_ADMIN: {
    EMAIL: 'tester@test.com',
    PASSWORD: 'aCd3@W62'
  }
} as const;

export const SECURITY_FEATURES = [
  {
    icon: 'shield',
    label: 'Secure Login',
    description: '256-bit encryption',
  },
  {
    icon: 'clock',
    label: '24/7 Support',
    description: 'Round the clock assistance',
  },
  {
    icon: 'lock',
    label: 'Privacy Protected',
    description: 'GDPR Compliant',
  },
] as const;

export const FORM_FIELDS = {
  EMAIL: {
    name: 'email',
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    autoComplete: 'email',
  },
  PASSWORD: {
    name: 'password',
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    autoComplete: 'current-password',
  },
} as const; 