import { NextResponse } from 'next/server';
import { updateJournalSchema } from '@/features/journal';
import * as journalService from '@/features/journal/journal.service';
import { auth } from '@/lib/auth';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.journal' });

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const data = updateJournalSchema.parse(body);

    const entry = await journalService.updateEntry(session.user.id, id, data);
    return NextResponse.json({ entry });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = await context.params;
    await journalService.deleteEntry(session.user.id, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
