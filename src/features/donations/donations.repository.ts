import { prisma } from '@/lib/db';
import type { Donation, DonationStatus } from '@prisma/client';

export async function createDonation(data: {
  amountCents: number;
  txid: string;
  userId?: string;
  displayName?: string;
  anonymous?: boolean;
}): Promise<Donation> {
  return prisma.donation.create({
    data: {
      amountCents: data.amountCents,
      txid: data.txid,
      userId: data.userId,
      displayName: data.displayName,
      anonymous: data.anonymous ?? true,
      status: 'PENDING',
    },
  });
}

export async function updateDonationStatus(
  txid: string,
  status: DonationStatus,
  e2eid?: string,
): Promise<Donation> {
  return prisma.donation.update({
    where: { txid },
    data: {
      status,
      e2eid,
      confirmedAt: status === 'CONFIRMED' ? new Date() : undefined,
    },
  });
}

export async function findDonationByTxid(txid: string): Promise<Donation | null> {
  return prisma.donation.findUnique({ where: { txid } });
}

export async function getRecentDonations(limit = 20): Promise<Donation[]> {
  return prisma.donation.findMany({
    where: { status: 'CONFIRMED', anonymous: false },
    orderBy: { confirmedAt: 'desc' },
    take: limit,
  });
}

export async function getDonationStats(): Promise<{
  totalAmount: number;
  totalDonors: number;
  monthlyAmount: number;
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [allTime, monthly] = await Promise.all([
    prisma.donation.aggregate({
      where: { status: 'CONFIRMED' },
      _sum: { amountCents: true },
      _count: { id: true },
    }),
    prisma.donation.aggregate({
      where: { status: 'CONFIRMED', confirmedAt: { gte: startOfMonth } },
      _sum: { amountCents: true },
    }),
  ]);

  return {
    totalAmount: allTime._sum.amountCents ?? 0,
    totalDonors: allTime._count.id,
    monthlyAmount: monthly._sum.amountCents ?? 0,
  };
}
