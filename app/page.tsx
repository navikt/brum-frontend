'use client';

import { BarChartIcon } from '@navikt/aksel-icons';
import { Box, Heading, LinkCard, Page, VStack } from '@navikt/ds-react';

const Home = () => {
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
          <LinkCard data-color="Lightblue">
            <Box
              asChild
              borderRadius="12"
              padding="space-8"
              style={{ backgroundColor: 'GrayAlpha' }}
            >
              <LinkCard.Icon>
                <BarChartIcon fontSize="2rem" />
              </LinkCard.Icon>
            </Box>
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
