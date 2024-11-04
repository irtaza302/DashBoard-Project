export const STYLES_CONSTANTS = {
  COLORS: {
    PRIMARY: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1'
    },
    GRAY: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    },
    ERROR: {
      500: '#ef4444',
      600: '#dc2626'
    },
    SUCCESS: {
      500: '#22c55e',
      600: '#16a34a'
    }
  },
  SPACING: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem'
  },
  BORDER_RADIUS: {
    SM: '0.125rem',
    DEFAULT: '0.25rem',
    MD: '0.375rem',
    LG: '0.5rem',
    XL: '0.75rem',
    '2XL': '1rem',
    FULL: '9999px'
  },
  SHADOWS: {
    SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  }
} as const; 