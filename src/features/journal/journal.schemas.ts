import { z } from 'zod';

export const createJournalSchema = z.object({
  content: z
    .string()
    .min(10, 'Escreva ao menos 10 caracteres')
    .max(5000, 'Máximo de 5000 caracteres'),
  mood: z.enum(['GRATEFUL', 'REFLECTIVE', 'JOYFUL', 'STRUGGLING', 'PEACEFUL']),
  date: z.string().transform((val) => new Date(val)),
});

export const updateJournalSchema = z.object({
  content: z.string().min(10).max(5000).optional(),
  mood: z.enum(['GRATEFUL', 'REFLECTIVE', 'JOYFUL', 'STRUGGLING', 'PEACEFUL']).optional(),
});

export type CreateJournalFormData = z.input<typeof createJournalSchema>;
export type UpdateJournalFormData = z.input<typeof updateJournalSchema>;
