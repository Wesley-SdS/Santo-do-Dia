import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-6xl text-gold">404</h1>
      <p className="mt-4 text-lg text-foreground">Página não encontrada</p>
      <p className="mt-2 text-sm text-muted-foreground">O caminho que você procura não existe.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-gold px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark"
      >
        Voltar ao Início
      </Link>
    </div>
  );
}
