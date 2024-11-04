export const ANIMATION_CONSTANTS = {
  DURATIONS: {
    FAST: 150,
    DEFAULT: 200,
    SLOW: 300
  },
  VARIANTS: {
    FADE_IN: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    SLIDE_IN: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 }
    },
    SCALE: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    }
  },
  TRANSITIONS: {
    EASE_IN_OUT: 'ease-in-out',
    LINEAR: 'linear',
    EASE: 'ease'
  }
} as const; 