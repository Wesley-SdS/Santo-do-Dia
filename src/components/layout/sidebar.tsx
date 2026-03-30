'use client';

import {
  Baby,
  BookOpen,
  Calendar,
  Compass,
  Headphones,
  Heart,
  Home,
  Info,
  MapPin,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  User,
  Users,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Início' },
  { href: '/calendario', icon: Calendar, label: 'Calendário Litúrgico' },
  { href: '/explorar', icon: Compass, label: 'Explorar Santos' },
  { href: '/meu-santo', icon: Sparkles, label: 'Meu Santo do Ano' },
  { href: '/diario', icon: BookOpen, label: 'Diário Espiritual' },
  { href: '/mapa', icon: MapPin, label: 'Mapa dos Santos' },
  { href: '/kids', icon: Baby, label: 'Modo Kids' },
  { href: '/comunidade', icon: Users, label: 'Comunidade' },
  { href: '/chat', icon: MessageCircle, label: 'Conselheiro IA' },
  { href: '/audio', icon: Headphones, label: 'Áudio' },
  { href: '/reflexao', icon: Moon, label: 'Reflexão Noturna' },
  { href: '/perfil', icon: User, label: 'Meu Perfil' },
] as const;

export function Sidebar({ open, onClose }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity"
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          role="button"
          tabIndex={0}
          aria-label="Fechar menu"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-card shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <img src="/images/fsjpii-logo.png" alt="FSJPII" className="h-8 w-8" />
            <div>
              <span className="font-[family-name:var(--font-dm-serif)] text-xl text-gold">
                Santo
              </span>
              <span className="font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
                Dia
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="mb-3 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-muted-foreground" />
              )}
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </span>
            <div
              className={`relative h-6 w-11 rounded-full transition-colors ${theme === 'dark' ? 'bg-gold' : 'bg-muted-foreground/30'}`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`}
              />
            </div>
          </button>

          <Link
            href="/apoiar"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg bg-gold/10 px-3 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
          >
            <Heart className="h-5 w-5" />
            Apoiar o SantoDia
          </Link>
          <div className="mt-3 flex items-center gap-2 px-3 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            <span>Uma aplicação da FSJPII</span>
          </div>
        </div>
      </aside>
    </>
  );
}
