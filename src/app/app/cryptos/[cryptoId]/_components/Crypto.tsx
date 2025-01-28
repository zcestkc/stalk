import { useCrypto } from '@/features/cryptos/api/get-crypto';
import { CryptoView } from '@/features/cryptos/components/crypto-view';

export const Crypto = ({ cryptoId }: { cryptoId: string }) => {
  return <CryptoView cryptoId={cryptoId} />;
};
