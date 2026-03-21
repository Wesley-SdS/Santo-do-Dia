import type { Saint, YearlyDevotion } from '@prisma/client';

export interface DevotionWithSaint extends YearlyDevotion {
  saint: Saint;
}

export interface DevotionProgress {
  weeksRead: number[];
  challengesCompleted: number[];
  novenaDone: boolean;
}

export interface WeeklyReflection {
  week: number;
  title: string;
  content: string;
  virtue: string;
}
