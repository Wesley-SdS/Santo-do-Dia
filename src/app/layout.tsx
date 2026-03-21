import type { Metadata, Viewport } from 'next';
import { DM_Sans, DM_Serif_Display, Inter } from 'next/font/google';
import { SessionProvider } from '@/components/auth/session-provider';
import { ThemeProvider } from '@/components/common/theme-provider';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Header } from '@/components/layout/header';
import { OrganizationJsonLd } from '@/components/seo/organization-jsonld';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SantoDia — Seu companheiro de fé, todos os dias',
    template: '%s | SantoDia',
  },
  description:
    'Conheça o santo do dia, sorteie seu santo padroeiro do ano, reze novenas e aprofunde sua fé com o SantoDia. 100% gratuito, uma aplicação da Fraternidade São João Paulo II.',
  keywords: [
    'santo do dia',
    'santos católicos',
    'santo padroeiro',
    'novena',
    'oração',
    'calendário litúrgico',
    'FSJPII',
  ],
  authors: [{ name: 'Fraternidade São João Paulo II' }],
  icons: {
    icon: [{ url: '/images/fsjpii-logo.png', sizes: 'any' }],
    apple: '/images/fsjpii-logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SantoDia',
    title: 'SantoDia — Seu companheiro de fé, todos os dias',
    description: 'O app definitivo de Santos Católicos. 100% gratuito.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1625' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmSerif.variable} ${inter.variable}`}
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <OrganizationJsonLd />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <BottomNav />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
