import { updateStreak } from '@/features/streaks/streaks.service';
import { ValidationError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import * as favoritesRepo from './favorites.repository';

const logger = createChildLogger({ module: 'favorites.service' });

export async function toggleFavorite(userId: string, saintId: string) {
  const operationLogger = logger.child({ operation: 'toggleFavorite', userId, saintId });

  const existing = await favoritesRepo.findFavorite(userId, saintId);

  if (existing) {
    await favoritesRepo.deleteFavorite(userId, saintId);
    operationLogger.info('Favorite removed');
    return { favorited: false };
  }

  await favoritesRepo.createFavorite(userId, saintId);
  operationLogger.info('Favorite added');
  return { favorited: true };
}

export async function getUserFavorites(userId: string) {
  logger.debug({ userId }, 'Getting user favorites');
  return favoritesRepo.getUserFavorites(userId);
}

export async function isFavorited(userId: string, saintId: string) {
  return favoritesRepo.isFavorited(userId, saintId);
}

export async function sendAmen(userId: string, saintId: string) {
  const operationLogger = logger.child({ operation: 'sendAmen', userId, saintId });

  const existing = await favoritesRepo.findAmenToday(userId, saintId);
  if (existing) {
    throw new ValidationError('Você já enviou Amém para este santo hoje', { saintId });
  }

  await favoritesRepo.createAmen(userId, saintId);
  const [total] = await Promise.all([favoritesRepo.countAmens(saintId), updateStreak(userId)]);

  operationLogger.info({ total }, 'Amen sent');
  return { total };
}

export async function getAmenCount(saintId: string, userId?: string) {
  const [total, userSentToday] = await Promise.all([
    favoritesRepo.countAmens(saintId),
    userId ? favoritesRepo.findAmenToday(userId, saintId).then(Boolean) : false,
  ]);

  return { saintId, total, userSentToday };
}
