'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer/drawer';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';
import { Bitcoin, Home, PanelLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const navigation = [
    { name: 'Home', to: paths.app.root.getHref(), icon: Home },
    {
      name: 'Cryptos',
      to: paths.app.cryptos.getHref(),
      icon: Bitcoin,
    },
    { name: 'Account', to: paths.app.profile.getHref(), icon: Users },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <nav className="flex flex-col gap-4 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.name}
                href={item.to}
                className={cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white',
                )}
              >
                <item.icon
                  className="text-gray-400 group-hover:text-gray-300 mr-4 size-6 shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
          <Link
            href={paths.home.getHref()}
            className="text-gray-300 hover:bg-gray-700 hover:text-white group rounded-md p-2 w-full text-base font-medium"
          >
            Log out
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              side="left"
              className="bg-black pt-10 text-white sm:max-w-60"
            >
              <nav className="grid gap-6 text-lg font-medium">
                <DrawerHeader>
                  <DrawerTitle>Navigation</DrawerTitle>
                </DrawerHeader>
                {navigation.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      href={item.to}
                      className={cn(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                        isActive && 'bg-gray-900 text-white',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'text-gray-400 group-hover:text-gray-300',
                          'mr-4 size-6 shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function Fallback({ error }: { error: Error }) {
  return <p>Error: {error.message ?? 'Something went wrong!'}</p>;
}

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <Layout>
      <ErrorBoundary key={pathname} FallbackComponent={Fallback}>
        {children}
      </ErrorBoundary>
    </Layout>
  );
};

export default HomeLayout;
