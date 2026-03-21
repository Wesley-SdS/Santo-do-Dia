import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, BookOpen, Heart } from 'lucide-react';
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

export default async function SaintPage({ params }: SaintPageProps) {
  const { slug } = await params;
  const saint = await getSaint(slug);

  if (!saint) notFound();

  const categoryLabel =
    SAINT_CATEGORIES_PT[saint.category as keyof typeof SAINT_CATEGORIES_PT] ?? saint.category;
  const feastDate = `${saint.feastDay} de ${MONTH_NAMES[saint.feastMonth - 1]}`;

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
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 to-deep-blue/10">
        {saint.imageUrl ? (
          <img
            src={saint.imageUrl}
            alt={saint.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-[family-name:var(--font-dm-serif)] text-8xl text-gold/20">
              {saint.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Saint Info */}
      <div className="mt-6">
        <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
          {categoryLabel}
        </span>
        <h1 className="mt-3 font-[family-name:var(--font-dm-serif)] text-3xl text-foreground">
          {saint.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
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
              Século {saint.century}
            </span>
          )}
        </div>
      </div>

      {/* Patronage */}
      {saint.patronage.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-foreground">Patronato</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {saint.patronage.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
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
        <div className="mt-4 space-y-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-foreground/80">
          {saint.biographyFull.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
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
                <p className="font-[family-name:var(--font-dm-serif)] text-sm italic text-foreground">
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
            <div className="space-y-3 text-sm leading-relaxed">
              {saint.prayer.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 text-right text-sm text-gold-light">Amém.</p>
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
