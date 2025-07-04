'use client';

import { useState } from 'react';
import { Theme } from '@navikt/ds-react';
import NavBar from '../components/NavBar';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <Theme theme={theme}>
      <NavBar setTheme={setTheme} theme={theme} />
      {children}
    </Theme>
  );
}
