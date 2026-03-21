import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Faça login no SantoDia para salvar seus santos favoritos, streaks e muito mais.',
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/perfil');
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-12">
      <div className="text-center">
        <img src="/images/fsjpii-logo.png" alt="FSJPII" className="mx-auto h-16 w-16" />
        <h1 className="mt-4 font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
          Entrar no SantoDia
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Salve seus favoritos, acompanhe seus streaks e viva a jornada com seu santo padroeiro.
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Ao entrar, você concorda com os termos de uso do SantoDia.
        <br />
        Seus dados são protegidos conforme a LGPD.
      </p>
    </div>
  );
}
