import { MAX_DONATION_CENTS, MIN_DONATION_CENTS } from '@/constants';
import { ValidationError } from '@/lib/errors';
import { createChildLogger } from '@/lib/logger';
import * as donationsRepo from './donations.repository';
import type { CreateDonationInput, PixCharge } from './donations.types';

const logger = createChildLogger({ module: 'donations.service' });

function validateAmount(amountCents: number): number {
  if (amountCents < MIN_DONATION_CENTS) {
    throw new ValidationError('Valor mínimo é R$ 1,00', { amountCents, min: MIN_DONATION_CENTS });
  }
  if (amountCents > MAX_DONATION_CENTS) {
    throw new ValidationError('Valor máximo é R$ 10.000,00', {
      amountCents,
      max: MAX_DONATION_CENTS,
    });
  }
  return amountCents;
}

export async function createDonation(input: CreateDonationInput) {
  const operationLogger = logger.child({
    operation: 'createDonation',
    amountCents: input.amountCents,
  });
  operationLogger.info('Creating donation');

  const validatedAmount = validateAmount(input.amountCents);

  const txid = generateTxid();
  operationLogger.debug({ txid }, 'Generated txid');

  // In production, this would call the Pix gateway to create a charge
  const pixCharge: PixCharge = {
    txid,
    qrCode: `00020126580014br.gov.bcb.pix0136${txid}`,
    qrCodeBase64: '',
    pixCopyPaste: `00020126580014br.gov.bcb.pix0136${txid}`,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  };

  const donation = await donationsRepo.createDonation({
    amountCents: validatedAmount,
    txid,
    userId: input.userId,
    displayName: input.displayName,
    anonymous: input.anonymous,
  });

  operationLogger.info({ donationId: donation.id, txid }, 'Donation created');

  return { donation, pixCharge };
}

export async function confirmDonation(txid: string, e2eid: string) {
  const operationLogger = logger.child({ operation: 'confirmDonation', txid });
  operationLogger.info('Confirming donation');

  const donation = await donationsRepo.updateDonationStatus(txid, 'CONFIRMED', e2eid);
  operationLogger.info({ donationId: donation.id }, 'Donation confirmed');

  return donation;
}

export async function getRecentDonations() {
  return donationsRepo.getRecentDonations();
}

export async function getDonationStats() {
  return donationsRepo.getDonationStats();
}

function generateTxid(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 35; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
