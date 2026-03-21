import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const month = parseInt(searchParams.get('month') ?? '1', 10);
  const year = parseInt(searchParams.get('year') ?? new Date().getFullYear().toString(), 10);

  if (month < 1 || month > 12) {
    return NextResponse.json({ error: 'Mês inválido' }, { status: 400 });
  }

  const saints = await prisma.saint.findMany({
    where: { feastMonth: month },
    select: {
      id: true,
      name: true,
      slug: true,
      feastDay: true,
      feastMonth: true,
    },
    orderBy: [{ feastDay: 'asc' }, { name: 'asc' }],
  });

  return NextResponse.json({ saints, month, year });
}
