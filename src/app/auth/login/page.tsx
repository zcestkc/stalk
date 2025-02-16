'use client';

import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/login-form';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  return (
    <LoginForm
      onSuccess={() =>
        router.replace(
          `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.app.home.getHref()}`,
        )
      }
    />
  );
};

export default LoginPage;
