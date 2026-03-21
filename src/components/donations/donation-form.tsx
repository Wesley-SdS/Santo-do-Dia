'use client';

import { useState } from 'react';
import { Heart, Copy, Check, QrCode } from 'lucide-react';

const QUICK_VALUES = [
  { cents: 500, label: 'R$ 5' },
  { cents: 1000, label: 'R$ 10' },
  { cents: 2500, label: 'R$ 25' },
  { cents: 5000, label: 'R$ 50' },
];

type Step = 'select' | 'qrcode' | 'success';

export function DonationForm() {
  const [step, setStep] = useState<Step>('select');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pixCode, setPixCode] = useState('');

  const amountCents = selectedAmount ?? Math.round(parseFloat(customAmount || '0') * 100);

  async function handleGeneratePix() {
    if (amountCents < 100) return;
    setLoading(true);

    try {
      const res = await fetch('/api/pix/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountCents / 100 }),
      });

      if (res.ok) {
        const data = await res.json();
        setPixCode(data.pixCopyPaste ?? `santododia-pix-${Date.now()}`);
        setStep('qrcode');
      }
    } catch {
      // Fallback: show static Pix key
      setPixCode('santododia@fsjpii.com');
      setStep('qrcode');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (step === 'success') {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-deep-blue to-deep-blue/90 p-8 text-center text-white">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
          <Heart className="h-8 w-8 text-gold" />
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-dm-serif)] text-xl">
          Deus lhe pague!
        </h3>
        <p className="mt-2 text-sm text-white/80">
          Sua doação ajuda a levar a vida dos santos a milhares de católicos.
          Que o santo do dia interceda por você e sua família.
        </p>
        <button
          type="button"
          onClick={() => { setStep('select'); setSelectedAmount(null); setCustomAmount(''); }}
          className="mt-6 rounded-xl bg-gold px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Fazer outra doação
        </button>
      </div>
    );
  }

  if (step === 'qrcode') {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-lg">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Doação de</p>
          <p className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amountCents / 100)}
          </p>
        </div>

        {/* QR Code placeholder */}
        <div className="mt-6 flex justify-center" data-testid="pix-qr-code">
          <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
            <QrCode className="h-16 w-16 text-muted-foreground/30" />
          </div>
        </div>

        {/* Pix Copy-Paste */}
        <div className="mt-4" data-testid="pix-copy-paste">
          <p className="text-center text-xs text-muted-foreground">Pix Copia e Cola</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              readOnly
              value={pixCode}
              className="flex-1 truncate rounded-lg border border-input bg-muted px-3 py-2 text-xs text-foreground"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg bg-gold px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-gold-dark"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Expira em 30 minutos
        </p>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setStep('select')}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={() => setStep('success')}
            className="flex-1 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark"
          >
            Já paguei
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      <h3 className="text-center text-sm font-medium text-foreground">
        Escolha um valor
      </h3>

      {/* Quick Values */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {QUICK_VALUES.map(({ cents, label }) => (
          <button
            key={cents}
            type="button"
            onClick={() => { setSelectedAmount(cents); setCustomAmount(''); }}
            className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
              selectedAmount === cents
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-border text-foreground hover:border-gold/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom Value */}
      <div className="mt-4">
        <label htmlFor="custom-amount" className="text-xs text-muted-foreground">
          Outro valor
        </label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            R$
          </span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            max="10000"
            step="0.01"
            placeholder="0,00"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Generate Pix Button */}
      <button
        type="button"
        onClick={handleGeneratePix}
        disabled={amountCents < 100 || loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
        ) : (
          <>
            <Heart className="h-4 w-4" />
            Gerar Pix
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Doação única via Pix. Seguro e instantâneo.
      </p>
    </div>
  );
}
