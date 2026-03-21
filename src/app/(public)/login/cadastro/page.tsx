import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta no SantoDia.',
};

export default async function CadastroPage() {
  const session = await auth();
  if (session?.user) redirect('/perfil');

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-12">
      <div className="text-center">
        <img src="/images/fsjpii-logo.png" alt="FSJPII" className="mx-auto h-16 w-16" />
        <h1 className="mt-4 font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
          Criar Conta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Junte-se ao SantoDia e viva sua fé todos os dias.
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
