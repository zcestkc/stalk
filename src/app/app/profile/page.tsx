import { api } from '@/lib/api-client';
import { Profile } from './_components/profile';

export const metadata = {
  title: 'Profile',
  description: 'Profile',
};

const ProfilePage = async () => {
  const fetchData = async () => {
    const response = await api.get('/stock-items');
    console.log('here1', response);
  };
  fetchData();
  return <Profile />;
};

export default ProfilePage;
