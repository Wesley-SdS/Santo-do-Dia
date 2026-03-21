import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, BookOpen, Heart, Play, ExternalLink, Globe } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SAINT_CATEGORIES_PT } from '@/constants';

interface SaintPageProps {
  params: Promise<{ slug: string }>;
}

async function getSaint(slug: string) {
  return prisma.saint.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: SaintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const saint = await getSaint(slug);

  if (!saint) return { title: 'Santo não encontrado' };

  return {
    title: saint.name,
    description: saint.biographyShort,
    openGraph: {
      title: saint.name,
      description: saint.biographyShort,
      images: saint.imageUrl ? [{ url: saint.imageUrl }] : [],
    },
  };
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

interface VideoData {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  channelTitle?: string;
  watchUrl: string;
  embedUrl: string;
}

export default async function SaintPage({ params }: SaintPageProps) {
  const { slug } = await params;
  const saint = await getSaint(slug);

  if (!saint) notFound();

  const categoryLabel =
    SAINT_CATEGORIES_PT[saint.category as keyof typeof SAINT_CATEGORIES_PT] ?? saint.category;
  const feastDate = `${saint.feastDay} de ${MONTH_NAMES[saint.feastMonth - 1]}`;
  const videos = (saint.videos ?? []) as unknown as VideoData[];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24">
      {/* Back Button */}
      <div className="py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 to-deep-blue/10">
        {saint.imageUrl ? (
          <img
            src={saint.imageUrl}
            alt={saint.name}
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-[family-name:var(--font-dm-serif)] text-8xl text-gold/20">
              {saint.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            {categoryLabel}
          </span>
          <h1 className="mt-2 font-[family-name:var(--font-dm-serif)] text-3xl text-white drop-shadow-lg">
            {saint.name}
          </h1>
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-gold" />
          Festa: {feastDate}
        </span>
        {saint.country && (
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {saint.country}
          </span>
        )}
        {saint.century && (
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            Século {Math.abs(saint.century)}{saint.century < 0 ? ' a.C.' : ''}
          </span>
        )}
        {saint.birthDate && saint.deathDate && (
          <span className="text-xs text-muted-foreground/70">
            {saint.birthDate} — {saint.deathDate}
          </span>
        )}
      </div>

      {/* Patronage */}
      {saint.patronage.length > 0 && (
        <div className="mt-5">
          <div className="flex flex-wrap gap-2">
            {saint.patronage.map((p) => (
              <span
                key={p}
                className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Biography */}
      <article className="mt-8">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
          Biografia
        </h2>
        <div className="mt-4 space-y-4 font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] text-foreground/80">
          {saint.biographyFull.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {saint.wikipediaUrl && (
          <a
            href={saint.wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            Ler mais na Wikipedia
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </article>

      {/* Quotes */}
      {saint.quotes.length > 0 && (
        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
            Frases Célebres
          </h2>
          <div className="mt-4 space-y-4">
            {(saint.quotes as Array<{ text: string; source?: string }>).map((quote, i) => (
              <blockquote
                key={i}
                className="rounded-xl border-l-4 border-gold bg-gold/5 p-4"
              >
                <p className="font-[family-name:var(--font-dm-serif)] text-[15px] italic leading-relaxed text-foreground">
                  &ldquo;{quote.text}&rdquo;
                </p>
                {quote.source && (
                  <cite className="mt-2 block text-xs text-muted-foreground not-italic">
                    — {quote.source}
                  </cite>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Prayer */}
      {saint.prayer && (
        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
            Oração
          </h2>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-deep-blue to-deep-blue/90 p-6 text-white">
            <div className="space-y-3 text-[15px] leading-relaxed">
              {saint.prayer.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 text-right text-sm text-gold-light">Amém.</p>
          </div>
        </section>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <section className="mt-8">
          <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
            Vídeos
          </h2>
          <div className="mt-4 space-y-4">
            {videos.map((video) => (
              <a
                key={video.videoId}
                href={video.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl bg-card p-3 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={video.thumbnailUrl ?? `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="h-20 w-36 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <Play className="h-8 w-8 text-white drop-shadow" fill="white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                    {video.title}
                  </p>
                  {video.channelTitle && (
                    <p className="mt-1 text-xs text-muted-foreground">{video.channelTitle}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark"
        >
          <Heart className="h-4 w-4" />
          Amém
        </button>
      </div>
    </div>
  );
}
