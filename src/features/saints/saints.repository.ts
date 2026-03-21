import { prisma } from '@/lib/db';
import type { Saint, SaintCategory } from '@prisma/client';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from './saints.constants';
import type { SaintListItem, SaintSearchParams } from './saints.types';

export async function findSaintById(id: string): Promise<Saint | null> {
  return prisma.saint.findUnique({ where: { id } });
}

export async function findSaintBySlug(slug: string): Promise<Saint | null> {
  return prisma.saint.findUnique({ where: { slug } });
}

export async function findSaintsByFeastDay(month: number, day: number): Promise<Saint[]> {
  return prisma.saint.findMany({
    where: { feastMonth: month, feastDay: day },
    orderBy: { name: 'asc' },
  });
}

export async function searchSaints(params: SaintSearchParams): Promise<{
  saints: SaintListItem[];
  total: number;
}> {
  const page = params.page ?? 1;
  const pageSize = Math.min(params.pageSize ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
  const skip = (page - 1) * pageSize;

  const where: Record<string, unknown> = {};

  if (params.query) {
    where.OR = [
      { name: { contains: params.query, mode: 'insensitive' } },
      { biographyShort: { contains: params.query, mode: 'insensitive' } },
      { patronage: { has: params.query } },
    ];
  }

  if (params.category) {
    where.category = params.category as SaintCategory;
  }

  if (params.country) {
    where.country = { contains: params.country, mode: 'insensitive' };
  }

  if (params.century) {
    where.century = params.century;
  }

  const [saints, total] = await Promise.all([
    prisma.saint.findMany({
      where,
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
      skip,
      take: pageSize,
      orderBy: { name: 'asc' },
    }),
    prisma.saint.count({ where }),
  ]);

  return { saints, total };
}

export async function findAllSaintSlugs(): Promise<string[]> {
  const saints = await prisma.saint.findMany({ select: { slug: true } });
  return saints.map((s) => s.slug);
}

export async function getRandomSaint(): Promise<Saint | null> {
  const count = await prisma.saint.count();
  if (count === 0) return null;
  const skip = Math.floor(Math.random() * count);
  const saints = await prisma.saint.findMany({ skip, take: 1 });
  return saints[0] ?? null;
}

export async function countSaints(): Promise<number> {
  return prisma.saint.count();
}
