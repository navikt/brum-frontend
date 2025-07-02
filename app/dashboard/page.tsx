'use client';
import Graph from '@/common/components/graph';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
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
    <Page>
      <Page.Block as="main" width="2xl" gutters>
        <VStack margin="4" gap="4" align="center">
          <Heading level="1" size="xlarge">
            Dashboard
          </Heading>
          <BodyShort>Velkommen til Brum Dashboard!</BodyShort>
          <BodyShort>Her kan du se statistikk og annen informasjon.</BodyShort>
          Analyse av tiltak
          <Graph />
        </VStack>
      </Page.Block>
    </Page>
  );
}
