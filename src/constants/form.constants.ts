export const FORM_CONSTANTS = {
  INPUTS: {
    PLACEHOLDERS: {
      EMAIL: 'you@example.com',
      PORTFOLIO: 'https://your-portfolio.com',
      GITHUB: 'https://github.com/username'
    },
    VALIDATION: {
      FIELDS: {
        PERSONAL_INFO: ['name', 'email', 'contact', 'address'],
        EDUCATION: ['education.degree', 'education.completionYear'],
        ADDITIONAL_INFO: ['studentCard', 'expiryDate'],
        PROFESSIONAL_LINKS: ['portfolio', 'githubLink']
      }
    }
  },
  LAYOUT: {
    GRID: 'grid grid-cols-2 gap-4',
    SECTION: 'bg-gray-50 rounded-md p-6',
    CONTAINER: 'space-y-6'
  }
} as const; 