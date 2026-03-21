import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { pixWebhookSchema } from '@/features/donations/donations.schemas';

export async function POST(request: NextRequest) {
  try {
    // In production: validate webhook signature (HMAC)
    const webhookSecret = request.headers.get('x-webhook-secret');
    if (webhookSecret !== process.env.PIX_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = pixWebhookSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Process each Pix payment
    for (const pix of parsed.data.pix) {
      // In production: update donation status in database
      console.log(`Pix received: txid=${pix.txid}, amount=${pix.valor}, e2eid=${pix.endToEndId}`);
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
