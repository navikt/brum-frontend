import type { Metadata } from 'next';
import { Page } from '@navikt/ds-react';
import NavBar from '@/common/components/NavBar';
import '@navikt/ds-css/darkside';

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
          <NavBar />
          {children}
        </Page>
      </body>
    </html>
  );
};

export default RootLayout;
