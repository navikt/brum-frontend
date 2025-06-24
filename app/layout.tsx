import type { Metadata } from 'next';
import '@navikt/ds-css';
import { Page, InternalHeader, Spacer } from '@navikt/ds-react';
import { InternalHeaderButton, InternalHeaderTitle, } from '@navikt/ds-react/InternalHeader';
import LoginButton from './components/loginbtn';

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
            <LoginButton />
          </InternalHeader>
          {children}
        </Page>
      </body>
    </html>
  );
};

export default RootLayout;
