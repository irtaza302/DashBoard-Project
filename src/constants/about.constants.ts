export const ABOUT_CONSTANTS = {
  TITLE: 'About Gas App',
  SECTIONS: {
    MISSION: {
      TITLE: 'Our Mission',
      DESCRIPTION: 'Gas App is dedicated to revolutionizing the way we manage and monitor gas consumption. Our platform provides innovative solutions for both residential and commercial users.'
    },
    FEATURES: {
      TITLE: 'Key Features',
      LIST: [
        'Real-time gas consumption monitoring',
        'Advanced analytics and reporting',
        'User profile management',
        'Interactive dashboards',
        'Automated billing system'
      ]
    },
    CONTACT: {
      TITLE: 'Contact Information',
      EMAIL: 'support@gasapp.com',
      PHONE: '(555) 123-4567',
      ADDRESS: '123 Energy Street, Power City, PC 12345'
    }
  }
} as const; 