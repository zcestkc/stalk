import Image from 'next/image';

export const metadata = {
  title: 'Home',
  description: 'Home',
};

const DashboardPage = () => {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="mb-2">Home page</h1>
      </main>
    </div>
  );
};

export default DashboardPage;
