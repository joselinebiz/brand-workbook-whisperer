import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

export const emailSchema = z.string()
  .trim()
  .email('Invalid email address')
  .max(255, 'Email too long');

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});
