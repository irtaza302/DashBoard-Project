export const FORM_INPUTS = {
  TYPES: {
    TEXT: 'text',
    EMAIL: 'email',
    NUMBER: 'number',
    DATE: 'date',
    URL: 'url',
    TEL: 'tel'
  },
  LABELS: {
    PERSONAL_INFO: {
      NAME: 'Name',
      EMAIL: 'Email',
      CONTACT: 'Contact Number',
      ADDRESS: 'Address'
    },
    EDUCATION: {
      DEGREE: 'Degree',
      COMPLETION_YEAR: 'Completion Year'
    },
    ADDITIONAL_INFO: {
      STUDENT_CARD: 'Student Card Number',
      EXPIRY_DATE: 'Expiry Date'
    },
    PROFESSIONAL_LINKS: {
      PORTFOLIO: 'Portfolio URL',
      GITHUB: 'GitHub Profile'
    }
  },
  PLACEHOLDERS: {
    EMAIL: 'you@example.com',
    PORTFOLIO: 'https://your-portfolio.com',
    GITHUB: 'https://github.com/username',
    YEAR: new Date().getFullYear().toString()
  }
} as const;

export type InputType = keyof typeof FORM_INPUTS.TYPES; 