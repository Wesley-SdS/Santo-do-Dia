import { Baby, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { KidsSaintCard } from '@/components/kids/kids-saint-card';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Modo Kids — SantoDia',
  description: 'Histórias de santos para crianças com quiz interativo.',
};

async function getTodaySaint() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const saint = await prisma.saint.findFirst({
    where: { feastMonth: month, feastDay: day },
    select: {
      name: true,
      slug: true,
      imageUrl: true,
      biographyKids: true,
      biographyShort: true,
      category: true,
    },
  });

  if (!saint) return null;

  return {
    ...saint,
    biographyKids: saint.biographyKids ?? saint.biographyShort,
  };
}

export default async function KidsPage() {
  const saint = await getTodaySaint();

  return (
    <div className="mx-auto max-w-xl px-4 pb-24 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
          <Baby className="h-5 w-5 text-pink-500" />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            Modo Kids
          </h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            Histórias de santos para crianças
          </p>
        </div>
      </div>

      <div className="mt-6">
        {saint ? (
          <KidsSaintCard saint={saint} />
        ) : (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">Nenhum santo encontrado para hoje.</p>
          </div>
        )}
      </div>
    </div>
  );
}
