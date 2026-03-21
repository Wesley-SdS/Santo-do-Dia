import { NextResponse } from 'next/server';
import { createJournalSchema } from '@/features/journal';
import * as journalService from '@/features/journal/journal.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.journal' });

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') ?? 1);

    const result = await journalService.getUserEntries(session.user.id, page);
    return NextResponse.json(result);
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
    const data = createJournalSchema.parse(body);

    const entry = await journalService.createEntry({
      userId: session.user.id,
      yearlyDevotionId: '',
      content: data.content,
      mood: data.mood,
      date: data.date,
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
