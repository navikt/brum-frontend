import type { Metadata } from 'next';
import '@navikt/ds-css';
import { Page, InternalHeader, Spacer, ActionMenu } from '@navikt/ds-react';
import { InternalHeaderTitle, InternalHeaderButton } from '@navikt/ds-react/InternalHeader';
import Graph from '@/common/components/graph';
import { ActionMenuContent, ActionMenuTrigger } from '@navikt/ds-react/ActionMenu';

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
            <ActionMenu>
              <ActionMenuTrigger>
                <InternalHeaderButton>Se graf</InternalHeaderButton>
              </ActionMenuTrigger>
              <ActionMenuContent>
                <div style={{ minWidth: 500 }}>
                  <Graph filnavn="xyz" />{' '}
                </div>
              </ActionMenuContent>
            </ActionMenu>
          </InternalHeader>
          {children}
        </Page>
      </body>
    </html>
  );
};

export default RootLayout;
