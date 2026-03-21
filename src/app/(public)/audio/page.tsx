import { Headphones } from 'lucide-react';
import type { Metadata } from 'next';
import { ComingSoon } from '@/components/common/coming-soon';

export const metadata: Metadata = {
  title: 'Áudio — SantoDia',
  description: 'Ouça histórias de santos narradas e podcasts diários.',
};

export default function AudioPage() {
  return (
    <ComingSoon
      title="Áudio & Podcast"
      description="Ouça a história do santo do dia narrada com voz natural. Perfeito para o caminho do trabalho ou antes de dormir."
      Icon={Headphones}
      features={[
        'Narração com voz natural (OpenAI TTS)',
        'Podcast diário do santo do dia',
        'Player com controles de velocidade',
        'Download para ouvir offline',
        'Modo noturno com timer',
      ]}
    />
  );
}
