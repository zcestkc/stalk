import { useLogin } from '@/lib/auth';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest'; // Use jest if needed
import { LoginForm } from '../login-form';

vi.mock('@/lib/auth', async () => {
  const actual =
    await vi.importActual<typeof import('@/lib/auth')>('@/lib/auth');
  return {
    ...actual,
    useLogin: vi.fn(),
  };
});

// Mock useSearchParams
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('LoginForm', () => {
  it('calls login.mutate with correct values when submitted', async () => {
    const onSuccess = vi.fn();
    (useLogin as jest.Mock).mockReturnValue({
      mutate: onSuccess,
      isPending: false,
    });

    render(<LoginForm onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
});
