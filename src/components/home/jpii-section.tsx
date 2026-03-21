'use client';

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Cross,
  Globe,
  MapPin,
  Play,
  Quote,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const JPII_QUOTES = [
  {
    text: 'Não tenhais medo! Antes, procurai abrir, melhor, escancarar as portas a Cristo!',
    context: 'Homilia de início do pontificado, 22 de outubro de 1978',
  },
  {
    text: 'A fé e a razão são como as duas asas com as quais o espírito humano se eleva para a contemplação da verdade.',
    context: 'Encíclica Fides et Ratio, 1998',
  },
  {
    text: 'O futuro da humanidade passa pela família.',
    context: 'Exortação Apostólica Familiaris Consortio, 1981',
  },
  {
    text: 'Foi uma mão que atirou, mas outra mão guiou a bala.',
    context: 'Sobre o atentado de 13 de maio de 1981',
  },
  {
    text: 'A liberdade não consiste em fazer o que se quer, mas em ter o direito de fazer o que se deve.',
    context: 'Discurso em Baltimore, 1995',
  },
  {
    text: 'Deixai-me ir à casa do Pai.',
    context: 'Últimas palavras, 2 de abril de 2005',
  },
];

const JPII_TIMELINE = [
  { year: '1920', event: 'Nasce em Wadowice, Polônia (18 de maio)', highlight: false },
  { year: '1929', event: 'Perde a mãe — adota Nossa Senhora como protetora', highlight: false },
  {
    year: '1942',
    event: 'Ingressa no seminário clandestino durante a ocupação nazista',
    highlight: false,
  },
  { year: '1946', event: 'Ordenado sacerdote pelo Cardeal Adam Sapieha', highlight: false },
  { year: '1958', event: 'Nomeado Bispo Auxiliar de Cracóvia', highlight: false },
  { year: '1967', event: 'Criado Cardeal pelo Papa Paulo VI', highlight: false },
  { year: '1978', event: 'Eleito Papa — primeiro não-italiano em 455 anos', highlight: true },
  {
    year: '1979',
    event: 'Primeira viagem à Polônia: "Que o Espírito renove a face desta terra"',
    highlight: false,
  },
  {
    year: '1981',
    event: 'Atentado na Praça São Pedro (13 de maio, dia de N. Sra. de Fátima)',
    highlight: true,
  },
  {
    year: '1982',
    event: 'Peregrina a Fátima e deposita a bala na coroa de Nossa Senhora',
    highlight: false,
  },
  {
    year: '1984',
    event: 'Consagra o mundo ao Imaculado Coração de Maria · Cria a JMJ',
    highlight: true,
  },
  {
    year: '1989',
    event: 'Papel fundamental na queda do Muro de Berlim e do comunismo',
    highlight: true,
  },
  {
    year: '2000',
    event: 'Grande Jubileu — pede perdão pelos erros históricos da Igreja',
    highlight: false,
  },
  {
    year: '2005',
    event: 'Falece no Vaticano (2 de abril) — "Deixai-me ir à casa do Pai"',
    highlight: true,
  },
  { year: '2014', event: 'Canonizado pelo Papa Francisco (27 de abril)', highlight: true },
];

const JPII_STATS = [
  { label: 'Países visitados', value: '129' },
  { label: 'Santos canonizados', value: '483' },
  { label: 'Anos de pontificado', value: '26' },
  { label: 'Encíclicas', value: '14' },
];

const JPII_VIDEOS = [
  {
    id: 'dR9GvE0CE_8',
    title: 'João Paulo II — O Papa que mudou o mundo',
    channel: 'Documentário',
  },
  {
    id: '6rxnBMRxyBs',
    title: 'A vida de Karol Wojtyła — De Wadowice ao Vaticano',
    channel: 'História da Igreja',
  },
  {
    id: 'GKo-_mMPSrs',
    title: '"Não tenham medo!" — Discurso histórico de 1978',
    channel: 'Vaticano',
  },
];

