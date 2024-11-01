import { ProfileFormData } from '../schemas/profile.schema';
import { Path } from 'react-hook-form';
import { STEP_ORDER } from './profile-steps.constants';

type StepKeys = typeof STEP_ORDER[number];

type ValidationFields = {
  [K in StepKeys]: Path<ProfileFormData>[]
};

export const VALIDATION_FIELDS: ValidationFields = {
  PERSONAL_INFO: ['name', 'email', 'contact', 'address'],
  EDUCATION: ['education.degree', 'education.completionYear'],
  ADDITIONAL_INFO: ['studentCard', 'expiryDate'],
  PROFESSIONAL_LINKS: ['portfolio', 'githubLink']
}; 