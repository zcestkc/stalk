import { ContentLayout } from '@/components/layouts/content-layout';
import { api } from '@/lib/api-client';

export const Home = async () => {
  const response = await api.get('/stock-items');

  return (
    <ContentLayout title="Home">
      <h1 className="text-xl">Welcome</h1>
      {response.map(({ name, amount }, i) => (
        <p key={i}>
          {name} {amount}
        </p>
      ))}
    </ContentLayout>
  );
};
