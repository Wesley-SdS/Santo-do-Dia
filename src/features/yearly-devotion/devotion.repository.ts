import type { YearlyDevotion } from '@prisma/client';
import { prisma } from '@/lib/db';
import type { DevotionWithSaint } from './devotion.types';

export async function findDevotionByUserAndYear(
  userId: string,
  year: number,
): Promise<DevotionWithSaint | null> {
  return prisma.yearlyDevotion.findUnique({
    where: { userId_year: { userId, year } },
    include: { saint: true },
  });
}

export async function createDevotion(data: {
  userId: string;
  saintId: string;
  year: number;
  virtueFocus?: string;
}): Promise<YearlyDevotion> {
  return prisma.yearlyDevotion.create({ data });
}

export async function updateDevotionProgress(
  id: string,
  progress: object,
): Promise<YearlyDevotion> {
  return prisma.yearlyDevotion.update({
    where: { id },
    data: { progress: progress as never },
  });
}

export async function getUserDevotionHistory(userId: string): Promise<DevotionWithSaint[]> {
  return prisma.yearlyDevotion.findMany({
    where: { userId },
    include: { saint: true },
    orderBy: { year: 'desc' },
  });
}
