export const ERROR_CONSTANTS = {
  MESSAGES: {
    GENERIC: 'An unexpected error occurred',
    NETWORK: 'Network error occurred',
    TIMEOUT: 'Request timed out',
    NOT_FOUND: 'Resource not found',
    SERVER: 'Server error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    VALIDATION: 'Validation error occurred'
  },
  STATUS_CODES: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TIMEOUT: 408,
    SERVER_ERROR: 500
  },
  BOUNDARIES: {
    FALLBACK_MESSAGE: 'Something went wrong',
    RETRY_BUTTON_TEXT: 'Retry'
  }
} as const; 