import type { JournalMood } from '@prisma/client';
import { prisma } from '@/lib/db';
import type { JournalEntryWithDevotion } from './journal.types';

export async function createEntry(data: {
  userId: string;
  yearlyDevotionId: string;
  content: string;
  mood: JournalMood;
  date: Date;
}) {
  return prisma.journalEntry.create({ data });
}

export async function findEntryById(id: string) {
  return prisma.journalEntry.findUnique({ where: { id } });
}

export async function updateEntry(id: string, data: { content?: string; mood?: JournalMood }) {
  return prisma.journalEntry.update({ where: { id }, data });
}

export async function deleteEntry(id: string) {
  return prisma.journalEntry.delete({ where: { id } });
}

export async function getUserEntries(
  userId: string,
  limit = 30,
  offset = 0,
): Promise<JournalEntryWithDevotion[]> {
  return prisma.journalEntry.findMany({
    where: { userId },
    include: {
      yearlyDevotion: {
        select: { saint: { select: { name: true, slug: true } } },
      },
    },
    orderBy: { date: 'desc' },
    take: limit,
    skip: offset,
  });
}

export async function countUserEntries(userId: string): Promise<number> {
  return prisma.journalEntry.count({ where: { userId } });
}

export async function findEntryByDate(userId: string, date: Date) {
  return prisma.journalEntry.findFirst({
    where: { userId, date },
  });
}
