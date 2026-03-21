export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

export const ACHIEVEMENT_DEFINITIONS: Record<string, Omit<Achievement, 'unlockedAt'>> = {
  seven_days_of_faith: {
    id: 'seven_days_of_faith',
    name: '7 Dias de Fé',
    description: 'Rezou por 7 dias consecutivos',
    icon: 'flame',
  },
  thirty_days_of_faith: {
    id: 'thirty_days_of_faith',
    name: '30 Dias de Fé',
    description: 'Rezou por 30 dias consecutivos',
    icon: 'fire',
  },
  ninety_days_of_faith: {
    id: 'ninety_days_of_faith',
    name: '90 Dias de Fé',
    description: 'Rezou por 90 dias consecutivos',
    icon: 'star',
  },
  one_year_of_faith: {
    id: 'one_year_of_faith',
    name: '1 Ano de Fé',
    description: 'Rezou por 365 dias consecutivos',
    icon: 'crown',
  },
  novena_complete: {
    id: 'novena_complete',
    name: 'Novena Completa',
    description: 'Completou uma novena ao seu santo do ano',
    icon: 'book',
  },
  pilgrim: {
    id: 'pilgrim',
    name: 'Peregrino',
    description: 'Visitou 50 páginas de santos diferentes',
    icon: 'map',
  },
};
