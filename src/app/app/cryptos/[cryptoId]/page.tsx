import { getCryptoQueryOptions } from '@/features/crypto/api/get-crypto';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Crypto } from './_components/Crypto';

export const metadata = {
  title: 'Cryptos',
  description: 'Cryptos',
};

const preloadData = async (cryptoId: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getCryptoQueryOptions(cryptoId));

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

const CryptoPage = async ({
  params,
}: {
  params: Promise<{
    cryptoId: string;
  }>;
}) => {
  const cryptoId = (await params).cryptoId;

  const { dehydratedState, queryClient } = await preloadData(cryptoId);

  const crypto = queryClient.getQueryData(
    getCryptoQueryOptions(cryptoId).queryKey,
  );

  if (!crypto?.data) return <div>Crypto not found</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Crypto cryptoId={cryptoId} />
    </HydrationBoundary>
  );
};

export default CryptoPage;
