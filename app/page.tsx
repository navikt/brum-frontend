'use client';

import { BarChartIcon } from '@navikt/aksel-icons';
import { Box, Heading, LinkCard, Page, VStack } from '@navikt/ds-react';
import '@navikt/ds-css/darkside';
import { Theme } from '@navikt/ds-react/Theme';

const Home = () => {
  return (
    <Theme theme="light">
      <Page>
        <Page.Block as="main" width="2xl" gutters>
          <VStack margin="4" gap="4" align="center">
            <Heading level="1" size="xlarge">
              Velkommen til Brum
            </Heading>
            <Heading level="2" size="small">
              Analyse av tiltak
            </Heading>
            <LinkCard>
              <LinkCard.Icon>
                <BarChartIcon fontSize="2rem" />
              </LinkCard.Icon>
              <LinkCard.Title>
                <LinkCard.Anchor href="/dashboard">Gå til dashboard</LinkCard.Anchor>
              </LinkCard.Title>
            </LinkCard>
          </VStack>
        </Page.Block>
      </Page>
    </Theme>
  );
};

export default Home;
