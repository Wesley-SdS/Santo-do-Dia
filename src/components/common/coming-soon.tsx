import type { LucideIcon } from 'lucide-react';
import { Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  features?: string[];
}

export function ComingSoon({ title, description, Icon, features }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
      <div className="flex flex-col items-center pt-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
          <Icon className="h-8 w-8 text-gold" />
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-dm-serif)] text-2xl text-foreground">
          {title}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>

        <div className="mt-6 flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2">
          <Clock className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium text-gold">Em breve</span>
        </div>

        {features && features.length > 0 && (
          <div className="mt-8 w-full max-w-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              O que esperar
            </p>
            <ul className="mt-3 space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-lg bg-card px-4 py-2.5 text-left text-sm text-foreground shadow-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
