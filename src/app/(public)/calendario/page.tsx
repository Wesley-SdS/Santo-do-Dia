import type { Metadata } from 'next';
import { LiturgicalCalendar } from '@/components/calendar/liturgical-calendar';

export const metadata: Metadata = {
  title: 'Calendário Litúrgico',
  description: 'Calendário litúrgico com os santos de cada dia, cores litúrgicas e festas.',
};

export default function CalendarioPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
      <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
        Calendário Litúrgico
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Santos e festas litúrgicas de cada dia</p>
      <div className="mt-6">
        <LiturgicalCalendar />
      </div>
    </div>
  );
}
