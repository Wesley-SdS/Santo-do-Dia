import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { handleError } from '@/lib/errors/handler';
import { createChildLogger } from '@/lib/logger';

const logger = createChildLogger({ module: 'api.saints.map' });

export async function GET() {
  try {
    const saints = await prisma.saint.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        imageUrl: true,
        latitude: true,
        longitude: true,
        country: true,
        feastMonth: true,
        feastDay: true,
      },
    });

    return NextResponse.json({ saints });
  } catch (error) {
    const { statusCode, message } = handleError(error as Error, logger);
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
