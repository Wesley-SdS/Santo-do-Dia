'use client';

import { Check, Copy, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { APP_NAME, APP_URL } from '@/constants';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  imageUrl?: string | null;
  className?: string;
}

export function ShareButton({ title, text, url, className = '' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `${APP_URL}${url}`;
  const shareText = `${text}\n\n${fullUrl}\n\nVia ${APP_NAME}`;

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: fullUrl });
      } catch {
        /* user cancelled */
      }
      return;
    }
    setShowMenu((prev) => !prev);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(`${text}\n\n${fullUrl}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowMenu(false);
    }, 1500);
  }

  function handleWhatsApp() {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    setShowMenu(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleNativeShare}
        className={`flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground ${className}`}
      >
        <Share2 className="h-3.5 w-3.5" />
        Compartilhar
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute bottom-full right-0 z-50 mb-2 w-48 rounded-xl bg-card p-2 shadow-lg">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-foreground hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4 text-green-500" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-foreground hover:bg-muted"
            >
              {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado!' : 'Copiar link'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
