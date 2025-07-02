'use client';

import { Button, Heading, Page, VStack } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const route = useRouter();

  const handleGoToDashboardClick = () => {
    route.push('/dashboard');
  };

  return (
    <Page>
      <Page.Block as="main" width="2xl" gutters>
        <VStack margin="4" gap="4" align="center">
          <Heading level="1" size="xlarge">
            Velkommen til Brum
          </Heading>
          <Heading level="2" size="small">
            Analyse av tiltak
          </Heading>
          <Button variant="primary" onClick={handleGoToDashboardClick}>
            Gå til Dashboard
          </Button>
        </VStack>
      </Page.Block>
    </Page>
  );
};

export default Home;
