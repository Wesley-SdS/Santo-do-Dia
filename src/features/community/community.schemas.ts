import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(3, 'Nome deve ter ao menos 3 caracteres').max(50),
});

export const joinRoomSchema = z.object({
  code: z.string().length(6, 'Código deve ter 6 caracteres').toUpperCase(),
});
