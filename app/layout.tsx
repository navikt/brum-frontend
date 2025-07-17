import ThemeProvider from '@/providers/ThemeProvider';
import '@navikt/ds-css/darkside';
import type { Metadata } from 'next';
import MSWProvider from '../providers/MSWProvider';

export const metadata: Metadata = {
  title: 'Brum',
  description: 'Frontend for Brum',
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.className = theme;
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.className = prefersDark ? 'dark' : 'light';
    }
  } catch (e) {}
})();
`;

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="no">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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