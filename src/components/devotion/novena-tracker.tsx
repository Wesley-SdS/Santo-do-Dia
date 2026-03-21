'use client';

import { Check, Church, Lock } from 'lucide-react';
import { useState } from 'react';
import { NOVENA_DAYS } from '@/features/yearly-devotion/journey.constants';

interface NovenaTrackerProps {
  feastMonth: number;
  feastDay: number;
  novenaDone: boolean;
  saintName: string;
}

export function NovenaTracker({ feastMonth, feastDay, novenaDone, saintName }: NovenaTrackerProps) {
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const feastDate = new Date(new Date().getFullYear(), feastMonth - 1, feastDay);
  const novenaStart = new Date(feastDate);
  novenaStart.setDate(novenaStart.getDate() - 9);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isNovenaActive = today >= novenaStart && today <= feastDate;
  const daysSinceStart = Math.floor((today.getTime() - novenaStart.getTime()) / 86400000) + 1;

  function formatDate(date: Date) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  function handleComplete(day: number) {
    setCompletedDays((prev) => [...prev, day]);
  }

  if (novenaDone) {
    return (
      <div className="rounded-xl bg-gold/10 p-4 text-center">
        <Church className="mx-auto h-6 w-6 text-gold" />
        <p className="mt-2 text-sm font-medium text-foreground">Novena Completa!</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Parabéns por completar a novena a {saintName}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Church className="h-4 w-4 text-deep-blue" />
        Novena a {saintName}
      </h3>
      <p className="text-xs text-muted-foreground">
        {isNovenaActive
          ? `Novena em andamento (dia ${Math.min(daysSinceStart, 9)} de 9)`
          : `Começa em ${formatDate(novenaStart)} — 9 dias antes da festa (${formatDate(feastDate)})`}
      </p>

      <div className="space-y-2">
        {NOVENA_DAYS.map((novenaDay) => {
          const isCompleted = completedDays.includes(novenaDay.day);
          const isAvailable = isNovenaActive && novenaDay.day <= daysSinceStart;
          const isLocked = !isAvailable && !isCompleted;

          return (
            <div
              key={novenaDay.day}
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                isCompleted
                  ? 'border-gold/30 bg-gold/5'
                  : isAvailable
                    ? 'border-deep-blue/30 bg-card'
                    : 'border-border bg-muted/50 opacity-50'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isCompleted ? 'bg-gold/20' : isLocked ? 'bg-muted' : 'bg-deep-blue/10'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-gold" />
                ) : isLocked ? (
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <span className="text-xs font-bold text-deep-blue">{novenaDay.day}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground">{novenaDay.title}</p>
                <p className="text-[11px] text-muted-foreground">{novenaDay.intention}</p>
              </div>
              {isAvailable && !isCompleted && (
                <button
                  type="button"
                  onClick={() => handleComplete(novenaDay.day)}
                  className="shrink-0 rounded bg-deep-blue/10 px-2 py-1 text-[10px] font-medium text-deep-blue hover:bg-deep-blue/20"
                >
                  Rezei
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
