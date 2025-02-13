'use client';

import { paths } from '@/config/paths';
import { Crypto } from '@/types/api';
import Link from 'next/link';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { testData } from '../../../../mock';
import { useCrypto } from '../api/get-crypto';

export const CryptoView = ({ cryptoId }: { cryptoId: string }) => {
  const cryptoQuery = useCrypto({
    cryptoId,
  });

  if (cryptoQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        Loading
      </div>
    );
  }

  const crypto = cryptoQuery.data;

  if (!crypto) return null;
  // console.log(crypto.Information); // this shows that you've hit limit
  const mockData: Crypto = JSON.parse(testData);
  const formattedData = Object.entries(
    mockData['Time Series (Digital Currency Daily)'],
  )
    .map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseFloat(values['5. volume']),
    }))
    .reverse();

  return (
    <div>
      <Link
        href={paths.app.cryptos.getHref()}
        className="flex items-center gap-2 text-gray-500"
      >
        Back to cryptos
      </Link>
      <div className="flex justify-between">
        {/* <h1>{crypto.Information}</h1>
         */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis orientation="right" domain={['auto', 'auto']} />
            <XAxis dataKey="date" />
            <Tooltip />
            <Legend />
            <Line dataKey="open" stroke="#8884d8" name="Open" dot={false} />
            {/* <Line dataKey="high" stroke="#82ca9d" name="High" />
            <Line dataKey="low" stroke="#ffc658" name="Low" />
            <Line dataKey="close" stroke="#ffc658" name="Close" />
            <Line dataKey="volume" stroke="#ffc658" name="Volume" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
