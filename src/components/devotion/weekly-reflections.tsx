'use client';

import { BookOpen, Check } from 'lucide-react';
import { WEEKLY_REFLECTIONS } from '@/features/yearly-devotion/journey.constants';

interface WeeklyReflectionsProps {
  weeksRead: number[];
  onMarkWeek: (week: number) => void;
}

export function WeeklyReflections({ weeksRead, onMarkWeek }: WeeklyReflectionsProps) {
  const currentWeek = Math.ceil(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 86400000),
  );

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
        <BookOpen className="h-4 w-4 text-gold" />
        Reflexões Semanais ({weeksRead.length}/{WEEKLY_REFLECTIONS.length})
      </h3>
      <div className="space-y-2">
        {WEEKLY_REFLECTIONS.map((reflection) => {
          const isRead = weeksRead.includes(reflection.week);
          const isCurrent = reflection.week === Math.min(currentWeek, 12);
          const isLocked = reflection.week > Math.min(currentWeek, 12);

          return (
            <div
              key={reflection.week}
              className={`rounded-xl border p-4 transition-all ${
                isRead
                  ? 'border-gold/30 bg-gold/5'
                  : isCurrent
                    ? 'border-gold/50 bg-card shadow-sm'
                    : 'border-border bg-card opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Semana {reflection.week}
                    </span>
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] text-gold">
                      {reflection.virtue}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{reflection.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {reflection.content}
                  </p>
                </div>
                {isRead ? (
                  <Check className="h-5 w-5 shrink-0 text-gold" />
                ) : !isLocked ? (
                  <button
                    type="button"
                    onClick={() => onMarkWeek(reflection.week)}
                    className="shrink-0 rounded-lg bg-gold px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-gold-dark"
                  >
                    Concluir
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
