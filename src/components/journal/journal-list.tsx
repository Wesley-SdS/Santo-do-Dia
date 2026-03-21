'use client';

import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { JournalEntryCard } from './journal-entry-card';
import { JournalForm } from './journal-form';

interface EntryData {
  id: string;
  content: string;
  mood: string;
  date: string;
  yearlyDevotion: {
    saint: { name: string; slug: string };
  };
}

interface JournalResponse {
  entries: EntryData[];
  total: number;
  page: number;
  totalPages: number;
}

export function JournalList() {
  const [data, setData] = useState<JournalResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editingEntry, setEditingEntry] = useState<EntryData | null>(null);

  const fetchEntries = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/journal?page=${p}`);
      if (res.ok) setData(await res.json());
    } catch {
      /* handled by empty state */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries(page);
  }, [page, fetchEntries]);

  async function handleCreate(formData: { content: string; mood: string; date: string }) {
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setPage(1);
      fetchEntries(1);
    }
  }

  async function handleUpdate(formData: { content: string; mood: string }) {
    if (!editingEntry) return;
    const res = await fetch(`/api/journal/${editingEntry.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setEditingEntry(null);
      fetchEntries(page);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
    if (res.ok) fetchEntries(page);
  }

  return (
    <div className="space-y-4">
      {editingEntry ? (
        <JournalForm
          editingEntry={editingEntry}
          onSubmit={handleUpdate}
          onCancel={() => setEditingEntry(null)}
        />
      ) : (
        <JournalForm onSubmit={handleCreate} />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : !data || data.entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Seu diário está vazio. Comece registrando o que está no seu coração.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {data.entries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onDelete={handleDelete}
                onEdit={setEditingEntry}
              />
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">
                {page} de {data.totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
