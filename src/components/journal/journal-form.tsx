'use client';

import { Send, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { MoodSelector } from './mood-selector';

interface JournalFormProps {
  editingEntry?: { id: string; content: string; mood: string } | null;
  onSubmit: (data: { content: string; mood: string; date: string }) => void;
  onCancel?: () => void;
}

export function JournalForm({ editingEntry, onSubmit, onCancel }: JournalFormProps) {
  const [content, setContent] = useState(editingEntry?.content ?? '');
  const [mood, setMood] = useState(editingEntry?.mood ?? 'REFLECTIVE');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (content.trim().length < 10) return;

    startTransition(() => {
      onSubmit({
        content: content.trim(),
        mood,
        date: new Date().toISOString(),
      });
      if (!editingEntry) {
        setContent('');
        setMood('REFLECTIVE');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          {editingEntry ? 'Editar registro' : 'Novo registro'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <MoodSelector value={mood} onChange={setMood} />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Como foi seu dia na presença de Deus? Que graças recebeu? O que está no seu coração?"
        rows={4}
        maxLength={5000}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
      />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{content.length}/5000</span>
        <button
          type="submit"
          disabled={isPending || content.trim().length < 10}
          className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-gold-dark disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          {editingEntry ? 'Salvar' : 'Registrar'}
        </button>
      </div>
    </form>
  );
}
