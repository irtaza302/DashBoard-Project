export const INPUT_CONSTANTS = {
  VALIDATION: {
    MESSAGES: {
      REQUIRED: 'This field is required',
      EMAIL: 'Please enter a valid email address',
      URL: 'Please enter a valid URL',
      PHONE: 'Please enter a valid phone number',
      DATE: 'Please enter a valid date'
    },
    PATTERNS: {
      PHONE: /^\+?[1-9]\d{1,14}$/
    },
    LIMITS: {
      YEAR: {
        MIN: 1900,
        MAX: new Date().getFullYear() + 10
      }
    }
  }
} as const; 