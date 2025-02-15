import { env } from '@/config/env';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Crypto } from '@/types/api';
import { getTimeUntilEndOfDay } from '@/utils/eod';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCrypto = ({
  cryptoId,
}: {
  cryptoId: string;
}): Promise<Crypto> => {
  const apikey = env.ALPHA_VANTAGE_API_KEY;

  return api.get('https://www.alphavantage.co/query', {
    params: {
      function: 'DIGITAL_CURRENCY_DAILY',
      market: 'USD',
      symbol: cryptoId,
      apikey,
    },
    external: true,
  });
};

export const getCryptoQueryOptions = (cryptoId: string) => {
  return queryOptions({
    queryKey: ['cryptos', cryptoId],
    queryFn: () => getCrypto({ cryptoId }),
    staleTime: getTimeUntilEndOfDay(),
  });
};

type UseCryptoOptions = {
  cryptoId: string;
  queryConfig?: QueryConfig<typeof getCryptoQueryOptions>;
};

export const useCrypto = ({ cryptoId, queryConfig }: UseCryptoOptions) => {
  return useQuery({
    ...getCryptoQueryOptions(cryptoId),
    ...queryConfig,
  });
};
