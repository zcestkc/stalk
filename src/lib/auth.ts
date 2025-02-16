import { AuthResponse, User } from '@/types/api';
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';
import { api } from './api-client';

export const getUser = async (): Promise<User> => {
  const response = (await api.get('/auth/me')) as { data: User };

  return response.data;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithUsernameAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
};

export const loginInputSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(3, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithUsernameAndPassword = (
  data: LoginInput,
): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};
