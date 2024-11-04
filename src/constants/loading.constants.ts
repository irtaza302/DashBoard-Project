export const LOADING_CONSTANTS = {
  STATES: {
    INITIAL: 'initial',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  },
  MESSAGES: {
    DEFAULT: 'Loading...',
    SAVING: 'Saving...',
    UPDATING: 'Updating...',
    DELETING: 'Deleting...',
    PROCESSING: 'Processing...'
  },
  SPINNER: {
    SIZES: {
      SM: 'sm',
      MD: 'md',
      LG: 'lg'
    },
    COLORS: {
      PRIMARY: 'primary',
      SECONDARY: 'secondary',
      WHITE: 'white'
    }
  }
} as const; 