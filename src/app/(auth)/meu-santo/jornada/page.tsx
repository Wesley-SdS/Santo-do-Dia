import { ArrowLeft, Compass } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { JourneyDashboard } from '@/components/devotion/journey-dashboard';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Jornada Anual',
  description: 'Sua jornada de fé com o santo do ano: reflexões, desafios e novena.',
};

export default async function JornadaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <Link
        href="/meu-santo"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Meu Santo
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <Compass className="h-6 w-6 text-gold" />
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            Jornada Anual
          </h1>
          <p className="text-sm text-muted-foreground">
            Reflexões, desafios de virtude e novena ao seu santo
          </p>
        </div>
      </div>

      <div className="mt-6">
        <JourneyDashboard />
      </div>
    </div>
  );
}
