'use client';

import { ExternalLink, Instagram, Music, Users, Church, Heart, Play, Youtube, BookOpen } from 'lucide-react';

const FSJPII_SONGS = [
  { name: 'Terra Seca', views: '66M+' },
  { name: 'Jardim', views: '' },
  { name: 'Perfume', views: '' },
  { name: 'Romanos 12', views: '' },
  { name: '99 Ovelhas', views: '' },
  { name: 'Tu És Amor', views: '' },
];

export function FSJPIISection() {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
        Fraternidade São João Paulo II
      </h2>

      <div className="rounded-2xl bg-gradient-to-br from-deep-blue via-deep-blue to-deep-blue/90 p-6 text-white">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/20">
            <img src="/favicon.svg" alt="FSJPII" className="h-8 w-8" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-serif)] text-lg">
              Instituto Religioso Clerical
            </p>
            <p className="mt-0.5 text-sm text-gold-light italic">
              &ldquo;Totus Tuus Iesu Per Mariam&rdquo;
            </p>
          </div>
        </div>

        {/* Founder */}
        <div className="mt-5 rounded-xl bg-white/10 p-4">
          <p className="text-xs font-medium text-gold-light">Fundador</p>
          <p className="mt-1 text-sm font-semibold text-white">
            Padre Ailton Fernandes Cardoso
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            Natural de Alagoa Nova, Paraíba. Filho de agricultores, desde os 9 anos
            já fazia catequese e cantava no coral da comunidade. Fundou a Fraternidade
            em 1º de maio de 2012 como &ldquo;fruto da experiência do amor de Deus&rdquo;
            na Diocese de Santo Amaro, São Paulo.
          </p>
        </div>

        {/* Triple Mission */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Church className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-[11px] font-medium text-white leading-tight">Santificar o Clero</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Heart className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-[11px] font-medium text-white leading-tight">Restaurar as Famílias</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <Users className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 text-[11px] font-medium text-white leading-tight">Salvar a Juventude</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <Instagram className="h-3.5 w-3.5 text-gold/70" />
              <span className="text-sm font-bold text-white">570K</span>
            </div>
            <p className="text-[10px] text-white/50">seguidores</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <Music className="h-3.5 w-3.5 text-gold/70" />
              <span className="text-sm font-bold text-white">2M</span>
            </div>
            <p className="text-[10px] text-white/50">ouvintes/mês</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <Youtube className="h-3.5 w-3.5 text-gold/70" />
              <span className="text-sm font-bold text-white">123M</span>
            </div>
            <p className="text-[10px] text-white/50">visualizações</p>
          </div>
        </div>

        {/* Musical Ministry */}
        <div className="mt-5">
          <p className="text-xs font-medium text-gold-light flex items-center gap-1.5">
            <Music className="h-3 w-3" />
            Ministério Musical · Ir. Samuel Maria
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FSJPII_SONGS.map((song) => (
              <span
                key={song.name}
                className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80"
              >
                {song.name}
                {song.views && (
                  <span className="ml-1 text-gold/70">{song.views}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mt-5 text-xs leading-relaxed text-white/60">
          Uma das maiores forças de evangelização digital do Brasil, a FSJPII está presente
          em diversas dioceses com comunidades de vida, seminários e casas de formação. Através
          do Centro de Acolhida Nossa Senhora de Fátima (Parelheiros, SP), acolhe dependentes
          químicos e moradores em situação de rua, realizando visitas mensais à Cracolândia.
          Seu principal evento, o <strong className="text-white/80">Retiro Nova Forma</strong>,
          acontece anualmente durante o Carnaval. O SantoDia nasce como extensão natural dessa
          missão evangelizadora.
        </p>

        {/* Links */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href="https://www.fsjpii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold/20 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/30"
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
            href="https://open.spotify.com/artist/3P2GN1O0yI6n84aDFOcvVt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            <Music className="h-3 w-3" />
            Spotify
          </a>
          <a
            href="https://loja.fsjpii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            <BookOpen className="h-3 w-3" />
            Loja
          </a>
        </div>
      </div>
    </section>
  );
}
