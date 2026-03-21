import type { Metadata } from 'next';
import { User, Star, Flame, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meu Perfil',
  description: 'Seu perfil, favoritos, streaks e conquistas no SantoDia.',
};

export default function PerfilPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Meu Perfil
      </h1>

      {/* Profile Card */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <User className="h-8 w-8 text-gold" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">Peregrino</p>
            <p className="text-sm text-muted-foreground">Faça login para salvar seu progresso</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Star className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-2 text-lg font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Flame className="mx-auto h-5 w-5 text-liturgical-red" />
          <p className="mt-2 text-lg font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground">Dias de Streak</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Trophy className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-2 text-lg font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground">Conquistas</p>
        </div>
      </div>

      {/* Login CTA */}
      <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Faça login para salvar favoritos, streaks e conquistas.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Em breve: login com email ou Google.
        </p>
      </div>
    </div>
  );
}
