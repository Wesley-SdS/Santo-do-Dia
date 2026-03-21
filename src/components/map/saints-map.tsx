'use client';

import { Loader2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MapSaint {
  id: string;
  name: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  latitude: number;
  longitude: number;
  country: string | null;
  feastMonth: number;
  feastDay: number;
}

export function SaintsMap() {
  const [saints, setSaints] = useState<MapSaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{
    saints: MapSaint[];
  }> | null>(null);

  useEffect(() => {
    fetch('/api/saints/map')
      .then((res) => res.json())
      .then((data) => setSaints(data.saints ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    import('./leaflet-map').then((mod) => setMapComponent(() => mod.LeafletMap));
  }, []);

  if (loading || !MapComponent) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-xl bg-card">
        <div className="text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  if (saints.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-xl border border-dashed border-border">
        <div className="text-center">
          <MapPin className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Nenhum santo com localização cadastrada ainda.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Santos com coordenadas aparecerão aqui.
          </p>
        </div>
      </div>
    );
  }

  return <MapComponent saints={saints} />;
}
