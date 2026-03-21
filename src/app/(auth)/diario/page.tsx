import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { JournalList } from '@/components/journal/journal-list';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Diário Espiritual',
  description: 'Registre suas graças, reflexões e orações no diário espiritual.',
};

export default async function DiarioPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-gold" />
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            Diário Espiritual
          </h1>
          <p className="text-sm text-muted-foreground">
            Registre graças recebidas, reflexões e momentos de oração
          </p>
        </div>
      </div>

      <div className="mt-6">
        <JournalList />
      </div>
    </div>
  );
}
