import type { Metadata } from 'next';
import '@navikt/ds-css';
import { Page, InternalHeader, Spacer} from '@navikt/ds-react';

import * as ds from '@navikt/ds-react';
import { InternalHeaderTitle } from '@navikt/ds-react/InternalHeader';
console.log(ds);


export const metadata: Metadata = {
  title: 'Brum',
  description: 'Frontend for Brum',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="no">
      <head></head>
      <body>
        <Page>
          <InternalHeader>
            <InternalHeaderTitle as="h1">Brum</InternalHeaderTitle>
            <Spacer />
          </InternalHeader>
          {children}
        </Page>
      </body>
    </html>
  );
};

export default RootLayout;
