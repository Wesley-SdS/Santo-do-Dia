import type { Favorite, Saint } from '@prisma/client';

export interface FavoriteWithSaint extends Favorite {
  saint: Pick<Saint, 'id' | 'name' | 'slug' | 'imageUrl' | 'feastMonth' | 'feastDay' | 'category'>;
}

export interface ToggleFavoriteInput {
  userId: string;
  saintId: string;
}

export interface AmenInput {
  userId: string;
  saintId: string;
}

export interface AmenCount {
  saintId: string;
  total: number;
  userSentToday: boolean;
}
