'use client';

import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { WEEKLY_REFLECTIONS } from '@/features/yearly-devotion/journey.constants';
import { MonthlyChallenges } from './monthly-challenges';
import { NovenaTracker } from './novena-tracker';
import { ProgressTimeline } from './progress-timeline';
import { WeeklyReflections } from './weekly-reflections';

interface DevotionData {
  id: string;
  progress: {
    weeksRead: number[];
    challengesCompleted: number[];
    novenaDone: boolean;
  };
  saint: {
    name: string;
    slug: string;
    feastMonth: number;
    feastDay: number;
    imageUrl: string | null;
  };
}

export function JourneyDashboard() {
  const [devotion, setDevotion] = useState<DevotionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDevotion = useCallback(async () => {
    try {
      const res = await fetch('/api/devotion/progress');
      if (res.ok) {
        const data = await res.json();
        if (data.devotion) {
          const progress = data.devotion.progress ?? {};
          setDevotion({
            ...data.devotion,
            progress: {
              weeksRead: progress.weeksRead ?? [],
              challengesCompleted: progress.challengesCompleted ?? [],
              novenaDone: progress.novenaDone ?? false,
            },
          });
        }
      }
    } catch {
      /* empty */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDevotion();
  }, [fetchDevotion]);

  async function handleMarkWeek(week: number) {
    await fetch('/api/devotion/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'markWeek', value: week }),
    });
    fetchDevotion();
  }

  async function handleCompleteChallenge(month: number) {
    await fetch('/api/devotion/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'completeChallenge', value: month }),
    });
    fetchDevotion();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!devotion) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Sorteie seu santo do ano para iniciar a jornada.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProgressTimeline
        weeksRead={devotion.progress.weeksRead}
        challengesCompleted={devotion.progress.challengesCompleted}
        novenaDone={devotion.progress.novenaDone}
        totalWeeks={WEEKLY_REFLECTIONS.length}
      />

      <WeeklyReflections weeksRead={devotion.progress.weeksRead} onMarkWeek={handleMarkWeek} />

      <MonthlyChallenges
        challengesCompleted={devotion.progress.challengesCompleted}
        onComplete={handleCompleteChallenge}
      />

      <NovenaTracker
        feastMonth={devotion.saint.feastMonth}
        feastDay={devotion.saint.feastDay}
        novenaDone={devotion.progress.novenaDone}
        saintName={devotion.saint.name}
      />
    </div>
  );
}
