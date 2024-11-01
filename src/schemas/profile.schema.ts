import { z } from 'zod';
import { INPUT_CONSTANTS } from '../constants/input.constants';

const { VALIDATION } = INPUT_CONSTANTS;

export const profileSchema = z.object({
  name: z.string().min(1, VALIDATION.MESSAGES.REQUIRED),
  email: z.string().email(VALIDATION.MESSAGES.EMAIL),
  contact: z.string().regex(VALIDATION.PATTERNS.PHONE, VALIDATION.MESSAGES.PHONE),
  address: z.string().min(1, VALIDATION.MESSAGES.REQUIRED),
  education: z.object({
    degree: z.string().min(1, VALIDATION.MESSAGES.REQUIRED),
    completionYear: z.coerce.number()
      .min(VALIDATION.LIMITS.YEAR.MIN)
      .max(VALIDATION.LIMITS.YEAR.MAX)
  }),
  studentCard: z.string().min(1, VALIDATION.MESSAGES.REQUIRED),
  expiryDate: z.string().min(1, VALIDATION.MESSAGES.REQUIRED),
  portfolio: z.string().url(VALIDATION.MESSAGES.URL).optional().or(z.literal('')),
  githubLink: z.string().url(VALIDATION.MESSAGES.URL).optional().or(z.literal(''))
});

export type ProfileFormData = z.infer<typeof profileSchema> & {
  id?: string;
  _id?: string;
}; 