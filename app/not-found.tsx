import { Alert, BodyShort, Box, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { PageBlock } from '@navikt/ds-react/Page';

const NotFound = () => {
  return (
    <PageBlock width="xl" gutters>
      <Box paddingBlock="20 16" data-aksel-template="404-golden-path">
        <VStack gap="space-40">
          <Alert variant="warning">
            <BodyShort>
              Dette er en veldig enkel mal som er hardkoded i Golden Path artikkelen, og kan
              muligens være utdatert. For å se den mest oppdaterte versjonen av malene til aksel kan
              du besøke{' '}
              <Link href="https://aksel.nav.no/monster-maler/stotte/404-side">
                siden til Aksel malen for 404 sider.
              </Link>
            </BodyShort>
          </Alert>
          <div>
            <Heading level="1" size="large" spacing>
              Beklager, vi fant ikke siden
            </Heading>
            <BodyShort>
              Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
            </BodyShort>
            <List>
              <ListItem>Bruk gjerne søket eller menyen</ListItem>
              <ListItem>
                <Link href="#">Gå til forsiden</Link>
              </ListItem>
            </List>
          </div>
        </VStack>
      </Box>
    </PageBlock>
  );
};

export default NotFound;
