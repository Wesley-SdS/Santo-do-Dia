'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SaintSearchFormProps {
  initialQuery: string;
  initialCategory: string;
}

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

export function SaintSearchForm({ initialQuery, initialCategory }: SaintSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    router.push(`/explorar?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar santos..."
          className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (e.target.value) params.set('category', e.target.value);
          router.push(`/explorar?${params.toString()}`);
        }}
        className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </form>
  );
}
