'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  { value: '', label: 'Todas as categorias' },
  { value: 'MARTYR', label: 'Mártires' },
  { value: 'CONFESSOR', label: 'Confessores' },
  { value: 'VIRGIN', label: 'Virgens' },
  { value: 'DOCTOR', label: 'Doutores da Igreja' },
  { value: 'POPE', label: 'Papas' },
  { value: 'RELIGIOUS', label: 'Religiosos' },
  { value: 'LAYPERSON', label: 'Leigos' },
  { value: 'FOUNDER', label: 'Fundadores' },
];

interface SaintSearchFormProps {
  initialQuery: string;
  initialCategory: string;
}

export function SaintSearchForm({ initialQuery, initialCategory }: SaintSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const pushSearch = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (cat) params.set('category', cat);
      router.push(`/explorar?${params.toString()}`);
    },
    [router],
  );

  // Debounced search on typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      pushSearch(query, category);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, category, pushSearch]);

  function handleClear() {
    setQuery('');
    setCategory('');
    router.push('/explorar');
  }

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar santos... (ex: Rita, Francisco, Teresa)"
          className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
