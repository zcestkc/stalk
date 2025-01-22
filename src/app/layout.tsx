import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AppProvider } from '@/app/provider';

export const metadata: Metadata = {
  title: 'Stalk',
  description: 'Bookmark your favourite stocks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
