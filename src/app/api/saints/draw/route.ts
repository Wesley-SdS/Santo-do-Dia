import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    const count = await prisma.saint.count();

    if (count === 0) {
      return NextResponse.json({ error: 'Nenhum santo disponível para sorteio' }, { status: 404 });
    }

    const skip = Math.floor(Math.random() * count);
    const saints = await prisma.saint.findMany({
      skip,
      take: 1,
      select: {
        id: true,
        name: true,
        slug: true,
        feastMonth: true,
        feastDay: true,
        category: true,
        biographyShort: true,
        imageUrl: true,
        country: true,
      },
    });

    const saint = saints[0];
    if (!saint) {
      return NextResponse.json({ error: 'Erro no sorteio' }, { status: 500 });
    }

    return NextResponse.json({ saint });
  } catch {
    return NextResponse.json({ error: 'Erro ao sortear santo' }, { status: 500 });
  }
}
