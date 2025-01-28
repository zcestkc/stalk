'use client';

import { Link as LinkIcon } from 'lucide-react';
import { useCrypto } from '../api/get-crypto';
import { paths } from '@/config/paths';
import Link from 'next/link';

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

  return (
    <div>
      <div className="flex justify-between">
        <Link
          href={paths.home.getHref()}
          className="flex items-center gap-2 text-gray-500"
        >
          <LinkIcon size={16} />
          Back to home
        </Link>
      </div>
    </div>
  );
};
