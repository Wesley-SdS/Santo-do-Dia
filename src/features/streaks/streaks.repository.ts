import type { Prisma, Streak } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function findStreakByUser(userId: string): Promise<Streak | null> {
  return prisma.streak.findUnique({ where: { userId } });
}

export async function upsertStreak(
  userId: string,
  data: {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    achievements: Prisma.InputJsonValue[];
  },
): Promise<Streak> {
  return prisma.streak.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
}

export async function countUserAmensOnDate(userId: string, date: Date): Promise<number> {
  return prisma.amen.count({ where: { userId, date } });
}
