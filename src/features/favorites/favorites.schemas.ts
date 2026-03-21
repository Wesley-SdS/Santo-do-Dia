import { z } from 'zod';

export const toggleFavoriteSchema = z.object({
  saintId: z.string().uuid('ID do santo inválido'),
});

export const sendAmenSchema = z.object({
  saintId: z.string().uuid('ID do santo inválido'),
});
