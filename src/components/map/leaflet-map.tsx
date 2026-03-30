'use client';

import { useEffect, useRef } from 'react';
import { SAINT_CATEGORIES_PT } from '@/constants';

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

interface LeafletMapProps {
  saints: MapSaint[];
}

const MONTH_NAMES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export function LeafletMap({ saints }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const controller = new AbortController();

    async function initMap() {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      if (!mapRef.current || controller.signal.aborted || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([20, 10], 2);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: 'saint-marker',
        html: '<div style="width:12px;height:12px;border-radius:50%;background:#b8860b;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      for (const saint of saints) {
        const categoryLabel =
          SAINT_CATEGORIES_PT[saint.category as keyof typeof SAINT_CATEGORIES_PT] ?? saint.category;
        const feastDate = `${saint.feastDay} ${MONTH_NAMES[saint.feastMonth - 1]}`;

        const popupContent = `
          <div style="min-width:180px;font-family:sans-serif">
            <div style="display:flex;gap:8px;align-items:center">
              ${saint.imageUrl ? `<img src="${saint.imageUrl}" style="width:40px;height:40px;border-radius:8px;object-fit:cover" />` : ''}
              <div>
                <a href="/santo/${saint.slug}" style="font-weight:600;font-size:13px;color:#1a1a2e;text-decoration:none">${saint.name}</a>
                <div style="font-size:11px;color:#666">${categoryLabel} · ${feastDate}</div>
                ${saint.country ? `<div style="font-size:10px;color:#999">${saint.country}</div>` : ''}
              </div>
            </div>
          </div>
        `;

        L.marker([Number(saint.latitude), Number(saint.longitude)], { icon: markerIcon })
          .addTo(map)
          .bindPopup(popupContent);
      }
    }

    initMap();

    return () => {
      controller.abort();
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [saints]);

  return <div ref={mapRef} className="h-[60vh] w-full rounded-xl" />;
}
