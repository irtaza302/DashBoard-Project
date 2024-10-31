export const PROFILE_STEPS = {
  PERSONAL_INFO: {
    title: 'Personal Information',
    description: 'Enter your basic details'
  },
  EDUCATION: {
    title: 'Education Details',
    description: 'Tell us about your education'
  },
  ADDITIONAL_INFO: {
    title: 'Additional Information',
    description: 'Provide additional details'
  },
  PROFESSIONAL_LINKS: {
    title: 'Professional Links',
    description: 'Add your professional profiles'
  }
} as const;

export const STEP_ORDER = [
  'PERSONAL_INFO',
  'EDUCATION',
  'ADDITIONAL_INFO',
  'PROFESSIONAL_LINKS'
] as const; 