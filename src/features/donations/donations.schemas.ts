import { z } from 'zod';
import { MIN_DONATION_CENTS, MAX_DONATION_CENTS } from '@/constants';

export const createDonationSchema = z.object({
  amount: z
    .number()
    .min(1, 'Valor mínimo é R$ 1,00')
    .max(10000, 'Valor máximo é R$ 10.000,00')
    .transform((val) => Math.round(val * 100)),
  displayName: z.string().max(50).optional(),
  anonymous: z.boolean().default(true),
});

export type CreateDonationFormData = z.infer<typeof createDonationSchema>;

export const pixWebhookSchema = z.object({
  pix: z.array(
    z.object({
      endToEndId: z.string(),
      txid: z.string(),
      valor: z.string(),
      horario: z.string(),
    }),
  ),
});
