import type { Metadata } from 'next';
import { DonationForm } from '@/components/donations/donation-form';
import { DonationWall } from '@/components/donations/donation-wall';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Apoiar o SantoDia',
  description:
    'Apoie o SantoDia com uma doação via Pix. 100% gratuito, sustentado pela comunidade.',
};

export default function ApoiarPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
          Apoiar o SantoDia
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O SantoDia é 100% gratuito e sem anúncios. Sua doação ajuda a manter o app funcionando e
          leva a vida dos santos a milhares de católicos.
        </p>
      </div>

      <div className="mt-8">
        <DonationForm />
      </div>

      <div className="mt-12">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-lg text-foreground">
          Mural de Apoiadores
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Pessoas que ajudam a manter o SantoDia vivo
        </p>
        <DonationWall />
      </div>

      {/* Transparency */}
      <section className="mt-12 rounded-xl border border-border p-6">
        <h2 className="font-[family-name:var(--font-dm-serif)] text-lg text-foreground">
          Transparência
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada centavo doado é usado exclusivamente para manter e melhorar o SantoDia:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Infraestrutura (servidores, banco de dados, domínio)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Inteligência Artificial (chat espiritual, geração de áudio)
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Desenvolvimento e melhorias contínuas
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Uma aplicação da{' '}
          <a
            href="https://www.fsjpii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Fraternidade São João Paulo II
          </a>
        </p>
      </section>
    </div>
  );
}
