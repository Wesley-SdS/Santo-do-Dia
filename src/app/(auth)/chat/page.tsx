import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { ComingSoon } from '@/components/common/coming-soon';

export const metadata: Metadata = {
  title: 'Conselheiro Espiritual IA',
  description: 'Converse com a IA sobre santos, orações e vida espiritual.',
};

export default function ChatPage() {
  return (
    <ComingSoon
      title="Conselheiro Espiritual IA"
      description="Converse com uma IA católica sobre santos, orações e vida espiritual. Com citação de fontes e respostas fiéis ao Magistério."
      Icon={MessageCircle}
      features={[
        'Chat com Claude API sobre santos e doutrina',
        'RAG com biografias e Catecismo da Igreja',
        'Citação de fontes em cada resposta',
        'System prompt católico aprovado',
        'Histórico de conversas',
      ]}
    />
  );
}
