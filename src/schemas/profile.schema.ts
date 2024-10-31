import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  contact: z.string().min(1, 'Contact is required'),
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