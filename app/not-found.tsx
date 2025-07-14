import React from "react";
import {
  Alert,
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  VStack,
} from "@navikt/ds-react";
import { Page, PageBlock } from "@navikt/ds-react/Page";
import { ListItem } from "@navikt/ds-react/List";

const NotFound = () => {
  return (
    <Page>
      <PageBlock as="main" width="xl" gutters>
        <Box paddingBlock="20 8">
          <Alert variant="error" size="medium">
            404 - Siden ble ikke funnet
          </Alert>
          <div>
            <Heading level="1" size="large" spacing>
              Beklager, vi fant ikke siden
            </Heading>
            <BodyShort>
              Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
            </BodyShort>
            <List>
              <ListItem>
                <Link href="#">Gå til forsiden</Link>
              </ListItem>
            </List>
          </div>
        </Box>
      </PageBlock>
    </Page>
  );
};

export default NotFound;
