import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  contact: z.string()
    .min(6, 'Phone number is required')
    .refine((value) => {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      return digitsOnly.length >= 6 && digitsOnly.length <= 15;
    }, 'Phone number must be between 6 and 15 digits'),
  address: z.string().min(1, 'Address is required'),
  education: z.object({
    degree: z.string().min(1, 'Degree is required'),
    completionYear: z.string().or(z.number()).pipe(
      z.coerce.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future')
    )
  }),
  expiryDate: z.coerce.date(),
  studentCard: z.string().url('Invalid URL'),
  portfolio: z.string().url('Invalid URL'),
  githubLink: z.string().url('Invalid URL')
});

export type ProfileFormData = z.infer<typeof profileSchema> & {
  id?: string;
}; 