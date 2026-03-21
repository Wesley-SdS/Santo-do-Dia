'use client';

import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { Sidebar } from './sidebar';
import { UserMenu } from '@/components/auth/user-menu';

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <img src="/images/fsjpii-logo.png" alt="FSJPII" className="h-8 w-8" />
            <span className="font-[family-name:var(--font-dm-serif)] text-xl text-gold">
              Santo
            </span>
            <span className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
              Dia
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/explorar"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Buscar santos"
            >
              <Search className="h-5 w-5" />
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
