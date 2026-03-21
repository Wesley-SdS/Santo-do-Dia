import { NextResponse } from 'next/server';
import { joinRoomSchema } from '@/features/community';
import * as communityService from '@/features/community/community.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.community.join' });

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = joinRoomSchema.parse(body);

    const room = await communityService.joinRoom(code, session.user.id);
    return NextResponse.json({ room });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
