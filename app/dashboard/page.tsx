'use client';
import DataDisplay from '@/common/components/DataDisplay';
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
      <Page.Block width="2xl" as="main">
        <VStack gap="3" margin="2" align="center">
          <Heading level="1" size="xlarge">
            Dashboard
          </Heading>
          <BodyShort>Velkommen til Brum Dashboard!</BodyShort>
          <BodyShort>Her kan du se statistikk og annen informasjon.</BodyShort>
        </VStack>
        <DataDisplay />
      </Page.Block>
    </Page>
  );
}
