'use client';

import { useCrypto } from '@/features/cryptos/api/get-crypto';
import { CryptoView } from '@/features/cryptos/components/crypto-view';

export const Crypto = ({ cryptoId }: { cryptoId: string }) => {
  const cryptoQuery = useCrypto({ cryptoId });
  return <CryptoView cryptoId={cryptoId} />;
};
