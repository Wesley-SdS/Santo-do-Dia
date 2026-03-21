import type { Saint } from '@prisma/client';
import { NotFoundError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import * as saintsRepo from './saints.repository';
import type { SaintSearchParams } from './saints.types';

const logger = createChildLogger({ module: 'saints.service' });

export async function getSaintOfTheDay(date?: Date): Promise<Saint> {
  const targetDate = date ?? new Date();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  logger.debug({ month, day }, 'Getting saint of the day');

  const saints = await saintsRepo.findSaintsByFeastDay(month, day);

  if (saints.length === 0) {
    logger.warn({ month, day }, 'No saint found for this date');
    throw new NotFoundError('Nenhum santo encontrado para esta data', { month, day });
  }

  logger.info({ saintId: saints[0].id, saintName: saints[0].name }, 'Saint of the day found');
  return saints[0];
}

export async function getSaintBySlug(slug: string): Promise<Saint> {
  logger.debug({ slug }, 'Getting saint by slug');

  const saint = await saintsRepo.findSaintBySlug(slug);

  if (!saint) {
    throw new NotFoundError('Santo não encontrado', { slug });
  }

  return saint;
}

export async function searchSaints(params: SaintSearchParams) {
  logger.debug({ params }, 'Searching saints');

  const { saints, total } = await saintsRepo.searchSaints(params);
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  return {
    data: saints,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getRandomSaintForDraw(): Promise<Saint> {
  logger.info('Drawing random saint for yearly devotion');

  const saint = await saintsRepo.getRandomSaint();

  if (!saint) {
    throw new NotFoundError('Nenhum santo disponível para sorteio');
  }

  logger.info({ saintId: saint.id, saintName: saint.name }, 'Random saint drawn');
  return saint;
}
