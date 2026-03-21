import { Compass } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DrawCeremony } from '@/components/devotion/draw-ceremony';

export const metadata: Metadata = {
  title: 'Meu Santo do Ano',
  description: 'Sorteie seu santo padroeiro do ano e viva uma jornada de fé de 365 dias.',
};

export default function MeuSantoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <h1 className="text-center font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Santo de Devoção do Ano
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        &ldquo;São os santos que nos escolhem&rdquo; — Deixe o Espírito Santo guiar seu sorteio
      </p>

      <div className="mt-8">
        <DrawCeremony />
      </div>

      <Link
        href="/meu-santo/jornada"
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-deep-blue/10 px-4 py-3 text-sm font-medium text-deep-blue transition-colors hover:bg-deep-blue/20"
      >
        <Compass className="h-4 w-4" />
        Minha Jornada Anual
      </Link>
    </div>
  );
}
