import { NextResponse } from 'next/server';
import * as communityService from '@/features/community/community.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.community.draw' });

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { roomId } = body as { roomId: string };

    if (!roomId) {
      return NextResponse.json({ error: 'roomId obrigatório' }, { status: 400 });
    }

    const saint = await communityService.drawSaintInRoom(roomId, session.user.id);
    return NextResponse.json({ saint });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
