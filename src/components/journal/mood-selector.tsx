'use client';

import { Brain, CloudRain, HeartHandshake, Leaf, Smile } from 'lucide-react';

const MOODS = [
  { value: 'GRATEFUL', label: 'Grato(a)', Icon: HeartHandshake, color: 'text-gold' },
  { value: 'REFLECTIVE', label: 'Reflexivo(a)', Icon: Brain, color: 'text-deep-blue' },
  { value: 'JOYFUL', label: 'Alegre', Icon: Smile, color: 'text-green-500' },
  { value: 'STRUGGLING', label: 'Em luta', Icon: CloudRain, color: 'text-muted-foreground' },
  { value: 'PEACEFUL', label: 'Em paz', Icon: Leaf, color: 'text-emerald-500' },
] as const;

interface MoodSelectorProps {
  value: string;
  onChange: (mood: string) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map(({ value: mood, label, Icon, color }) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(mood)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            value === mood
              ? 'bg-gold/20 text-gold ring-1 ring-gold/30'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Icon className={`h-3.5 w-3.5 ${value === mood ? color : ''}`} />
          {label}
        </button>
      ))}
    </div>
  );
}
