import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verificar Email',
};

export default function VerificarPage() {
  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
        <Mail className="h-8 w-8 text-gold" />
      </div>
      <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Verifique seu email
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Enviamos um link de acesso para o seu email. Clique no link para entrar no SantoDia.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Pode levar alguns minutos. Verifique também a pasta de spam.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-block text-sm text-gold hover:underline"
      >
        Voltar para login
      </Link>
    </div>
  );
}
