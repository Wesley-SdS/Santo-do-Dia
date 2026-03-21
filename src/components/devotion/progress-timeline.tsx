'use client';

import { BookOpen, Church, Target, type Trophy } from 'lucide-react';

interface ProgressTimelineProps {
  weeksRead: number[];
  challengesCompleted: number[];
  novenaDone: boolean;
  totalWeeks: number;
}

export function ProgressTimeline({
  weeksRead,
  challengesCompleted,
  novenaDone,
  totalWeeks,
}: ProgressTimelineProps) {
  const weekProgress = Math.round((weeksRead.length / totalWeeks) * 100);
  const challengeProgress = Math.round((challengesCompleted.length / 12) * 100);
  const totalProgress = Math.round((weekProgress + challengeProgress + (novenaDone ? 100 : 0)) / 3);

  return (
    <div className="rounded-xl bg-gradient-to-br from-deep-blue to-deep-blue/90 p-5 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Progresso da Jornada</h3>
        <span className="text-2xl font-bold">{totalProgress}%</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${totalProgress}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <ProgressItem
          Icon={BookOpen}
          label="Reflexões"
          value={`${weeksRead.length}/${totalWeeks}`}
          progress={weekProgress}
        />
        <ProgressItem
          Icon={Target}
          label="Desafios"
          value={`${challengesCompleted.length}/12`}
          progress={challengeProgress}
        />
        <ProgressItem
          Icon={Church}
          label="Novena"
          value={novenaDone ? 'Feita' : 'Pendente'}
          progress={novenaDone ? 100 : 0}
        />
      </div>
    </div>
  );
}

function ProgressItem({
  Icon,
  label,
  value,
  progress,
}: {
  Icon: typeof Trophy;
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-4 w-4 text-gold-light" />
      <p className="mt-1 text-xs font-medium">{value}</p>
      <p className="text-[10px] text-white/60">{label}</p>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-gold-light transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
