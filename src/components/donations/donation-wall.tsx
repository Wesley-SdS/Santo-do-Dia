import { prisma } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';

export async function DonationWall() {
  let donations: Array<{ id: string; displayName: string | null; amountCents: number; confirmedAt: Date | null }> = [];

  try {
    donations = await prisma.donation.findMany({
      where: { status: 'CONFIRMED', anonymous: false },
      select: { id: true, displayName: true, amountCents: true, confirmedAt: true },
      orderBy: { confirmedAt: 'desc' },
      take: 20,
    });
  } catch {
    // DB not available yet
  }

  if (donations.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Seja o primeiro a apoiar o SantoDia!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="flex items-center justify-between rounded-lg bg-card p-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-xs font-medium text-gold">
              {(donation.displayName ?? 'A').charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-foreground">
              {donation.displayName ?? 'Anônimo'}
            </span>
          </div>
          <span className="text-sm font-medium text-gold">
            {formatCurrency(donation.amountCents)}
          </span>
        </div>
      ))}
    </div>
  );
}
