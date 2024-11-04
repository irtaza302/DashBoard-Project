export const LAYOUT_SIZES_CONSTANTS = {
  CONTAINER: {
    MAX_WIDTH: '1280px',
    PADDING: {
      SM: '1rem',
      MD: '2rem',
      LG: '4rem'
    }
  },
  SIDEBAR: {
    WIDTH: {
      COLLAPSED: '80px',
      EXPANDED: '256px'
    }
  },
  HEADER: {
    HEIGHT: '64px'
  },
  FOOTER: {
    HEIGHT: '48px'
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
  }
} as const; 