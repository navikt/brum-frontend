import type { Metadata } from 'next';
import '@navikt/ds-css';
import { Page } from '@navikt/ds-react';
import NavBar from '@/common/components/NavBar';
import '@navikt/ds-css/darkside';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Brum',
  description: 'Frontend for Brum',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="no">
      <head />
      <body>
        <ThemeProvider>
            <NavBar />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
