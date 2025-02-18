import { api } from '@/lib/api-client';
import { Home } from './_components/home';

export const metadata = {
  title: 'Home',
  description: 'Home',
};

const DashboardPage = () => {
  const fetchData = async () => {
    const response = await api.get('/stock-items');
    console.log('works', response);
  };
  fetchData();
  return <Home />;
};

export default DashboardPage;
