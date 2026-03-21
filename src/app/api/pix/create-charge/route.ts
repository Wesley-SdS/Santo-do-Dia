import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createDonationSchema } from '@/features/donations/donations.schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createDonationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const amountCents = parsed.data.amount;
    const txid = generateTxid();

    // In production, this would call the PSP API to create a real Pix charge
    // For now, return a mock response
    const pixCopyPaste = `00020126580014br.gov.bcb.pix0136${txid}5204000053039865406${(amountCents / 100).toFixed(2)}5802BR5913SantoDia FSJPII6008Brasilia62070503***6304`;

    return NextResponse.json(
      {
        txid,
        pixCopyPaste,
        qrCodeBase64: '',
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar cobrança Pix' }, { status: 500 });
  }
}

function generateTxid(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 35; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
