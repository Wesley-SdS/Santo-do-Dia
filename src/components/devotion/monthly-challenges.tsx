'use client';

import { Check, Target } from 'lucide-react';
import { MONTHLY_CHALLENGES } from '@/features/yearly-devotion/journey.constants';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

interface MonthlyChallengesProps {
  challengesCompleted: number[];
  onComplete: (month: number) => void;
}

export function MonthlyChallenges({ challengesCompleted, onComplete }: MonthlyChallengesProps) {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Target className="h-4 w-4 text-liturgical-red" />
        Desafios Mensais de Virtude ({challengesCompleted.length}/12)
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {MONTHLY_CHALLENGES.map((challenge) => {
          const completed = challengesCompleted.includes(challenge.month);
          const isCurrent = challenge.month === currentMonth;
          const isPast = challenge.month < currentMonth;

          return (
            <div
              key={challenge.month}
              className={`rounded-xl border p-3 transition-all ${
                completed
                  ? 'border-gold/30 bg-gold/5'
                  : isCurrent
                    ? 'border-liturgical-red/30 bg-card shadow-sm'
                    : 'border-border bg-card opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    {MONTH_NAMES[challenge.month - 1]}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{challenge.virtue}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {challenge.challenge}
                  </p>
                </div>
                {completed ? (
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                ) : isCurrent || isPast ? (
                  <button
                    type="button"
                    onClick={() => onComplete(challenge.month)}
                    className="shrink-0 rounded bg-liturgical-red/10 px-2 py-1 text-[10px] font-medium text-liturgical-red hover:bg-liturgical-red/20"
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
