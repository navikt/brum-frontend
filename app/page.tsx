'use client';
import { BarChartIcon } from '@navikt/aksel-icons';
import '@navikt/ds-css/darkside';
import { BodyShort, GuidePanel, Heading, LinkCard, Page, VStack } from '@navikt/ds-react';

const Home = () => {
  return (
    <Page>
      <Page.Block as="main" width="2xl" gutters>
        <VStack margin="6" gap="6" align="center">
          <Heading level="1" size="xlarge">
            Velkommen til Brum
          </Heading>
          <GuidePanel poster>
            <BodyShort>Du er nå i Brum Dashboard.</BodyShort>
            <BodyShort>Her får du innsikt i statistikk og tiltak fra ulike avdelinger.</BodyShort>
          </GuidePanel>
          <LinkCard style={{ width: '100%', maxWidth: 500, minHeight: 120, padding: '1.5rem' }}>
            <LinkCard.Icon>
              <BarChartIcon fontSize="3rem" />
            </LinkCard.Icon>
            <LinkCard.Title>
              <LinkCard.Anchor href="/dashboard">Gå til dashboard</LinkCard.Anchor>
            </LinkCard.Title>
          </LinkCard>
        </VStack>
      </Page.Block>
    </Page>
  );
};

export default Home;
