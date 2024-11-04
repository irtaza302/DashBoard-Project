export const CHART_CONSTANTS = {
  DIMENSIONS: {
    HEIGHT: {
      DEFAULT: 300,
      LARGE: 400
    },
    MARGINS: {
      TOP: 20,
      RIGHT: 30,
      BOTTOM: 5,
      LEFT: 20
    }
  },
  COLORS: {
    PRIMARY: '#6366F1',
    SECONDARY: '#8884d8',
    ACCENT: '#82ca9d',
    CHART_COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  },
  STYLING: {
    STROKE_WIDTH: 2,
    DOT_RADIUS: 4,
    ACTIVE_DOT_RADIUS: 6,
    GRID_DASH_ARRAY: '3 3',
    BAR_RADIUS: [4, 4, 0, 0],
    MAX_BAR_SIZE: 50
  },
  ANIMATION: {
    DURATION: 300,
    EASING: 'ease-in-out'
  }
} as const; 