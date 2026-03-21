'use client';

import { Baby, Lock, X } from 'lucide-react';
import { useState } from 'react';

interface KidsModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean, pin?: string) => void;
  hasPin: boolean;
}

export function KidsModeToggle({ enabled, onToggle, hasPin }: KidsModeToggleProps) {
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'enable' | 'disable' | 'setPin'>('enable');

  function handleToggle() {
    if (enabled) {
      if (hasPin) {
        setMode('disable');
        setShowPinDialog(true);
      } else {
        onToggle(false);
      }
    } else {
      if (!hasPin) {
        setMode('setPin');
        setShowPinDialog(true);
      } else {
        onToggle(true);
      }
    }
  }

  function handleSubmitPin() {
    if (pin.length !== 4) {
      setError('PIN deve ter 4 dígitos');
      return;
    }
    onToggle(mode !== 'disable', pin);
    setShowPinDialog(false);
    setPin('');
    setError('');
  }

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
          enabled
            ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        <Baby className="h-4 w-4" />
        {enabled ? 'Modo Kids Ativo' : 'Modo Kids'}
        {hasPin && <Lock className="h-3 w-3" />}
      </button>

      {showPinDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xs rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">
                {mode === 'setPin' ? 'Definir PIN Parental' : 'Digite o PIN'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowPinDialog(false);
                  setPin('');
                  setError('');
                }}
                className="text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {mode === 'setPin'
                ? 'Crie um PIN de 4 dígitos para controle parental.'
                : 'Digite o PIN para desativar o modo kids.'}
            </p>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setError('');
              }}
              placeholder="0000"
              className="mt-3 w-full rounded-lg border border-border bg-background p-3 text-center text-lg tracking-widest focus:border-gold focus:outline-none"
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            <button
              type="button"
              onClick={handleSubmitPin}
              className="mt-3 w-full rounded-lg bg-gold py-2.5 text-sm font-medium text-primary-foreground"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
