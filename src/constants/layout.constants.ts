export const LAYOUT_CONSTANTS = {
  SIDEBAR: {
    EXPANDED_WIDTH: 256,
    COLLAPSED_WIDTH: 80,
    ANIMATION: {
      INITIAL_X: -20,
      DURATION: 200
    }
  },
  CONTAINER: {
    MAX_WIDTH: '1280px',
    PADDING: '2rem'
  },
  CHART: {
    HEIGHT: '300px',
    MARGINS: {
      TOP: 5,
      RIGHT: 30,
      LEFT: 20,
      BOTTOM: 5
    }
  }
} as const; 