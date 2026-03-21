import { getCurrentDevotion } from '@/features/yearly-devotion/devotion.service';
import { NotFoundError, UnauthorizedError, ValidationError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import * as journalRepo from './journal.repository';
import type { CreateJournalInput, UpdateJournalInput } from './journal.types';

const logger = createChildLogger({ module: 'journal.service' });

export async function createEntry(input: CreateJournalInput) {
  const operationLogger = logger.child({ operation: 'createEntry', userId: input.userId });

  const devotion = await getCurrentDevotion(input.userId);
  if (!devotion) {
    throw new ValidationError('Sorteie seu santo do ano antes de usar o diário');
  }

  const entry = await journalRepo.createEntry({
    userId: input.userId,
    yearlyDevotionId: devotion.id,
    content: input.content,
    mood: input.mood,
    date: input.date,
  });

  operationLogger.info({ entryId: entry.id }, 'Journal entry created');
  return entry;
}

export async function updateEntry(userId: string, entryId: string, data: UpdateJournalInput) {
  const entry = await journalRepo.findEntryById(entryId);
  if (!entry) throw new NotFoundError('Registro não encontrado');
  if (entry.userId !== userId) throw new UnauthorizedError('Sem permissão');

  return journalRepo.updateEntry(entryId, data);
}

export async function deleteEntry(userId: string, entryId: string) {
  const entry = await journalRepo.findEntryById(entryId);
  if (!entry) throw new NotFoundError('Registro não encontrado');
  if (entry.userId !== userId) throw new UnauthorizedError('Sem permissão');

  await journalRepo.deleteEntry(entryId);
  logger.info({ userId, entryId }, 'Journal entry deleted');
}

export async function getUserEntries(userId: string, page = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;

  const [entries, total] = await Promise.all([
    journalRepo.getUserEntries(userId, limit, offset),
    journalRepo.countUserEntries(userId),
  ]);

  return {
    entries,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
