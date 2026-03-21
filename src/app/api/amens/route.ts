import { NextResponse } from 'next/server';
import { sendAmenSchema } from '@/features/favorites';
import * as favoritesService from '@/features/favorites/favorites.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.amens' });

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { saintId } = sendAmenSchema.parse(body);

    const result = await favoritesService.sendAmen(session.user.id, saintId);
    return NextResponse.json(result);
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const saintId = searchParams.get('saintId');

    if (!saintId) {
      return NextResponse.json({ error: 'saintId obrigatório' }, { status: 400 });
    }

    const session = await auth();
    const result = await favoritesService.getAmenCount(saintId, session?.user?.id);
    return NextResponse.json(result);
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
