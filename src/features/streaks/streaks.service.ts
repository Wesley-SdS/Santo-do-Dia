import type { Prisma } from '@prisma/client';
import { STREAK_THRESHOLDS } from '@/constants';
import { createChildLogger } from '@/lib/logger';
import * as streaksRepo from './streaks.repository';
import type { Achievement, StreakData } from './streaks.types';
import { ACHIEVEMENT_DEFINITIONS } from './streaks.types';

const logger = createChildLogger({ module: 'streaks.service' });

export async function getStreakData(userId: string): Promise<StreakData> {
  const streak = await streaksRepo.findStreakByUser(userId);

  if (!streak) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      achievements: [],
    };
  }

  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    lastActivityDate: streak.lastActivityDate,
    achievements: (streak.achievements as unknown as Achievement[]) ?? [],
  };
}

export async function updateStreak(userId: string): Promise<StreakData> {
  const operationLogger = logger.child({ operation: 'updateStreak', userId });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const streak = await streaksRepo.findStreakByUser(userId);
  const lastActivity = streak?.lastActivityDate ? new Date(streak.lastActivityDate) : null;

  if (lastActivity) {
    lastActivity.setHours(0, 0, 0, 0);
  }

  const isSameDay = lastActivity?.getTime() === today.getTime();
  if (isSameDay && streak) {
    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate,
      achievements: (streak.achievements as unknown as Achievement[]) ?? [],
    };
  }

  const isConsecutive = lastActivity
    ? today.getTime() - lastActivity.getTime() === 86400000
    : false;

  const currentStreak = isConsecutive ? (streak?.currentStreak ?? 0) + 1 : 1;
  const longestStreak = Math.max(currentStreak, streak?.longestStreak ?? 0);

  const achievements = checkNewAchievements(
    currentStreak,
    (streak?.achievements as unknown as Achievement[]) ?? [],
  );

  const updated = await streaksRepo.upsertStreak(userId, {
    currentStreak,
    longestStreak,
    lastActivityDate: today,
    achievements: achievements as unknown as Prisma.InputJsonValue[],
  });

  operationLogger.info({ currentStreak, longestStreak }, 'Streak updated');

  return {
    currentStreak: updated.currentStreak,
    longestStreak: updated.longestStreak,
    lastActivityDate: updated.lastActivityDate,
    achievements: (updated.achievements as unknown as Achievement[]) ?? [],
  };
}

function checkNewAchievements(currentStreak: number, existing: Achievement[]): Achievement[] {
  const updated = [...existing];
  const existingIds = new Set(existing.map((a) => a.id));
  const now = new Date().toISOString();

  const thresholdMap: Record<number, string> = {
    [STREAK_THRESHOLDS.SEVEN_DAYS]: 'seven_days_of_faith',
    [STREAK_THRESHOLDS.THIRTY_DAYS]: 'thirty_days_of_faith',
    [STREAK_THRESHOLDS.NINETY_DAYS]: 'ninety_days_of_faith',
    [STREAK_THRESHOLDS.ONE_YEAR]: 'one_year_of_faith',
  };

  for (const [threshold, achievementId] of Object.entries(thresholdMap)) {
    if (currentStreak >= Number(threshold) && !existingIds.has(achievementId)) {
      const definition = ACHIEVEMENT_DEFINITIONS[achievementId];
      if (definition) {
        updated.push({ ...definition, unlockedAt: now });
      }
    }
  }

  return updated;
}
