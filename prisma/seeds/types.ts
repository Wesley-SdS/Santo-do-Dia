export interface SaintSeedData {
  name: string;
  slug: string;
  feastMonth: number;
  feastDay: number;
  birthDate: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  deathPlace: string | null;
  country: string | null;
  century: number | null;
  category: 'MARTYR' | 'CONFESSOR' | 'VIRGIN' | 'DOCTOR' | 'POPE' | 'RELIGIOUS' | 'LAYPERSON' | 'FOUNDER';
  gender: 'MALE' | 'FEMALE';
  patronage: string[];
  biographyShort: string;
  biographyFull: string;
  biographyKids: string | null;
  quotes: Array<{ text: string; source?: string }>;
  prayer: string | null;
  imageUrl: string | null;
  latitude: number | null;
  longitude: number | null;
}
