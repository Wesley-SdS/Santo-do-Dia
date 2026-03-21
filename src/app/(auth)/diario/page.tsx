import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diário Espiritual',
  description: 'Registre suas graças, reflexões e orações no diário espiritual.',
};

export default function DiarioPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Diário Espiritual
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Registre graças recebidas, reflexões e momentos de oração
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          Faça login para acessar seu diário espiritual.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Em breve: login com email ou Google.
        </p>
      </div>
    </div>
  );
}
