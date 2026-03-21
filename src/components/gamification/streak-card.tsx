'use client';

import { BookOpen, Crown, Flame, Loader2, MapIcon, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}

const ICON_MAP: Record<string, typeof Flame> = {
  flame: Flame,
  fire: Flame,
  star: Star,
  crown: Crown,
  book: BookOpen,
  map: MapIcon,
};

function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const Icon = ICON_MAP[achievement.icon] ?? Trophy;
  const date = new Date(achievement.unlockedAt);
  const formatted = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <p className="text-center text-xs font-medium text-foreground">{achievement.name}</p>
      <p className="text-center text-[10px] text-muted-foreground">{formatted}</p>
    </div>
  );
}

export function StreakCard() {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/streaks')
      .then((res) => res.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-gold/10 to-liturgical-red/10 p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
          <Flame className="h-7 w-7 text-gold" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{data.currentStreak}</p>
          <p className="text-xs text-muted-foreground">dias consecutivos</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-medium text-foreground">{data.longestStreak}</p>
          <p className="text-xs text-muted-foreground">recorde</p>
        </div>
      </div>

      {data.achievements.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Trophy className="h-4 w-4 text-gold" />
            Conquistas ({data.achievements.length})
          </h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {data.achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
