export const APP_NAME = 'SantoDia';
export const APP_DESCRIPTION = 'Seu companheiro de fé, todos os dias.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const MAX_DAILY_CHAT_MESSAGES = 50;
export const PIX_QR_CODE_EXPIRATION_MINUTES = 30;
export const MIN_DONATION_CENTS = 100;
export const MAX_DONATION_CENTS = 1000000;

export const QUICK_DONATION_VALUES = [500, 1000, 2500, 5000] as const;

export const LITURGICAL_COLORS = {
  ORDINARY: 'oklch(0.50 0.12 145)',
  ADVENT: 'oklch(0.40 0.15 300)',
  LENT: 'oklch(0.40 0.15 300)',
  EASTER: 'oklch(1.0 0 0)',
  CHRISTMAS: 'oklch(1.0 0 0)',
  MARTYR: 'oklch(0.55 0.20 25)',
  GAUDETE: 'oklch(0.70 0.10 350)',
  LAETARE: 'oklch(0.70 0.10 350)',
} as const;

export const SAINT_CATEGORIES_PT = {
  MARTYR: 'Mártir',
  CONFESSOR: 'Confessor',
  VIRGIN: 'Virgem',
  DOCTOR: 'Doutor(a) da Igreja',
  POPE: 'Papa',
  RELIGIOUS: 'Religioso(a)',
  LAYPERSON: 'Leigo(a)',
  FOUNDER: 'Fundador(a)',
} as const;

export const STREAK_THRESHOLDS = {
  SEVEN_DAYS: 7,
  THIRTY_DAYS: 30,
  NINETY_DAYS: 90,
  ONE_YEAR: 365,
} as const;

export const ACHIEVEMENT_IDS = {
  SEVEN_DAYS_OF_FAITH: 'seven_days_of_faith',
  THIRTY_DAYS_OF_FAITH: 'thirty_days_of_faith',
  NINETY_DAYS_OF_FAITH: 'ninety_days_of_faith',
  ONE_YEAR_OF_FAITH: 'one_year_of_faith',
  MARTYR_EXPERT: 'martyr_expert',
  DOCTOR_SCHOLAR: 'doctor_scholar',
  NOVENA_COMPLETE: 'novena_complete',
  PILGRIM: 'pilgrim',
} as const;
