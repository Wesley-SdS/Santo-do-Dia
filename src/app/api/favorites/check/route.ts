import { NextResponse } from 'next/server';
import * as favoritesService from '@/features/favorites/favorites.service';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ favorited: false });
    }

    const { searchParams } = new URL(request.url);
    const saintId = searchParams.get('saintId');

    if (!saintId) {
      return NextResponse.json({ error: 'saintId obrigatório' }, { status: 400 });
    }

    const favorited = await favoritesService.isFavorited(session.user.id, saintId);
    return NextResponse.json({ favorited });
  } catch {
    return NextResponse.json({ favorited: false });
  }
}
