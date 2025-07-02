'use client';
import Graph from '@/common/components/graph';
import { PageBlock } from '@navikt/ds-react/Page';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch('/api/gjennomforinger')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.text();
      })
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, [setData]);
  console.log(data);
  return (
    <PageBlock>
      <h1>Dashboard</h1>
      <p>Velkommen til Brum Dashboard!</p>
      <p>Her kan du se statistikk og annen informasjon.</p>

      <Graph />
    </PageBlock>
  );
}
