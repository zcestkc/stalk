import { paths } from '@/config/paths';
import Link from 'next/link';

export const metadata = {
  title: 'Cryptos',
  description: 'Cryptos',
};

const CryptosPage = () => {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="mb-2">Cryptos page</h1>
        <Link href={paths.app.cryptos.getHref() + '/BTC'}>Go to BTC</Link>
      </main>
    </div>
  );
};

export default CryptosPage;
