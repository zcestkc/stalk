'use client';

import { useCrypto } from '@/features/crypto/api/get-crypto';
import { CryptoView } from '@/features/crypto/components/crypto-view';

export const Crypto = ({ cryptoId }: { cryptoId: string }) => {
  const crypto = useCrypto({ cryptoId });

  return <CryptoView cryptoId={cryptoId} />;
};
