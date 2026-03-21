'use client';

import { Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SAINT_CATEGORIES_PT } from '@/constants';

interface FavoriteSaint {
  id: string;
  saint: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    feastMonth: number;
    feastDay: number;
    category: string;
  };
}

const MONTH_NAMES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteSaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data.favorites ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <Heart className="mx-auto h-8 w-8 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">Nenhum santo favorito ainda</p>
        <Link href="/explorar" className="mt-2 inline-block text-xs text-gold hover:underline">
          Explorar santos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {favorites.map(({ id, saint }) => (
        <Link
          key={id}
          href={`/santo/${saint.slug}`}
          className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm transition-colors hover:bg-muted"
        >
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gold/10">
            {saint.imageUrl ? (
              <img
                src={saint.imageUrl}
                alt={saint.name}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-lg text-gold/30">{saint.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{saint.name}</p>
            <p className="text-xs text-muted-foreground">
              {SAINT_CATEGORIES_PT[saint.category as keyof typeof SAINT_CATEGORIES_PT]} ·{' '}
              {saint.feastDay} {MONTH_NAMES[saint.feastMonth - 1]}
            </p>
          </div>
          <Heart className="h-4 w-4 shrink-0 fill-liturgical-red text-liturgical-red" />
        </Link>
      ))}
    </div>
  );
}
