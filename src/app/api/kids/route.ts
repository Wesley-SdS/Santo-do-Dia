import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.kids' });

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { action, pin } = body as { action: string; pin?: string };

    if (action === 'setPin' && pin) {
      const hashed = await bcrypt.hash(pin, 10);
      await prisma.user.update({
        where: { id: session.user.id },
        data: { kidsModePin: hashed },
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'verifyPin' && pin) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { kidsModePin: true },
      });
      if (!user?.kidsModePin) {
        return NextResponse.json({ valid: false });
      }
      const valid = await bcrypt.compare(pin, user.kidsModePin);
      return NextResponse.json({ valid });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
