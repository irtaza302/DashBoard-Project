export const UI_CONSTANTS = {
  ICONS: {
    SIZE: {
      SM: 'w-4 h-4',
      DEFAULT: 'w-5 h-5',
      MD: 'w-6 h-6'
    }
  },
  SPACING: {
    PAGE: 'p-6 sm:p-8',
    SECTION: 'mb-8',
    CARD: 'p-6'
  },
  GRID: {
    COLS: {
      DEFAULT: 'grid-cols-1',
      MD: 'md:grid-cols-2',
      LG: 'lg:grid-cols-4'
    },
    GAP: 'gap-6'
  },
  TRANSITIONS: {
    DEFAULT: 'transition-all duration-200',
    HOVER: 'hover:opacity-80',
    COLORS: 'transition-colors duration-150'
  },
  ROUNDED: {
    DEFAULT: 'rounded-lg',
    FULL: 'rounded-full',
    XL: 'rounded-xl'
  },
  ANIMATIONS: {
    FADE_IN: 'animate-fadeIn',
    PULSE: 'animate-pulse',
  }
} as const; 