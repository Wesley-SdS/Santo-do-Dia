export interface CreateDonationInput {
  amountCents: number;
  userId?: string;
  displayName?: string;
  anonymous?: boolean;
}

export interface PixCharge {
  txid: string;
  qrCode: string;
  qrCodeBase64: string;
  pixCopyPaste: string;
  expiresAt: Date;
}

export interface DonationConfirmation {
  txid: string;
  e2eid: string;
  amount: number;
  timestamp: string;
}
