'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

interface FavoriteButtonProps {
  saintId: string;
  className?: string;
}

export function FavoriteButton({ saintId, className = '' }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch(`/api/favorites/check?saintId=${saintId}`)
      .then((res) => res.json())
      .then((data) => setFavorited(data.favorited))
      .catch(() => {});
  }, [saintId]);

  function handleToggle() {
    startTransition(async () => {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saintId }),
      });
      if (res.ok) {
        const data = await res.json();
        setFavorited(data.favorited);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={`rounded-full p-2 transition-all ${
        favorited
          ? 'bg-liturgical-red/10 text-liturgical-red'
          : 'bg-muted text-muted-foreground hover:text-liturgical-red'
      } ${isPending ? 'opacity-50' : ''} ${className}`}
    >
      <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
    </button>
  );
}
