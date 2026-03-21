'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">Entrar</span>
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gold/10 transition-colors hover:bg-gold/20"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? ''}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-4 w-4 text-gold" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="border-b border-border p-3">
            <p className="text-sm font-medium text-foreground truncate">
              {session.user.name ?? 'Peregrino'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
          <div className="p-1">
            <Link
              href="/perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Meu Perfil
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
