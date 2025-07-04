import type { Metadata } from 'next';
import '@navikt/ds-css/darkside';
import ThemeProvider from '@/common/UI/themeProvider';

export const metadata: Metadata = {
  title: 'Brum',
  description: 'Frontend for Brum',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="no">
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
