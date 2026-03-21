import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Compass, Sparkles } from 'lucide-react';
import { SaintOfDayHero } from '@/components/saints/saint-of-day-hero';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24">
      {/* Santo do Dia - Hero */}
      <section className="pt-6">
        <Suspense fallback={<SaintHeroSkeleton />}>
          <SaintOfDayHero />
        </Suspense>
      </section>

      {/* Quick Actions */}
      <section className="mt-8 grid grid-cols-3 gap-3">
        <Link
          href="/meu-santo"
          className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <span className="text-xs font-medium text-foreground">Meu Santo</span>
        </Link>
        <Link
          href="/calendario"
          className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-liturgical-green/10">
            <Calendar className="h-5 w-5 text-liturgical-green" />
          </div>
          <span className="text-xs font-medium text-foreground">Calendário</span>
        </Link>
        <Link
          href="/explorar"
          className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue/10">
            <Compass className="h-5 w-5 text-deep-blue" />
          </div>
          <span className="text-xs font-medium text-foreground">Explorar</span>
        </Link>
      </section>

      {/* Frase do Dia */}
      <section className="mt-8">
        <div className="rounded-2xl bg-gradient-to-br from-deep-blue to-deep-blue/80 p-6 text-white">
          <p className="font-[family-name:var(--font-dm-serif)] text-lg italic leading-relaxed">
            &ldquo;Não tenhas medo. Eu estou contigo. Daqui quero iluminar. Arrepende-te dos
            pecados.&rdquo;
          </p>
          <p className="mt-3 text-sm text-gold-light">
            — Nossa Senhora de Fátima
          </p>
        </div>
      </section>

      {/* CTA Doação */}
      <section className="mt-8">
        <Link
          href="/apoiar"
          className="group flex items-center justify-between rounded-xl border border-gold/20 bg-gold/5 p-4 transition-colors hover:bg-gold/10"
        >
          <div>
            <p className="text-sm font-medium text-foreground">
              Apoie o SantoDia
            </p>
            <p className="text-xs text-muted-foreground">
              100% gratuito, sustentado por doações via Pix
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}

function SaintHeroSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-card shadow-lg">
      <div className="aspect-[4/3] rounded-t-2xl bg-muted" />
      <div className="p-5">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="mt-2 h-7 w-48 rounded bg-muted" />
        <div className="mt-3 h-3 w-36 rounded bg-muted" />
      </div>
    </div>
  );
}
