import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conselheiro Espiritual IA',
  description: 'Converse com a IA sobre santos, orações e vida espiritual.',
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Conselheiro Espiritual
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pergunte sobre santos, orações e vida espiritual
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center">
        <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-sm text-muted-foreground">
          Chat com IA em breve — Fase 3 do desenvolvimento.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Integração com Claude API + RAG sobre biografias e Catecismo.
        </p>
      </div>

      <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        Este é um assistente de IA. Para orientação espiritual pessoal, procure um sacerdote.
      </div>
    </div>
  );
}
