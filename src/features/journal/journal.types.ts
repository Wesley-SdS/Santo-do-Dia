import type { JournalEntry, JournalMood } from '@prisma/client';

export interface JournalEntryWithDevotion extends JournalEntry {
  yearlyDevotion: {
    saint: {
      name: string;
      slug: string;
    };
  };
}

export interface CreateJournalInput {
  userId: string;
  yearlyDevotionId: string;
  content: string;
  mood: JournalMood;
  date: Date;
}

export interface UpdateJournalInput {
  content?: string;
  mood?: JournalMood;
}

export const MOOD_LABELS: Record<JournalMood, string> = {
  GRATEFUL: 'Grato(a)',
  REFLECTIVE: 'Reflexivo(a)',
  JOYFUL: 'Alegre',
  STRUGGLING: 'Em luta',
  PEACEFUL: 'Em paz',
};

export const MOOD_ICONS: Record<JournalMood, string> = {
  GRATEFUL: 'heart-handshake',
  REFLECTIVE: 'brain',
  JOYFUL: 'smile',
  STRUGGLING: 'cloud-rain',
  PEACEFUL: 'leaf',
};
