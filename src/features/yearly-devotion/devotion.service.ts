import { NotFoundError, ValidationError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import { getRandomSaintForDraw } from '@/features/saints';
import * as devotionRepo from './devotion.repository';
import type { DevotionWithSaint, DevotionProgress } from './devotion.types';

const logger = createChildLogger({ module: 'devotion.service' });

export async function drawYearlySaint(userId: string): Promise<DevotionWithSaint> {
  const year = new Date().getFullYear();
  const operationLogger = logger.child({ operation: 'drawYearlySaint', userId, year });

  const existing = await devotionRepo.findDevotionByUserAndYear(userId, year);
  if (existing) {
    operationLogger.warn('User already has a devotion for this year');
    throw new ValidationError('Você já sorteou seu santo para este ano', { year });
  }

  const saint = await getRandomSaintForDraw();
  operationLogger.info({ saintId: saint.id, saintName: saint.name }, 'Saint drawn');

  const devotion = await devotionRepo.createDevotion({
    userId,
    saintId: saint.id,
    year,
    virtueFocus: getVirtueForSaint(saint.category),
  });

  const result = await devotionRepo.findDevotionByUserAndYear(userId, year);
  if (!result) {
    throw new NotFoundError('Devoção não encontrada após criação');
  }

  operationLogger.info({ devotionId: devotion.id }, 'Yearly devotion created');
  return result;
}

export async function getCurrentDevotion(userId: string): Promise<DevotionWithSaint | null> {
  const year = new Date().getFullYear();
  return devotionRepo.findDevotionByUserAndYear(userId, year);
}

export async function getDevotionHistory(userId: string): Promise<DevotionWithSaint[]> {
  return devotionRepo.getUserDevotionHistory(userId);
}

export async function markWeekAsRead(userId: string, week: number): Promise<void> {
  const year = new Date().getFullYear();
  const devotion = await devotionRepo.findDevotionByUserAndYear(userId, year);

  if (!devotion) {
    throw new NotFoundError('Nenhuma devoção encontrada para este ano');
  }

  const progress = (devotion.progress as unknown as DevotionProgress) ?? {
    weeksRead: [],
    challengesCompleted: [],
    novenaDone: false,
  };

  if (!progress.weeksRead.includes(week)) {
    progress.weeksRead.push(week);
  }

  await devotionRepo.updateDevotionProgress(devotion.id, progress as unknown as Record<string, unknown>);
  logger.info({ userId, week }, 'Week marked as read');
}

function getVirtueForSaint(category: string): string {
  const virtueMap: Record<string, string> = {
    MARTYR: 'Coragem e Fé',
    CONFESSOR: 'Perseverança',
    VIRGIN: 'Pureza de Coração',
    DOCTOR: 'Sabedoria',
    POPE: 'Liderança Servidora',
    RELIGIOUS: 'Obediência e Oração',
    LAYPERSON: 'Santidade no Cotidiano',
    FOUNDER: 'Visão e Caridade',
  };
  return virtueMap[category] ?? 'Fé';
}
