import type { Saint } from '@prisma/client';

export type SaintListItem = Pick<
  Saint,
  | 'id'
  | 'name'
  | 'slug'
  | 'feastMonth'
  | 'feastDay'
  | 'category'
  | 'biographyShort'
  | 'imageUrl'
  | 'country'
>;

export interface SaintSearchParams {
  query?: string;
  category?: string;
  country?: string;
  century?: number;
  page?: number;
  pageSize?: number;
}

export interface SaintOfTheDay {
  saint: Saint;
  isToday: boolean;
}
