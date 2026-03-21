import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SaintCard } from '@/components/saints/saint-card';
import { SaintSearchForm } from '@/components/saints/saint-search-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Explorar Santos',
  description: 'Busque e descubra santos católicos por nome, categoria, país e século.',
};

interface ExplorarPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export default async function ExplorarPage({ searchParams }: ExplorarPageProps) {
  const params = await searchParams;
  const query = params.q ?? '';
  const category = params.category ?? '';
  const page = parseInt(params.page ?? '1', 10);
  const pageSize = 12;

  const where: Record<string, unknown> = {};

  if (query) {
    const normalized = normalizeSearch(query);
    // Search by slug (accent-free) and by name/biography (with accents)
    where.OR = [
      { slug: { contains: normalized, mode: 'insensitive' } },
      { name: { contains: query, mode: 'insensitive' } },
      { biographyShort: { contains: query, mode: 'insensitive' } },
      { patronage: { has: query } },
      { country: { contains: query, mode: 'insensitive' } },
    ];
  }

  if (category) {
    where.category = category;
  }

  const [saints, total] = await Promise.all([
    prisma.saint.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        feastMonth: true,
        feastDay: true,
        category: true,
        biographyShort: true,
        imageUrl: true,
        country: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: 'asc' },
    }),
    prisma.saint.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
      <div className="flex items-baseline justify-between">
        <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
          Explorar Santos
        </h1>
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? 'santo' : 'santos'}
        </p>
      </div>

      <SaintSearchForm initialQuery={query} initialCategory={category} />

      {saints.length === 0 ? (
        <div className="mt-12 text-center">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">
            Nenhum santo encontrado para &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tente buscar por nome, país ou patronato
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saints.map((saint) => (
              <SaintCard key={saint.id} {...saint} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                .map((p, idx, arr) => {
                  const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                  return (
                    <span key={p}>
                      {showEllipsis && <span className="px-1 text-muted-foreground">...</span>}
                      <a
                        href={`/explorar?q=${encodeURIComponent(query)}&category=${category}&page=${p}`}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
                          p === page
                            ? 'bg-gold text-primary-foreground'
                            : 'hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {p}
                      </a>
                    </span>
                  );
                })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
