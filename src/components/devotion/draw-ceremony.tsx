'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

type Step = 'prayer' | 'drawing' | 'reveal';

interface DrawnSaint {
  id: string;
  name: string;
  slug: string;
  feastMonth: number;
  feastDay: number;
  category: string;
  biographyShort: string;
  imageUrl: string | null;
  country: string | null;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function DrawCeremony() {
  const [step, setStep] = useState<Step>('prayer');
  const [saint, setSaint] = useState<DrawnSaint | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  async function handleDraw() {
    setIsDrawing(true);
    setStep('drawing');

    try {
      const res = await fetch('/api/saints/draw', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Wait for animation
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSaint(data.saint);
        setStep('reveal');
      }
    } catch {
      // Fallback
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSaint({
        id: 'fallback',
        name: 'São José',
        slug: 'sao-jose',
        feastMonth: 3,
        feastDay: 19,
        category: 'CONFESSOR',
        biographyShort: 'Esposo da Virgem Maria e pai adotivo de Jesus Cristo. Patrono da Igreja Universal.',
        imageUrl: null,
        country: 'Israel',
      });
      setStep('reveal');
    } finally {
      setIsDrawing(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {step === 'prayer' && (
        <motion.div
          key="prayer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-2xl bg-gradient-to-br from-deep-blue to-deep-blue/90 p-8 text-white"
        >
          <div className="text-center">
            <Sparkles className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-4 font-[family-name:var(--font-dm-serif)] text-xl">
              Oração de Preparação
            </h2>
          </div>

          <p className="mt-6 text-center font-[family-name:var(--font-dm-serif)] text-sm italic leading-relaxed text-white/90">
            &ldquo;Espírito Santo, iluminai-me. Santo Anjo da Guarda, escolhei por mim
            o santo que me acompanhará neste ano. Que eu possa, pela intercessão deste
            santo, crescer nas virtudes e aproximar-me cada dia mais de Nosso Senhor
            Jesus Cristo. Amém.&rdquo;
          </p>

          <button
            type="button"
            onClick={handleDraw}
            className="mt-8 w-full rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-gold-dark hover:shadow-lg"
          >
            Estou pronto(a) — Sortear meu Santo
          </button>
        </motion.div>
      )}

      {step === 'drawing' && (
        <motion.div
          key="drawing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="flex h-32 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark shadow-xl"
          >
            <span className="font-[family-name:var(--font-dm-serif)] text-3xl text-white">?</span>
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-6 text-sm text-muted-foreground"
          >
            O céu está escolhendo seu santo...
          </motion.p>
        </motion.div>
      )}

      {step === 'reveal' && saint && (
        <motion.div
          key="reveal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <div className="overflow-hidden rounded-2xl bg-card shadow-xl">
            {/* Saint Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gold/20 to-deep-blue/10">
              {saint.imageUrl ? (
                <img src={saint.imageUrl} alt={saint.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-[family-name:var(--font-dm-serif)] text-8xl text-gold/20">
                    {saint.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gold-light"
                >
                  Seu Santo Padroeiro de {new Date().getFullYear()}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-1 font-[family-name:var(--font-dm-serif)] text-3xl"
                >
                  {saint.name}
                </motion.h2>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {saint.feastDay} de {MONTH_NAMES[saint.feastMonth - 1]}
                </span>
                {saint.country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {saint.country}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {saint.biographyShort}
              </p>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/santo/${saint.slug}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark"
                >
                  <Heart className="h-4 w-4" />
                  Conhecer meu Santo
                </Link>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-xs text-muted-foreground"
          >
            Que {saint.name} interceda por você durante todo este ano.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
