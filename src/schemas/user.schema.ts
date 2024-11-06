import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  role: z.enum(['admin', 'user']),
  isActive: z.boolean().default(true),
});

export type UserFormData = z.infer<typeof userSchema>; 