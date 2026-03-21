import { Users } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { RoomDashboard } from '@/components/community/room-dashboard';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Comunidade — SantoDia',
  description: 'Crie ou entre em salas de sorteio de santos em grupo.',
};

export default async function ComunidadePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-gold" />
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            Comunidade
          </h1>
          <p className="text-sm text-muted-foreground">
            Sorteie santos em grupo com amigos e família
          </p>
        </div>
      </div>

      <div className="mt-6">
        <RoomDashboard />
      </div>
    </div>
  );
}
