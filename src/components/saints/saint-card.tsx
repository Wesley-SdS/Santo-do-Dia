'use client';

import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { SAINT_CATEGORIES_PT } from '@/constants';

interface SaintCardProps {
  id: string;
  name: string;
  slug: string;
  feastMonth: number;
  feastDay: number;
  category: string;
  biographyShort: string;
  imageUrl: string | null;
  country: string | null;
  variant?: 'default' | 'hero' | 'compact';
}

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function SaintCard({
  name,
  slug,
  feastMonth,
  feastDay,
  category,
  biographyShort,
  imageUrl,
  country,
  variant = 'default',
}: SaintCardProps) {
  const categoryLabel =
    SAINT_CATEGORIES_PT[category as keyof typeof SAINT_CATEGORIES_PT] ?? category;
  const feastDate = `${feastDay} de ${MONTH_NAMES[feastMonth - 1]}`;

  if (variant === 'hero') {
    return (
      <Link href={`/santo/${slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-card shadow-lg transition-shadow hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-gold/20 to-deep-blue/10">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-[family-name:var(--font-dm-serif)] text-6xl text-gold/30">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-primary-foreground">
              {categoryLabel}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="mb-1 text-sm text-gold-light">Santo do Dia</p>
            <h2 className="font-[family-name:var(--font-dm-serif)] text-2xl leading-tight">
              {name}
            </h2>
            <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {feastDate}
              </span>
              {country && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {country}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/santo/${slug}`} className="group block">
        <article className="flex items-center gap-3 rounded-xl bg-card p-3 transition-colors hover:bg-muted">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="h-full w-full rounded-lg object-cover" />
            ) : (
              <span className="font-[family-name:var(--font-dm-serif)] text-lg text-gold">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{feastDate}</p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/santo/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-[3/2] bg-gradient-to-br from-gold/10 to-deep-blue/5">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-[family-name:var(--font-dm-serif)] text-4xl text-gold/20">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs text-muted-foreground backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-[family-name:var(--font-dm-serif)] text-lg text-foreground group-hover:text-gold transition-colors">
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {feastDate}
            </span>
            {country && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {country}
              </span>
            )}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{biographyShort}</p>
        </div>
      </article>
    </Link>
  );
}
