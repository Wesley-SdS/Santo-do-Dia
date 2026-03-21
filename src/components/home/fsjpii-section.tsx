'use client';

import Link from 'next/link';
import { ExternalLink, Instagram, Music, Users, Church, Heart } from 'lucide-react';

export function FSJPIISection() {
  return (
    <section className="mt-10">
      <div className="rounded-2xl bg-gradient-to-br from-deep-blue via-deep-blue to-deep-blue/90 p-6 text-white">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/20">
            <Church className="h-7 w-7 text-gold" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-dm-serif)] text-xl">
              Fraternidade São João Paulo II
            </h2>
            <p className="mt-0.5 text-sm text-gold-light italic">
              &ldquo;Totus Tuus Iesu Per Mariam&rdquo;
            </p>
          </div>
        </div>

        {/* Mission */}
        <p className="mt-5 text-sm leading-relaxed text-white/80">
          Instituto Religioso Clerical fundado em 2012 pelo{' '}
          <strong className="text-white">Padre Ailton Fernandes Cardoso</strong>,
          com a tríplice missão de santificar a Igreja e a sociedade.
        </p>

        {/* Triple Mission */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Church className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-xs font-medium text-white">Santificar o Clero</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Heart className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-xs font-medium text-white">Restaurar as Famílias</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Users className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-xs font-medium text-white">Salvar a Juventude</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-gold/70" />
            <span className="text-sm text-white/70">
              <strong className="text-white">547K</strong> seguidores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-gold/70" />
            <span className="text-sm text-white/70">
              <strong className="text-white">2M</strong> ouvintes/mês
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-xs leading-relaxed text-white/60">
          Uma das maiores forças de evangelização digital do Brasil, a FSJPII está presente
          em diversas dioceses com comunidades de vida, seminários e casas de formação.
          O SantoDia é uma extensão natural dessa missão: levar a vida dos santos a cada
          católico brasileiro, todos os dias.
        </p>

        {/* Links */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="https://www.fsjpii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            Site Oficial
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://instagram.com/fsjpii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            <Instagram className="h-3 w-3" />
            @fsjpii
          </a>
          <a
            href="https://open.spotify.com/artist/fsjpii"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            <Music className="h-3 w-3" />
            Spotify
          </a>
        </div>
      </div>
    </section>
  );
}
