'use client';

import { api } from '@/lib/api-client';
import React, { useEffect, useState } from 'react';

export const TestClientComponent = () => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get('/stock-items');

      setResult(response);
    };
    fetch();
  }, []);
  return (
    <>
      {result.map(({ amount }, i) => (
        <React.Fragment key={i}>{amount}</React.Fragment>
      ))}
    </>
  );
};
