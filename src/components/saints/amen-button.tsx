'use client';

import { HandHeart } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

interface AmenButtonProps {
  saintId: string;
  className?: string;
}

export function AmenButton({ saintId, className = '' }: AmenButtonProps) {
  const [total, setTotal] = useState(0);
  const [sentToday, setSentToday] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    fetch(`/api/amens?saintId=${saintId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total ?? 0);
        setSentToday(data.userSentToday ?? false);
      })
      .catch(() => {});
  }, [saintId]);

  function handleSendAmen() {
    if (sentToday) return;

    startTransition(async () => {
      const res = await fetch('/api/amens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saintId }),
      });
      if (res.ok) {
        const data = await res.json();
        setTotal(data.total);
        setSentToday(true);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1500);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleSendAmen}
      disabled={isPending || sentToday}
      className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        sentToday ? 'bg-gold/20 text-gold' : 'bg-gold text-primary-foreground hover:bg-gold-dark'
      } ${isPending ? 'opacity-50' : ''} ${className}`}
    >
      <HandHeart className={`h-4 w-4 ${showAnimation ? 'animate-bounce' : ''}`} />
      <span>{sentToday ? 'Amém enviado' : 'Amém'}</span>
      {total > 0 && (
        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
          {total.toLocaleString('pt-BR')}
        </span>
      )}
    </button>
  );
}
