'use client';

import { Brain, CloudRain, Edit3, HeartHandshake, Leaf, Smile, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface JournalEntryData {
  id: string;
  content: string;
  mood: string;
  date: string;
  yearlyDevotion: {
    saint: { name: string; slug: string };
  };
}

const MOOD_CONFIG: Record<string, { label: string; Icon: typeof HeartHandshake; color: string }> = {
  GRATEFUL: { label: 'Grato(a)', Icon: HeartHandshake, color: 'text-gold' },
  REFLECTIVE: { label: 'Reflexivo(a)', Icon: Brain, color: 'text-deep-blue' },
  JOYFUL: { label: 'Alegre', Icon: Smile, color: 'text-green-500' },
  STRUGGLING: { label: 'Em luta', Icon: CloudRain, color: 'text-muted-foreground' },
  PEACEFUL: { label: 'Em paz', Icon: Leaf, color: 'text-emerald-500' },
};

interface JournalEntryCardProps {
  entry: JournalEntryData;
  onDelete: (id: string) => void;
  onEdit: (entry: JournalEntryData) => void;
}

export function JournalEntryCard({ entry, onDelete, onEdit }: JournalEntryCardProps) {
  const [confirming, setConfirming] = useState(false);
  const mood = MOOD_CONFIG[entry.mood] ?? MOOD_CONFIG.REFLECTIVE;
  const Icon = mood.Icon;
  const date = new Date(entry.date);

  function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    onDelete(entry.id);
  }

  return (
    <article className="rounded-xl bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${mood.color}`} />
          <span className="text-xs font-medium text-muted-foreground">{mood.label}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <time className="text-xs text-muted-foreground">
            {date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </time>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label="Editar"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`rounded p-1 ${confirming ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}
            aria-label="Excluir"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
        {entry.content}
      </p>
      <p className="mt-2 text-xs text-muted-foreground/60">
        Santo do ano: {entry.yearlyDevotion.saint.name}
      </p>
    </article>
  );
}
