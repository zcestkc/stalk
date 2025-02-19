'use client';

import { ContentLayout } from '@/components/layouts/content-layout';
import { api } from '@/lib/api-client';
import { useEffect, useState } from 'react';
import { TestClientComponent } from './test-client-component';

export const Home = () => {
  // const response = await api.get('/stock-items');

  const [response, setResponse] = useState([]);

  useEffect(() => {
    const test = async () => {
      const res = await api.get('/stock-items');
      setResponse(res);
    };
    test();
  }, []);

  return (
    <ContentLayout title="Home">
      <h1 className="text-xl">Welcome</h1>
      {response.map(({ name, amount }, i) => (
        <p key={i}>
          {name} {amount}
        </p>
      ))}
      <TestClientComponent />
    </ContentLayout>
  );
};
