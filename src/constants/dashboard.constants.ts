export const DASHBOARD_CONSTANTS = {
  STATS: {
    CARDS: {
      TOTAL_PROFILES: {
        TITLE: 'Total Profiles',
        ICON_COLOR: 'text-indigo-600'
      },
      ACTIVE_STUDENTS: {
        TITLE: 'Active Students',
        ICON_COLOR: 'text-indigo-600'
      },
      COMPLETION_YEAR: {
        TITLE: 'Average Completion Year',
        ICON_COLOR: 'text-indigo-600'
      },
      DEGREE_TYPES: {
        TITLE: 'Degree Types',
        ICON_COLOR: 'text-indigo-600'
      }
    }
  },
  CHARTS: {
    PROFILE_STATS: {
      TITLE: 'Profile Statistics',
      HEIGHT: 'h-[300px]',
      BAR: {
        FILL: '#8884d8',
        NAME: 'Completion Year'
      }
    },
    DEGREE_DISTRIBUTION: {
      TITLE: 'Degree Distribution',
      HEIGHT: 'h-[300px]',
      PIE: {
        CENTER: '50%',
        RADIUS: 80,
        FILL: '#8884d8'
      }
    },
    EDUCATION_TRENDS: {
      TITLE: 'Graduation Trends',
      HEIGHT: 'h-[300px]',
      LINE: {
        STROKE_WIDTH: 2,
        DOT_RADIUS: 4,
        ACTIVE_DOT_RADIUS: 6
      }
    }
  },
  LOADING: {
    TEXT: 'Loading...',
    HEIGHT: 'h-64'
  }
} as const; 