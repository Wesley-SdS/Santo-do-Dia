'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  async function handleGoogleLogin() {
    setLoading('google');
    await signIn('google', { callbackUrl: '/perfil' });
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading('email');
    await signIn('resend', { email, callbackUrl: '/perfil' });
    setEmailSent(true);
    setLoading(null);
  }

  if (emailSent) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <Mail className="h-7 w-7 text-gold" />
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-dm-serif)] text-xl text-foreground">
          Verifique seu email
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enviamos um link de acesso para <strong className="text-foreground">{email}</strong>.
          Clique no link para entrar.
        </p>
        <button
          type="button"
          onClick={() => setEmailSent(false)}
          className="mt-6 text-sm text-gold hover:underline"
        >
          Usar outro email
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading !== null}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
      >
        {loading === 'google' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        Continuar com Google
      </button>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Email Magic Link */}
      <form onSubmit={handleEmailLogin}>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={!email || loading !== null}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark disabled:opacity-50"
        >
          {loading === 'email' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          Enviar link de acesso
        </button>
      </form>
    </div>
  );
}
