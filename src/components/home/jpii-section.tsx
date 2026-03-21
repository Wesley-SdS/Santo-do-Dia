'use client';

import Link from 'next/link';
import { Play, Calendar, MapPin, BookOpen, Quote, ArrowRight } from 'lucide-react';

const JPII_QUOTES = [
  {
    text: 'Não tenham medo! Abram, abram de par em par as portas a Cristo!',
    context: 'Homilia de início do pontificado, 22 de outubro de 1978',
  },
  {
    text: 'O futuro começa hoje, não amanhã.',
    context: 'Discurso aos jovens',
  },
  {
    text: 'A fé e a razão são como as duas asas com as quais o espírito humano se eleva para a contemplação da verdade.',
    context: 'Encíclica Fides et Ratio, 1998',
  },
  {
    text: 'A liberdade não consiste em fazer o que se quer, mas em ter o direito de fazer o que se deve.',
    context: 'Discurso em Baltimore, 1995',
  },
];

const JPII_TIMELINE = [
  { year: '1920', event: 'Nasce em Wadowice, Polônia' },
  { year: '1946', event: 'Ordenado sacerdote em Cracóvia' },
  { year: '1958', event: 'Nomeado Bispo Auxiliar de Cracóvia' },
  { year: '1967', event: 'Criado Cardeal pelo Papa Paulo VI' },
  { year: '1978', event: 'Eleito Papa — primeiro não-italiano em 455 anos' },
  { year: '1981', event: 'Sofre atentado na Praça São Pedro (13 de maio)' },
  { year: '1984', event: 'Cria as Jornadas Mundiais da Juventude' },
  { year: '1989', event: 'Papel central na queda do Muro de Berlim' },
  { year: '2000', event: 'Grande Jubileu — pede perdão pelos erros da Igreja' },
  { year: '2005', event: 'Falece no Vaticano (2 de abril) — "Deixem-me ir à casa do Pai"' },
  { year: '2011', event: 'Beatificado pelo Papa Bento XVI' },
  { year: '2014', event: 'Canonizado pelo Papa Francisco (27 de abril)' },
];

const JPII_VIDEOS = [
  {
    id: 'dR9GvE0CE_8',
    title: 'João Paulo II - O Papa que mudou o mundo',
    channel: 'Documentário',
  },
  {
    id: '6rxnBMRxyBs',
    title: 'A vida de Karol Wojtyła',
    channel: 'História da Igreja',
  },
  {
    id: 'GKo-_mMPSrs',
    title: 'Não tenham medo - Discurso histórico de 1978',
    channel: 'Vaticano',
  },
];

export function JPIISection() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
          São João Paulo II
        </h2>
        <Link
          href="/santo/sao-joao-paulo-ii"
          className="flex items-center gap-1 text-xs text-gold hover:underline"
        >
          Ver página completa
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Hero Card */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
        <div className="relative aspect-[2/1] bg-gradient-to-br from-gold/20 to-deep-blue/20">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Ioannes_Paulus_II%2C_1993.jpg"
            alt="São João Paulo II"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs text-gold-light">Karol Józef Wojtyła</p>
            <h3 className="mt-1 font-[family-name:var(--font-dm-serif)] text-2xl text-white">
              O Papa que mudou o mundo
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                1920 – 2005
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Wadowice, Polônia
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Festa: 22 de outubro
              </span>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-foreground/80">
            Karol Wojtyła foi o 264º Papa da Igreja Católica, o primeiro polonês e o primeiro
            não-italiano em 455 anos. Seu pontificado de 26 anos (1978-2005) foi um dos mais
            longos e transformadores da história. Viajou por 129 países, canonizou 482 santos,
            criou as Jornadas Mundiais da Juventude e teve papel fundamental na queda do
            comunismo na Europa Oriental. Seu lema papal,{' '}
            <em className="text-gold">&ldquo;Totus Tuus&rdquo;</em> (Todo Teu), expressa sua
            total consagração a Nossa Senhora — o mesmo carisma que inspira a Fraternidade
            São João Paulo II.
          </p>
        </div>
      </div>

      {/* Quotes */}
      <div className="mt-4 space-y-3">
        {JPII_QUOTES.map((quote, i) => (
          <div
            key={i}
            className="rounded-xl border-l-4 border-gold bg-card p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <Quote className="h-5 w-5 shrink-0 text-gold/40" />
              <div>
                <p className="font-[family-name:var(--font-dm-serif)] text-sm italic text-foreground">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{quote.context}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground">Linha do Tempo</h3>
        <div className="mt-3 space-y-0">
          {JPII_TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                {i < JPII_TIMELINE.length - 1 && (
                  <div className="w-px flex-1 bg-gold/20" />
                )}
              </div>
              <div className="pb-4">
                <span className="text-xs font-bold text-gold">{item.year}</span>
                <p className="text-sm text-foreground/80">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-foreground">Vídeos</h3>
        <div className="mt-3 space-y-3">
          {JPII_VIDEOS.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl bg-card p-3 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative shrink-0 overflow-hidden rounded-lg">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="h-16 w-28 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <Play className="h-6 w-6 text-white" fill="white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                  {video.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{video.channel}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