export function JPIISection() {
  const [showAllTimeline, setShowAllTimeline] = useState(false);
  const visibleTimeline = showAllTimeline
    ? JPII_TIMELINE
    : JPII_TIMELINE.filter((t) => t.highlight);

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
            src="/images/sjpii-hero.webp"
            alt="São João Paulo II"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs text-gold-light italic">
              Karol Józef Wojtyła · &ldquo;Totus Tuus&rdquo;
            </p>
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

        <div className="p-5 space-y-3">
          <p className="text-sm leading-relaxed text-foreground/80">
            Karol Wojtyła nasceu em 1920 na pequena cidade de Wadowice, na Polônia. Perdeu a mãe aos
            9 anos e, desde então, encontrou em Nossa Senhora uma mãe espiritual que o acompanharia
            por toda a vida. Viveu sob a ocupação nazista, trabalhou em pedreiras e fábricas, e
            estudou no seminário clandestino de Cracóvia. Foi ordenado sacerdote em 1946 e, ao longo
            dos anos seguintes, tornou-se professor, bispo e cardeal.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            Em 16 de outubro de 1978, aos 58 anos, foi eleito o 264º Papa da Igreja Católica, o
            primeiro polonês e o primeiro não italiano em mais de quatro séculos. Suas primeiras
            palavras ao mundo foram uma convocação que ecoaria por todo o seu pontificado:{' '}
            <em className="text-gold font-medium">
              &ldquo;Não tenhais medo! Abram de par em par as portas a Cristo!&rdquo;
            </em>
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            Durante 26 anos à frente da Igreja, João Paulo II percorreu 129 países, canonizou 483
            santos (mais do que todos os papas dos cinco séculos anteriores juntos), criou as
            Jornadas Mundiais da Juventude e desempenhou um papel decisivo na queda do comunismo na
            Europa Oriental. Lech Walesa, líder do sindicato Solidariedade, atribuiu a ele 50% da
            responsabilidade pela queda do Muro de Berlim.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            Seu lema papal, <em className="text-gold font-medium">&ldquo;Totus Tuus&rdquo;</em>{' '}
            (Todo Teu), nasceu da leitura dos escritos de São Luís Maria Grignion de Montfort sobre
            a consagração total a Nossa Senhora. Essa devoção mariana profunda marcou cada momento
            de sua vida. Em 13 de maio de 1981, sobreviveu a um atentado na Praça São Pedro, no dia
            exato de Nossa Senhora de Fátima. Ele mesmo disse:{' '}
            <em>&ldquo;Foi uma mão que atirou, mas outra mão guiou a bala.&rdquo;</em> No ano
            seguinte, peregrinando a Fátima, depositou a bala que o atingiu na coroa da Virgem.
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            Faleceu em 2 de abril de 2005, na véspera do Domingo da Misericórdia. Suas últimas
            palavras foram: <em>&ldquo;Deixai-me ir à casa do Pai.&rdquo;</em> Foi canonizado em 27
            de abril de 2014 pelo Papa Francisco. Esse mesmo carisma mariano, o{' '}
            <em className="text-gold font-medium">&ldquo;Totus Tuus Iesu Per Mariam&rdquo;</em>, é o
            que inspira e dá nome à <strong>Fraternidade São João Paulo II</strong>, fundada em 2012
            pelo Padre Ailton Fernandes Cardoso.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {JPII_STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-card p-3 text-center shadow-sm">
            <p className="font-[family-name:var(--font-dm-serif)] text-xl text-gold">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* The Assassination Attempt */}
      <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-liturgical-red/10">
            <Shield className="h-4 w-4 text-liturgical-red" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              O Atentado — 13 de maio de 1981
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Mehmet Ali Agca disparou dois tiros contra o Papa na Praça São Pedro. A bala passou a
              milímetros de uma artéria vital. O atentado ocorreu no dia de Nossa Senhora de Fátima
              — coincidência que o Papa interpretou como intervenção divina. Em 1982, peregrinando a
              Fátima, depositou a bala na coroa da Virgem. Em 1983, visitou o atirador na prisão e o
              perdoou.
            </p>
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className="mt-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Frases célebres</h3>
        {JPII_QUOTES.map((quote, i) => (
          <div key={i} className="rounded-xl border-l-4 border-gold bg-card p-4 shadow-sm">
            <div className="flex gap-3">
              <Quote className="h-4 w-4 shrink-0 text-gold/40 mt-0.5" />
              <div>
                <p className="font-[family-name:var(--font-dm-serif)] text-sm italic text-foreground leading-relaxed">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="mt-1.5 text-[11px] text-muted-foreground">{quote.context}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Linha do Tempo</h3>
          <button
            type="button"
            onClick={() => setShowAllTimeline(!showAllTimeline)}
            className="text-xs text-gold hover:underline"
          >
            {showAllTimeline ? 'Mostrar destaques' : 'Ver tudo'}
          </button>
        </div>
        <div className="mt-3 space-y-0">
          {visibleTimeline.map((item, i) => (
            <div key={item.year} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 rounded-full ${item.highlight ? 'bg-gold' : 'bg-gold/40'}`}
                />
                {i < visibleTimeline.length - 1 && <div className="w-px flex-1 bg-gold/20" />}
              </div>
              <div className="pb-4">
                <span className="text-xs font-bold text-gold">{item.year}</span>
                <p
                  className={`text-sm ${item.highlight ? 'text-foreground font-medium' : 'text-foreground/70'}`}
                >
                  {item.event}
                </p>
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
