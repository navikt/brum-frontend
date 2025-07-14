import ThemeProvider from '@/common/UI/ThemeProvider';
import '@navikt/ds-css/darkside';
import type { Metadata } from 'next';
import MSWProvider from './MSWProvider';

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
          <MSWProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
