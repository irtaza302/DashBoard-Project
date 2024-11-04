export const VALIDATION_CONSTANTS = {
  MESSAGES: {
    REQUIRED: 'This field is required',
    EMAIL: 'Please enter a valid email address',
    PASSWORD: {
      MIN_LENGTH: 'Password must be at least 6 characters',
      REQUIRED: 'Password is required'
    },
    PHONE: 'Please enter a valid phone number',
    URL: 'Please enter a valid URL',
    DATE: 'Please enter a valid date',
    YEAR: {
      MIN: 'Year must be after 1900',
      MAX: 'Year cannot be more than 10 years in the future'
    }
  },
  PATTERNS: {
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  },
  LIMITS: {
    PASSWORD_MIN_LENGTH: 6,
    YEAR: {
      MIN: 1900,
      MAX: new Date().getFullYear() + 10
    }
  }
} as const; 