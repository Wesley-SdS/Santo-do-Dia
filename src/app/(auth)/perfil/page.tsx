import { BookOpen, Flame, Heart, LogOut, Star, Trophy, User } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { StreakCard } from '@/components/gamification/streak-card';
import { FavoritesList } from '@/components/saints/favorites-list';
import { auth, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Meu Perfil',
  description: 'Seu perfil, favoritos, streaks e conquistas no SantoDia.',
};

export default async function PerfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const userId = session.user.id;

  let favoritesCount = 0;
  let currentStreak = 0;
  let achievementsCount = 0;

  try {
    const [favorites, streak] = await Promise.all([
      prisma.favorite.count({ where: { userId } }),
      prisma.streak.findUnique({ where: { userId } }),
    ]);
    favoritesCount = favorites;
    currentStreak = streak?.currentStreak ?? 0;
    achievementsCount = (streak?.achievements as unknown[])?.length ?? 0;
  } catch {
    // DB might not be ready
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Meu Perfil
      </h1>

      {/* Profile Card */}
      <div className="mt-6 rounded-xl bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gold/10">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ?? ''}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-gold" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              {session.user.name ?? 'Peregrino'}
            </p>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Star className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-2 text-lg font-bold text-foreground">{favoritesCount}</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Flame className="mx-auto h-5 w-5 text-liturgical-red" />
          <p className="mt-2 text-lg font-bold text-foreground">{currentStreak}</p>
          <p className="text-xs text-muted-foreground">Dias de Streak</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center shadow-sm">
          <Trophy className="mx-auto h-5 w-5 text-gold" />
          <p className="mt-2 text-lg font-bold text-foreground">{achievementsCount}</p>
          <p className="text-xs text-muted-foreground">Conquistas</p>
        </div>
      </div>

      {/* Streak & Achievements */}
      <section className="mt-6">
        <h2 className="flex items-center gap-2 font-[family-name:var(--font-dm-serif)] text-lg text-foreground">
          <Flame className="h-5 w-5 text-liturgical-red" />
          Jornada de Fé
        </h2>
        <div className="mt-3">
          <StreakCard />
        </div>
      </section>

      {/* Favorites */}
      <section className="mt-6">
        <h2 className="flex items-center gap-2 font-[family-name:var(--font-dm-serif)] text-lg text-foreground">
          <Heart className="h-5 w-5 text-liturgical-red" />
          Santos Favoritos
        </h2>
        <div className="mt-3">
          <FavoritesList />
        </div>
      </section>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <Link
          href="/meu-santo"
          className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm transition-colors hover:bg-muted"
        >
          <Star className="h-5 w-5 text-gold" />
          <span className="text-sm font-medium text-foreground">Meu Santo do Ano</span>
        </Link>
        <Link
          href="/diario"
          className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm transition-colors hover:bg-muted"
        >
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Diário Espiritual</span>
        </Link>
      </div>

      {/* Sign Out */}
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
        className="mt-8"
      >
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 px-4 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sair da conta
        </button>
      </form>
    </div>
  );
}
