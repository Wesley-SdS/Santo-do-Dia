import { Moon } from 'lucide-react';
import type { Metadata } from 'next';
import { ComingSoon } from '@/components/common/coming-soon';

export const metadata: Metadata = {
  title: 'Reflexão Noturna — SantoDia',
  description: 'Momento de oração e reflexão antes de dormir.',
};

export default function ReflexaoPage() {
  return (
    <ComingSoon
      title="Reflexão Noturna"
      description="Encerre seu dia com um momento de oração, sons ambiente e reflexão guiada. Tela escurecida para não atrapalhar o sono."
      Icon={Moon}
      features={[
        'Sons ambiente (chuva, natureza, gregoriano)',
        'Timer de oração com contagem regressiva',
        'Tela escurecida para reflexão',
        'Exame de consciência guiado',
        'Oração da noite personalizada',
      ]}
    />
  );
}
