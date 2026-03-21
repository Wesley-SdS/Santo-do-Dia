import { MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { SaintsMap } from '@/components/map/saints-map';

export const metadata: Metadata = {
  title: 'Mapa dos Santos',
  description: 'Explore os santos pelo mundo em um mapa interativo.',
};

export default function MapaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
      <div className="flex items-center gap-3">
        <MapPin className="h-6 w-6 text-gold" />
        <div>
          <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            Mapa dos Santos
          </h1>
          <p className="text-sm text-muted-foreground">
            Descubra santos de todas as regiões do mundo
          </p>
        </div>
      </div>

      <div className="mt-6">
        <SaintsMap />
      </div>
    </div>
  );
}
