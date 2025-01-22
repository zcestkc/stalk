import { queryOptions, useQuery } from '@tanstack/react-query';
import { User } from '@/types/api';

export const getUser = async (): Promise<User> => {
  // const response
  const mockUser: User = {
    firstName: 'Kwan',
    lastName: 'Chan',
    email: 'kwan.chan@example.com',
    role: 'ADMIN',
    teamId: 'team123',
    bio: 'This is a mock user.',
    id: '1',
    createdAt: new Date('2021-01-01').getTime(),
  };

  return Promise.resolve(mockUser);
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());
