import { z } from 'zod';

export const volumeSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must not exceed 100 characters' })
    .trim(),
    
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format. Use a valid ISO date.' }),

  article: z
    .string()
    .min(1, { message: 'Article is required' })
    .regex(/^[A-Za-z0-9-]+$/, { message: 'Article must be alphanumeric or hyphenated' }),

  year_volume: z
    .string()
    .regex(/^\d{4}$/, { message: 'Year volume must be a 4-digit year' })
    .refine((val) => {
      const year = parseInt(val, 10);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }, { message: 'Year volume must be between 1900 and the current year' }),
    
});