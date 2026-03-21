'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-4xl text-foreground">
        Algo deu errado
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ocorreu um erro inesperado. Por favor, tente novamente.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-gold px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark"
      >
        Tentar novamente
      </button>
    </div>
  );
}
