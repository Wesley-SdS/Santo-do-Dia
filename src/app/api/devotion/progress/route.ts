import { NextResponse } from 'next/server';
import * as devotionService from '@/features/yearly-devotion/devotion.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.devotion.progress' });

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const devotion = await devotionService.getCurrentDevotion(session.user.id);
    if (!devotion) {
      return NextResponse.json({ devotion: null });
    }

    return NextResponse.json({ devotion });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { action, value } = body as { action: string; value: number };

    switch (action) {
      case 'markWeek':
        await devotionService.markWeekAsRead(session.user.id, value);
        break;
      case 'completeChallenge':
        await devotionService.completeChallenge(session.user.id, value);
        break;
      case 'completeNovena':
        await devotionService.completeNovena(session.user.id);
        break;
      default:
        return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
